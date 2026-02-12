'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function Survey() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [answers, setAnswers] = useState({ q1: 0, q2: 0, q3: 0 });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('userData');
    if (!stored) {
      router.push('/');
      return;
    }
    setUserData(JSON.parse(stored));
  }, [router]);

  const questions = [
    {
      id: 'q1',
      title: 'Infraestrutura Tecnológica',
      description: 'Como você avalia a infraestrutura tecnológica (laboratórios, equipamentos, internet Wi-Fi) disponível no campus?',
      options: ['⭐ Muito\nInsatisfeito', '⭐⭐ Insatisfeito', '⭐⭐⭐ Neutro', '⭐⭐⭐⭐ Satisfeito', '⭐⭐⭐⭐⭐ Muito\nSatisfeito'],
    },
    {
      id: 'q2',
      title: 'Ferramentas Digitais',
      description: 'As ferramentas digitais utilizadas nos seus cursos facilitam o seu aprendizado?',
      options: ['Discordo\nTotalmente', 'Discordo', 'Neutro', 'Concordo', 'Concordo\nTotalmente'],
    },
    {
      id: 'q3',
      title: 'Suporte Técnico',
      description: 'O suporte técnico e o treinamento oferecidos são adequados para você utilizar as tecnologias?',
      options: ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'],
    },
  ];

  const handleSubmit = async () => {
    if (answers.q1 === 0 || answers.q2 === 0 || answers.q3 === 0) {
      setError('Por favor, responda todas as perguntas');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: userData.email,
        matricula: userData.matricula,
        q1: answers.q1,
        q2: answers.q2,
        q3: answers.q3,
      };

      const response = await axios.post(`${API_URL}/api/survey/submit`, payload);
      
      // Salvar protocolo
      sessionStorage.setItem('protocolNumber', response.data.protocolNumber);
      router.push('/survey/confirmation');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao enviar respostas');
    } finally {
      setLoading(false);
    }
  };

  const question = questions[currentStep - 1];

  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Pergunta {currentStep} de 3</span>
            <span className="text-sm font-semibold text-indigo-600">{(currentStep / 3) * 100}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{question.title}</h2>
          <p className="text-gray-600">{question.description}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setAnswers({ ...answers, [question.id]: idx + 1 })}
              className={`p-3 rounded-lg border-2 transition-all whitespace-pre-line text-sm font-medium ${
                answers[question.id as keyof typeof answers] === idx + 1
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>

          <button
            onClick={() => currentStep < 3 ? setCurrentStep(currentStep + 1) : handleSubmit()}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {currentStep < 3 ? 'Próxima →' : loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
}
