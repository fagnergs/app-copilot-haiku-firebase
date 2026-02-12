'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Confirmation() {
  const router = useRouter();
  const [protocolNumber, setProtocolNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('protocolNumber');
    const userData = sessionStorage.getItem('userData');
    
    if (!stored || !userData) {
      router.push('/');
      return;
    }
    
    setProtocolNumber(stored);
    setEmail(JSON.parse(userData).email);
  }, [router]);

  const handleNewSurvey = () => {
    sessionStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <div className="inline-block bg-green-100 rounded-full p-4 mb-4 animate-bounce">
            <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Obrigado!</h1>
        <p className="text-gray-600 mb-6">Suas respostas foram registradas com sucesso</p>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Número de Protocolo:</p>
          <p className="text-2xl font-bold text-green-600 font-mono break-all">{protocolNumber}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700">
            Um email de confirmação foi enviado para:
          </p>
          <p className="font-semibold text-gray-800 mt-1 break-all">{email}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleNewSurvey}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Responder Novamente
          </button>

          <Link href="/admin/login">
            <button className="w-full border border-indigo-600 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition-colors">
              Acesso Admin
            </button>
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Guarde este número para referência
        </p>
      </div>
    </div>
  );
}
