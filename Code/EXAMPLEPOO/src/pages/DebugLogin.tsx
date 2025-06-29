import { useState } from 'react';
import { authenticateUser, getDebugUsers } from '../data/api-client';

const DebugLogin = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testCredentials = [
    { email: 'alex.rivera@colegio.edu', password: 'estudiante123' },
    { email: 'maria.lopez@colegio.edu', password: 'estudiante456' },
    { email: 'prof.garcia@colegio.edu', password: 'profesor123' }
  ];

  const testAuth = async (email: string, password: string) => {
    setLoading(true);
    setResult(`Probando: ${email}...\n`);
    
    try {
      const user = await authenticateUser(email, password);
      
      if (user) {
        setResult(prev => prev + `🎉 ¡AUTENTICACIÓN EXITOSA!\n`);
        setResult(prev => prev + `✓ Usuario: ${user.profile.name}\n`);
        setResult(prev => prev + `✓ Rol: ${user.role}\n`);
        setResult(prev => prev + `✓ Email: ${user.email}\n`);
      } else {
        setResult(prev => prev + `❌ Autenticación fallida\n`);
      }
      
    } catch (error) {
      setResult(prev => prev + `💥 ERROR: ${String(error)}\n`);
    }
    
    setLoading(false);
  };

  const checkUsers = async () => {
    setLoading(true);
    setResult('Verificando usuarios en la base de datos...\n');
    
    try {
      const data = await getDebugUsers();
      setResult(prev => prev + `📊 Total usuarios: ${data.count}\n\n`);
      
      data.users.forEach((user: any) => {
        setResult(prev => prev + `👤 ${user.email}\n`);
        setResult(prev => prev + `   🔐 Password: "${user.password}"\n`);
        setResult(prev => prev + `   🎭 Rol: ${user.role}\n`);
        setResult(prev => prev + `   ✅ Activo: ${user.isActive}\n\n`);
      });
      
    } catch (error) {
      setResult(prev => prev + `💥 ERROR: ${String(error)}\n`);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🔧 Debug Login</h1>
      
      <div className="space-y-4">
        <button
          onClick={checkUsers}
          disabled={loading}
          className="block w-full p-4 bg-green-600 hover:bg-green-700 rounded-lg text-left disabled:opacity-50 mb-4"
        >
          🔍 Ver todos los usuarios en BD
        </button>
        
        {testCredentials.map((cred, index) => (
          <button
            key={index}
            onClick={() => testAuth(cred.email, cred.password)}
            disabled={loading}
            className="block w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-left disabled:opacity-50"
          >
            Probar: {cred.email}
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Resultado:</h2>
        <pre className="text-green-400">{result || 'Sin pruebas aún...'}</pre>
      </div>

      <div className="mt-4">
        <a href="/login" className="text-blue-400 hover:underline">
          ← Volver al Login Normal
        </a>
      </div>
    </div>
  );
};

export default DebugLogin;
