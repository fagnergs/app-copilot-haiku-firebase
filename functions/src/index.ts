import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Express app setup
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// ===== VALIDATORS =====
const SurveySubmitSchema = z.object({
  email: z.string().email(),
  matricula: z.string().min(1),
  q1: z.number().min(1).max(5),
  q2: z.number().min(1).max(5),
  q3: z.number().min(1).max(5),
});

const AdminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// ===== JWT SECRET (use env variable in production) =====
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ===== DEMO ADMIN CREDENTIALS =====
const DEMO_ADMIN = {
  email: 'admin@demo.com',
  passwordHash: 'demo123', // In production, use bcrypt!
};

// ===== POST /survey/submit =====
app.post('/submit', async (req, res) => {
  try {
    const data = SurveySubmitSchema.parse(req.body);

    // Add student if new
    const studentRef = db.collection('students').doc();
    await studentRef.set({
      email: data.email,
      matricula: data.matricula,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Add response
    const responseRef = db.collection('responses').doc();
    const responseData = {
      studentId: studentRef.id,
      email: data.email,
      q1: data.q1,
      q2: data.q2,
      q3: data.q3,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await responseRef.set(responseData);

    // Add to email queue (will be picked up by Cloud Scheduler or extension)
    await db.collection('emailQueue').add({
      studentId: studentRef.id,
      email: data.email,
      responseId: responseRef.id,
      responses: { q1: data.q1, q2: data.q2, q3: data.q3 },
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({
      success: true,
      protocolNumber: responseRef.id,
      message: 'Respostas registradas com sucesso!',
    });
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(400).json({
      success: false,
      message: error.message || 'Erro ao processar respostas',
    });
  }
});

// ===== POST /auth/login =====
app.post('/login', async (req, res) => {
  try {
    const { email, password } = AdminLoginSchema.parse(req.body);

    // Demo auth (replace with Firebase Auth or proper verification)
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.passwordHash) {
      const token = jwt.sign(
        { email, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        token,
        email,
        message: 'Autenticado com sucesso!',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos',
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Erro na autenticação',
    });
  }
});

// ===== JWT MIDDLEWARE =====
const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

// ===== GET /admin/analytics =====
app.get('/admin/analytics', authMiddleware, async (req, res) => {
  try {
    const responsesSnap = await db.collection('responses').get();
    const responses = responsesSnap.docs.map(doc => doc.data());

    if (responses.length === 0) {
      return res.json({
        totalResponses: 0,
        averageSatisfaction: 0,
        questionStats: [],
        lastResponseTime: 'Nunca',
      });
    }

    const q1Values = responses.map((r: any) => r.q1);
    const q2Values = responses.map((r: any) => r.q2);
    const q3Values = responses.map((r: any) => r.q3);

    const calcDist = (arr: number[]) => [
      { name: '1 ⭐', count: arr.filter(v => v === 1).length },
      { name: '2 ⭐', count: arr.filter(v => v === 2).length },
      { name: '3 ⭐', count: arr.filter(v => v === 3).length },
      { name: '4 ⭐', count: arr.filter(v => v === 4).length },
      { name: '5 ⭐', count: arr.filter(v => v === 5).length },
    ];

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    return res.json({
      totalResponses: responses.length,
      averageSatisfaction: avg([...q1Values, ...q2Values, ...q3Values]),
      questionStats: [
        { name: 'Infraestrutura', avg: avg(q1Values), distribution: calcDist(q1Values) },
        { name: 'Ferramentas', avg: avg(q2Values), distribution: calcDist(q2Values) },
        { name: 'Suporte', avg: avg(q3Values), distribution: calcDist(q3Values) },
      ],
      lastResponseTime: responses[responses.length - 1].createdAt?.toDate?.().toLocaleString('pt-BR') || 'Recente',
    });
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Erro ao obter analytics' });
  }
});

// ===== GET /admin/responses =====
app.get('/admin/responses', authMiddleware, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const snap = await db
      .collection('responses')
      .orderBy('createdAt', 'desc')
      .offset(skip)
      .limit(limit)
      .get();

    const countSnap = await db.collection('responses').count().get();

    const data = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    return res.json({
      total: countSnap.data().count,
      page,
      limit,
      data,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Erro ao obter respostas' });
  }
});

// ===== Export the API =====
export const api = functions.https.onRequest(app);

// ===== EMAIL WORKER (runs periodically) =====
export const processEmailQueue = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async (context) => {
    const pendingEmails = await db
      .collection('emailQueue')
      .where('status', '==', 'pending')
      .limit(10)
      .get();

    for (const doc of pendingEmails.docs) {
      const data = doc.data();
      try {
        // TODO: Send email via SendGrid or Nodemailer
        console.log(`Email sent to ${data.email} with protocol ${data.responseId}`);
        
        await doc.ref.update({
          status: 'sent',
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error(`Error sending email to ${data.email}:`, error);
        await doc.ref.update({ status: 'failed', error: String(error) });
      }
    }
  });
