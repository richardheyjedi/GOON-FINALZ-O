import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Trash2, LogOut, Users, Download } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  date: string;
}

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [emails, setEmails] = useState<Subscriber[]>([]);
  const [error, setError] = useState('');

  const ADMIN_PASS = "GOON_ADMIN_2025"; // Hardcoded for this demo

  useEffect(() => {
    if (isAuthenticated) {
      loadEmails();
    }
  }, [isAuthenticated]);

  const loadEmails = () => {
    try {
      const stored = localStorage.getItem('goon_newsletter_emails');
      if (stored) {
        setEmails(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load emails", e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('ACCESS_DENIED: Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this record?')) {
      const updated = emails.filter(e => e.id !== id);
      setEmails(updated);
      localStorage.setItem('goon_newsletter_emails', JSON.stringify(updated));
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Date\n"
      + emails.map(e => `${e.email},${new Date(e.date).toLocaleString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "goon_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-[#ccff00] font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md border-4 border-[#ccff00] p-8 relative shadow-[8px_8px_0_0_#333]">
          <div className="absolute -top-3 left-4 bg-black px-2 font-bold uppercase tracking-widest">
            Admin_Console
          </div>
          
          <div className="flex flex-col items-center gap-6 mb-8">
            <Lock size={48} />
            <h1 className="text-2xl font-black uppercase tracking-tighter">Restricted Access</h1>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase">Enter Passkey</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900 border-2 border-[#ccff00] p-3 text-center outline-none focus:bg-gray-800 transition-colors"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-xs font-bold bg-red-900/20 p-2 border border-red-500">
                {error}
              </div>
            )}

            <button type="submit" className="bg-[#ccff00] text-black font-black uppercase py-3 hover:bg-white transition-colors mt-4">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-mono text-black p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] px-3 py-1 mb-2">
              <Terminal size={14} />
              <span className="text-xs font-bold uppercase">Admin_Dashboard_v1.0</span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight">Subscriber Database</h1>
          </div>
          
          <div className="flex gap-4">
            <button onClick={handleExport} className="flex items-center gap-2 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors font-bold text-sm uppercase">
              <Download size={16} /> Export CSV
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors font-bold text-sm uppercase">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-4 border-black p-6 shadow-hard-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-gray-500">Total Leads</span>
              <Users size={20} />
            </div>
            <div className="text-5xl font-black">{emails.length}</div>
          </div>
        </div>

        <div className="bg-white border-4 border-black shadow-hard">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white uppercase text-xs">
                  <th className="p-4 border-r border-gray-700 w-16">#</th>
                  <th className="p-4 border-r border-gray-700">Email Address</th>
                  <th className="p-4 border-r border-gray-700">Date Registered</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {emails.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                      No data found in local storage.
                    </td>
                  </tr>
                ) : (
                  emails.map((sub, index) => (
                    <tr key={sub.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 border-r border-gray-200 font-bold">{index + 1}</td>
                      <td className="p-4 border-r border-gray-200 font-medium">{sub.email}</td>
                      <td className="p-4 border-r border-gray-200 text-gray-600">
                        {new Date(sub.date).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(sub.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
