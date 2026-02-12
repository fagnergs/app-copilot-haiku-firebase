'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function AdminDashboard() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    setAdminEmail(email || '');
    fetchData(token);
  }, [router]);

  const fetchData = async (token: string) => {
    try {
      const [analyticsRes, responsesRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/api/admin/responses?page=1&limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAnalytics(analyticsRes.data);
      setResponses(responsesRes.data.data || []);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push('/admin/login');
  };

  const COLORS = ['#4f46e5', '#06b6d4', '#84cc16', '#f59e0b', '#ef4444'];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Painel de Controle</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{adminEmail}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total de Respostas</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{analytics?.totalResponses || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Satisfação Média</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{(analytics?.averageSatisfaction || 0).toFixed(1)}/5</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Resposta Recente</p>
            <p className="text-sm text-gray-700 mt-2">{analytics?.lastResponseTime || 'Nenhuma'}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Taxa Conclusão</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">100%</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {analytics?.questionStats?.map((stats: any, idx: number) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {['Infraestrutura', 'Ferramentas Digitais', 'Suporte Técnico'][idx]}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.distribution || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill={COLORS[idx]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-gray-600 mt-4">Média: {stats.avg.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Tabela de Respostas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimas Respostas</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Q1</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Q2</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Q3</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody>
                {responses.length > 0 ? (
                  responses.map((resp: any) => (
                    <tr key={resp.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-800">{resp.email}</td>
                      <td className="px-4 py-2 text-center font-semibold text-indigo-600">⭐ {resp.q1}</td>
                      <td className="px-4 py-2 text-center font-semibold text-indigo-600">⭐ {resp.q2}</td>
                      <td className="px-4 py-2 text-center font-semibold text-indigo-600">⭐ {resp.q3}</td>
                      <td className="px-4 py-2 text-gray-600 text-xs">{new Date(resp.createdAt).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                      Nenhuma resposta ainda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
