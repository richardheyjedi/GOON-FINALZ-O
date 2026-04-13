import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Trash2, LogOut, Users, Plus, Edit2, X, Code, UserPlus, Calendar, ScanFace, Play, Loader2, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { content, Mentor, ScheduleItem, Testimonial, ProductItem } from '../content';
import {
  getMentors, upsertMentor, deleteMentor,
  getEvents, insertEvent, updateEvent, deleteEvent,
  getResults, upsertResult, deleteResult,
  getProducts, upsertProduct, deleteProduct,
} from '../lib/supabase';

interface Subscriber { id: string; email: string; date: string; }

type Toast = { type: 'success' | 'error'; msg: string };

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'mentors' | 'events' | 'results' | 'products'>('leads');
  const [emails, setEmails] = useState<Subscriber[]>([]);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [loading, setLoading] = useState(false);

  // Mentors State
  const [dbMentors, setDbMentors] = useState<Mentor[]>([]);
  const [editingMentor, setEditingMentor] = useState<Partial<Mentor> | null>(null);
  const [showMentorForm, setShowMentorForm] = useState(false);

  // Events State (with db id)
  const [dbEvents, setDbEvents] = useState<(ScheduleItem & { _dbId?: number })[]>([]);
  const [editingEvent, setEditingEvent] = useState<Partial<ScheduleItem> & { _dbId?: number } | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);

  // Results State
  const [dbResults, setDbResults] = useState<Testimonial[]>([]);
  const [editingResult, setEditingResult] = useState<Partial<Testimonial> | null>(null);
  const [showResultForm, setShowResultForm] = useState(false);

  // Products State
  const [dbProducts, setDbProducts] = useState<ProductItem[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  };
  const ADMIN_PASS_HASH = simpleHash('GOON_ADMIN_2025');

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadEmails();
      fetchMentors();
      fetchEvents();
      fetchResults();
      fetchProducts();
    }
  }, [isAuthenticated]);

  const loadEmails = () => {
    try {
      const stored = localStorage.getItem('goon_newsletter_emails');
      if (stored) setEmails(JSON.parse(stored));
    } catch { /* noop */ }
  };

  const fetchMentors = async () => {
    setLoading(true);
    const data = await getMentors();
    setDbMentors(data);
    setLoading(false);
  };

  const fetchEvents = async () => {
    const data = await getEvents() as (ScheduleItem & { _dbId?: number })[];
    // getEvents returns rows with numeric id from DB — we capture it via raw query
    // Re-fetch raw to preserve the DB id for editing/deleting
    setDbEvents(data);
  };

  const fetchResults = async () => {
    const data = await getResults();
    setDbResults(data);
  };

  const fetchProducts = async () => {
    const data = await getProducts();
    setDbProducts(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (lockoutUntil && now < lockoutUntil) {
      const remaining = Math.ceil((lockoutUntil - now) / 1000);
      setError(`BLOQUEIO_TEMPORÁRIO: Aguarde ${remaining}s`);
      return;
    }
    if (simpleHash(password) === ADMIN_PASS_HASH) {
      setIsAuthenticated(true);
      setError('');
      setLoginAttempts(0);
    } else {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      if (attempts >= 5) {
        setLockoutUntil(Date.now() + 30000);
        setLoginAttempts(0);
        setError('ACESSO_NEGADO: 5 tentativas falhadas. Aguarde 30 segundos.');
      } else {
        setError(`ACESSO_NEGADO: Credenciais inválidas (${attempts}/5)`);
      }
    }
  };

  const handleLogout = () => { setIsAuthenticated(false); setPassword(''); };

  // ─── Mentor Operations ───────────────────────────────────────────────────

  const generateNewId = (prefix: string, staticItems: any[], dbItems: any[], pad: number) => {
    const allItems = [...staticItems, ...dbItems];
    const maxNum = allItems.reduce((max, item) => {
      if (!item.id) return max;
      const parts = item.id.split('_');
      const num = parseInt(parts[parts.length - 1], 10);
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    return `${prefix}_${(maxNum + 1).toString().padStart(pad, '0')}`;
  };

  const handleAddMentor = () => {
    const newId = generateNewId('OP', content.mentorship.mentors, dbMentors, 2);
    setEditingMentor({
      id: newId, name: '', role: '', level: 'LVL.80',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000',
      bio: '', detailedBio: '',
      stats: [{ label: 'Estratégia', val: 85, color: 'bg-blue-600' }, { label: 'Branding', val: 80, color: 'bg-purple-600' }],
      tags: ['NOVO'], note: 'OPERADOR', noteColor: 'text-blue-600', noteRotation: '-rotate-6', achievements: []
    });
    setShowMentorForm(true);
  };

  const handleEditMentor = (mentor: Mentor) => { setEditingMentor({ ...mentor }); setShowMentorForm(true); };

  const handleDeleteMentor = async (id: string) => {
    if (!window.confirm('Deseja excluir este mentor do banco de dados?')) return;
    setLoading(true);
    const ok = await deleteMentor(id);
    if (ok) { showToast('success', 'Mentor excluído!'); await fetchMentors(); }
    else showToast('error', 'Erro ao excluir. Tente novamente.');
    setLoading(false);
  };

  const handleSaveMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMentor) return;
    setLoading(true);
    const ok = await upsertMentor(editingMentor as Mentor);
    if (ok) { showToast('success', 'Mentor salvo com sucesso!'); setShowMentorForm(false); setEditingMentor(null); await fetchMentors(); }
    else showToast('error', 'Erro ao salvar. Verifique a conexão.');
    setLoading(false);
  };

  // ─── Event Operations ─────────────────────────────────────────────────────

  const handleAddEvent = () => {
    setEditingEvent({ time: '09:00', day: '20', month: 'MAIO', year: '2025', title: '', description: '', location: '', type: 'network', iconName: 'Zap', link: '', image: '' });
    setShowEventForm(true);
  };

  const handleEditEvent = (event: ScheduleItem & { _dbId?: number }) => { setEditingEvent({ ...event }); setShowEventForm(true); };

  const handleDeleteEvent = async (event: ScheduleItem & { _dbId?: number }) => {
    if (!event._dbId) { showToast('error', 'Evento estático não pode ser deletado via UI.'); return; }
    if (!window.confirm('Deseja excluir este evento?')) return;
    setLoading(true);
    const ok = await deleteEvent(event._dbId);
    if (ok) { showToast('success', 'Evento excluído!'); await fetchEvents(); }
    else showToast('error', 'Erro ao excluir.');
    setLoading(false);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    setLoading(true);
    const { _dbId, ...eventData } = editingEvent;
    let ok: boolean;
    if (_dbId) { ok = await updateEvent(_dbId, eventData); }
    else { ok = await insertEvent(eventData); }
    if (ok) { showToast('success', 'Evento salvo!'); setShowEventForm(false); setEditingEvent(null); await fetchEvents(); }
    else showToast('error', 'Erro ao salvar evento.');
    setLoading(false);
  };

  // ─── Result Operations ────────────────────────────────────────────────────

  const handleAddResult = () => {
    const newId = generateNewId('CASE', content.hero.testimonials, dbResults, 4);
    setEditingResult({ id: newId, subject: '', role: 'ELITE MEMBER', impact: '', impactLabel: 'AUMENTO DE RECEITA', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000', video: '' });
    setShowResultForm(true);
  };

  const handleEditResult = (result: Testimonial) => { setEditingResult({ ...result }); setShowResultForm(true); };

  const handleDeleteResult = async (id: string) => {
    const isStatic = content.hero.testimonials.some(t => t.id === id);
    if (isStatic) { showToast('error', 'Resultados originais do código não podem ser deletados.'); return; }
    if (!window.confirm('Deseja excluir este resultado?')) return;
    setLoading(true);
    const ok = await deleteResult(id);
    if (ok) { showToast('success', 'Resultado excluído!'); await fetchResults(); }
    else showToast('error', 'Erro ao excluir.');
    setLoading(false);
  };

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult) return;
    setLoading(true);
    const ok = await upsertResult(editingResult as Testimonial);
    if (ok) { showToast('success', 'Resultado salvo!'); setShowResultForm(false); setEditingResult(null); await fetchResults(); }
    else showToast('error', 'Erro ao salvar resultado. Verifique a conexão.');
    setLoading(false);
  };

  // ─── Product Operations ────────────────────────────────────────────────────

  const handleAddProduct = () => {
    const newId = generateNewId('PROD', content.products_page.items, dbProducts, 2);
    setEditingProduct({ id: newId, title: '', description: '', iconName: 'Zap', type: 'product', link: '' });
    setShowProductForm(true);
  };

  const handleEditProduct = (product: ProductItem) => { setEditingProduct({ ...product }); setShowProductForm(true); };

  const handleDeleteProduct = async (id: string) => {
    const isStatic = content.products_page.items.some(p => p.id === id);
    if (isStatic) { showToast('error', 'Produtos originais não podem ser deletados via UI.'); return; }
    if (!window.confirm('Deseja excluir este produto?')) return;
    setLoading(true);
    const ok = await deleteProduct(id);
    if (ok) { showToast('success', 'Produto excluído!'); await fetchProducts(); }
    else showToast('error', 'Erro ao excluir.');
    setLoading(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setLoading(true);
    const ok = await upsertProduct(editingProduct as ProductItem);
    if (ok) { showToast('success', 'Produto salvo!'); setShowProductForm(false); setEditingProduct(null); await fetchProducts(); }
    else showToast('error', 'Erro ao salvar produto.');
    setLoading(false);
  };

  const handleDeleteSubscriber = (id: string) => {
    if (window.confirm('Deletar este registro?')) {
      const updated = emails.filter(e => e.id !== id);
      setEmails(updated);
      localStorage.setItem('goon_newsletter_emails', JSON.stringify(updated));
    }
  };

  // ─── All mentors (static + DB) ────────────────────────────────────────────
  const allMentors = (() => {
    const staticIds = new Set(content.mentorship.mentors.map(m => m.id));
    const merged = content.mentorship.mentors.map(sm => {
      const override = dbMentors.find(dm => dm.id === sm.id);
      return override ? { ...override, _isEdited: true } : { ...sm, _isEdited: false };
    });
    const purelyNew = dbMentors.filter(dm => !staticIds.has(dm.id)).map(m => ({ ...m, _isEdited: false, _isNew: true }));
    return [...merged, ...purelyNew];
  })();

  // ─── All results (static + DB) ────────────────────────────────────────────
  const allResults = (() => {
    const staticIds = new Set(content.hero.testimonials.map(t => t.id));
    const merged = content.hero.testimonials.map(st => {
      const override = dbResults.find(r => r.id === st.id);
      return override ?? st;
    });
    const purelyNew = dbResults.filter(r => !staticIds.has(r.id));
    return [...merged, ...purelyNew];
  })();

  // ─── All products (static + DB) ───────────────────────────────────────────
  const allProducts = (() => {
    const staticIds = new Set(content.products_page.items.map(p => p.id));
    const merged = content.products_page.items.map(sp => {
      const override = dbProducts.find(r => r.id === sp.id);
      return override ?? sp;
    });
    const purelyNew = dbProducts.filter(r => !staticIds.has(r.id));
    return [...merged, ...purelyNew];
  })();

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-[#ccff00] font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md border-4 border-[#ccff00] p-8 relative shadow-[8px_8px_0_0_#333]">
          <div className="absolute -top-3 left-4 bg-black px-2 font-bold uppercase tracking-widest text-[10px]">Console_Administrativo</div>
          <div className="flex flex-col items-center gap-6 mb-8">
            <Lock size={48} />
            <h1 className="text-2xl font-black uppercase tracking-tighter">Acesso Restrito</h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="bg-gray-900 border-2 border-[#ccff00] p-3 text-center outline-none focus:bg-gray-800 text-[#ccff00]"
              placeholder="••••••••" autoFocus />
            {error && <div className="text-red-500 text-[10px] font-black border border-red-500 p-2 text-center bg-red-950/20">{error}</div>}
            <button type="submit" className="bg-[#ccff00] text-black font-black uppercase py-4 shadow-[4px_4px_0_0_#333]">
              Autenticar Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-mono text-black p-4 md:p-12 overflow-x-hidden">

      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[300] flex items-center gap-3 px-6 py-4 border-4 border-black shadow-[8px_8px_0_0_#000] font-black uppercase text-sm animate-in slide-in-from-top duration-300 ${toast.type === 'success' ? 'bg-[#ccff00] text-black' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-[250] bg-black/50 flex items-center justify-center">
          <div className="bg-black border-4 border-[#ccff00] p-8 flex flex-col items-center gap-4">
            <Loader2 size={40} className="text-[#ccff00] animate-spin" />
            <span className="text-[#ccff00] font-black uppercase text-xs tracking-widest">Sincronizando...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b-4 border-black pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] px-3 py-1 mb-2">
              <Terminal size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sessão_Admin_Ativa // Supabase_Connected</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic">PAINEL <span className="text-gray-400">HQ</span></h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 hover:bg-black transition-all font-black text-xs uppercase shadow-[4px_4px_0_0_#000]">
              <LogOut size={16} /> Desconectar
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
          {([['leads', 'Assinantes', <Users size={18} />], ['mentors', 'Mentores', <UserPlus size={18} />], ['events', 'Eventos', <Calendar size={18} />], ['results', 'Resultados', <ScanFace size={18} />], ['products', 'Produtos', <Package size={18} />]] as const).map(([tab, label, icon]) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)}
              className={`flex-1 min-w-[100px] py-4 font-black uppercase tracking-widest text-[10px] md:text-xs border-4 border-black transition-all flex flex-col items-center gap-1 ${activeTab === tab ? 'bg-[#ccff00] translate-x-1 translate-y-1 shadow-none' : 'bg-white shadow-[8px_8px_0_0_#000] active:shadow-none'}`}>
              {icon}{label}
            </button>
          ))}
        </div>

        {/* ── LEADS TAB ── */}
        {activeTab === 'leads' && (
          <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
            <div className="p-4 bg-gray-900 border-b-4 border-black text-white">
              <span className="text-xs font-black uppercase tracking-widest">Leads de Newsletter (Total: {emails.length})</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-gray-100 uppercase text-[10px] font-black border-b-2 border-black text-gray-500"><th className="p-4">Email</th><th className="p-4">Data</th><th className="p-4 text-right">Ações</th></tr></thead>
                <tbody className="text-sm">
                  {emails.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-gray-400 text-xs">Nenhum assinante ainda.</td></tr>}
                  {emails.map(sub => (
                    <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-bold">{sub.email}</td>
                      <td className="p-4 text-[10px]">{new Date(sub.date).toLocaleString('pt-BR')}</td>
                      <td className="p-4 text-right"><button onClick={() => handleDeleteSubscriber(sub.id)} className="text-red-600 hover:bg-red-50 p-2"><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MENTORS TAB ── */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic">Gestão de Mentores</h2>
              <button onClick={handleAddMentor} className="bg-black text-[#ccff00] px-6 py-3 font-black uppercase text-xs border-2 border-black hover:bg-[#ccff00] hover:text-black transition-all shadow-[8px_8px_0_0_#000] flex items-center gap-2">
                <Plus size={18} /> Novo Mentor
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allMentors.map(mentor => {
                const { _isEdited, _isNew, ...m } = mentor as any;
                const isInDb = dbMentors.some(d => d.id === m.id);
                return (
                  <div key={m.id} className="bg-white border-4 border-black p-5 shadow-[8px_8px_0_0_#000] relative">
                    {_isEdited && <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-[8px] font-black uppercase">Editado</div>}
                    {_isNew && <div className="absolute top-0 right-0 bg-[#ccff00] text-black px-2 py-1 text-[8px] font-black uppercase">Novo</div>}
                    <div className="flex gap-4 mb-4">
                      <div className="w-16 h-16 border-2 border-black overflow-hidden grayscale bg-gray-100 shrink-0">
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black text-gray-300 block">{m.id}</span>
                        <h3 className="font-black uppercase text-sm truncate">{m.name || '(sem nome)'}</h3>
                        <p className="font-bold text-blue-600 text-xs truncate">{m.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-4 border-t-2 border-dashed border-gray-100">
                      <button onClick={() => handleEditMentor(m)} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><Edit2 size={14} /></button>
                      <button onClick={() => isInDb ? handleDeleteMentor(m.id) : showToast('error', 'Mentores estáticos devem ser editados, não deletados.')}
                        className={`p-2 border-2 border-black transition-all ${!isInDb ? 'opacity-20 pointer-events-none' : 'hover:bg-red-600 hover:text-white'}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── EVENTS TAB ── */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase italic">Log de Eventos</h2>
                <p className="text-xs text-gray-500 mt-1">Eventos salvos no banco: {dbEvents.length} | Estáticos: {content.immersion.schedule.length}</p>
              </div>
              <button onClick={handleAddEvent} className="bg-black text-[#ccff00] px-6 py-3 font-black uppercase text-xs border-2 border-black shadow-[8px_8px_0_0_#000] flex items-center gap-2">
                <Plus size={18} /> Novo Evento
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Static events (view only) */}
              {content.immersion.schedule.map((event, i) => (
                <div key={`static-${i}`} className="bg-white border-4 border-black p-5 shadow-[8px_8px_0_0_#000] opacity-70 relative">
                  <div className="absolute top-0 left-0 bg-gray-500 text-white px-2 py-1 text-[8px] font-black uppercase">Estático</div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-16 h-16 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0">
                      <Calendar size={24} className="opacity-30" />
                    </div>
                    <div className="flex-1 text-[10px] font-mono">
                      <span className="bg-black text-white px-2 py-0.5 inline-block uppercase text-[9px]">{event.day}/{event.month}/{event.year}</span>
                      <h3 className="text-sm font-black font-sans uppercase mt-1">{event.title}</h3>
                      <p className="text-gray-400 text-[9px] mt-1">Evento do código-fonte. Use "Novo Evento" para adicionar ao banco.</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* DB events (editable) */}
              {dbEvents.map(event => (
                <div key={`db-${(event as any)._dbId || event.title}`} className="bg-white border-4 border-black p-5 shadow-[8px_8px_0_0_#000] relative">
                  <div className="absolute top-0 left-0 bg-[#ccff00] text-black px-2 py-1 text-[8px] font-black uppercase">Banco de Dados</div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-16 h-16 border-2 border-black overflow-hidden bg-gray-100 shrink-0">
                      {event.image ? <img src={event.image} className="w-full h-full object-cover filter grayscale" alt="" /> : <Calendar size={24} className="m-auto mt-4 opacity-20" />}
                    </div>
                    <div className="flex-1 text-[10px] font-mono">
                      <span className="bg-black text-white px-2 py-0.5 inline-block uppercase text-[9px]">{event.day}/{event.month}/{event.year} // {event.time}</span>
                      <h3 className="text-sm font-black font-sans uppercase mt-1">{event.title}</h3>
                      <p className="text-gray-500 text-[9px] line-clamp-2 mt-1">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end pt-4 border-t-2 border-dashed border-gray-100">
                    <button onClick={() => handleEditEvent(event as any)} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><Edit2 size={14} /></button>
                    <button onClick={() => handleDeleteEvent(event as any)} className="p-2 border-2 border-black hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS TAB ── */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase italic">Log de Resultados</h2>
                <p className="text-xs text-gray-500 mt-1">Resultados do banco: {dbResults.length}</p>
              </div>
              <button onClick={handleAddResult} className="bg-black text-[#ccff00] px-6 py-3 font-black uppercase text-xs border-2 border-black shadow-[8px_8px_0_0_#000] flex items-center gap-2">
                <Plus size={18} /> Novo Resultado
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allResults.map(res => {
                const isInDb = dbResults.some(r => r.id === res.id);
                return (
                  <div key={res.id} className="bg-white border-4 border-black p-5 shadow-[8px_8px_0_0_#000] relative">
                    {isInDb && <div className="absolute top-0 right-0 bg-[#ccff00] text-black px-2 py-1 text-[8px] font-black uppercase">Banco</div>}
                    <div className="flex flex-col gap-3">
                      <div className="aspect-video border-2 border-black overflow-hidden grayscale bg-black">
                        <img src={res.thumbnail} className="w-full h-full object-cover" alt={res.subject} />
                        {res.video && <Play size={16} className="absolute top-2 left-2 text-[#ccff00]" />}
                      </div>
                      <div>
                        <span className="text-[8px] font-black text-gray-300 block">{res.id}</span>
                        <h3 className="text-sm font-black uppercase">{res.subject}</h3>
                        <p className="text-blue-600 font-bold text-xs uppercase mt-1">{res.role}</p>
                        <div className="mt-2 p-2 bg-black text-[#ccff00] text-[9px] border-l-4 border-[#ccff00]">
                          {res.impactLabel}: {res.impact}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-4 border-t-2 border-dashed border-gray-100 mt-3">
                      <button onClick={() => handleEditResult(res)} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteResult(res.id)}
                        className={`p-2 border-2 border-black transition-all ${!isInDb ? 'opacity-20 pointer-events-none' : 'hover:bg-red-600 hover:text-white'}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* ── PRODUCTS TAB ── */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase italic">Log de Produtos</h2>
                <p className="text-xs text-gray-500 mt-1">Produtos no banco: {dbProducts.length}</p>
              </div>
              <button onClick={handleAddProduct} className="bg-black text-[#ccff00] px-6 py-3 font-black uppercase text-xs border-2 border-black shadow-[8px_8px_0_0_#000] flex items-center gap-2">
                <Plus size={18} /> Novo Produto
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProducts.map(prod => {
                const isInDb = dbProducts.some(p => p.id === prod.id);
                return (
                  <div key={prod.id} className="bg-white border-4 border-black p-5 shadow-[8px_8px_0_0_#000] relative">
                    {isInDb && <div className="absolute top-0 right-0 bg-[#ccff00] text-black px-2 py-1 text-[8px] font-black uppercase">Banco</div>}
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="text-[8px] font-black text-gray-300 block">{prod.id}</span>
                        <h3 className="text-sm font-black uppercase">{prod.title}</h3>
                        <p className="text-gray-500 text-[10px] uppercase mt-1 line-clamp-2">{prod.description}</p>
                        <div className="flex gap-2 mt-2">
                          {prod.price && <span className="bg-black text-[#ccff00] text-[9px] px-2 py-1 uppercase font-bold">{prod.price}</span>}
                          {prod.duration && <span className="border border-black text-[9px] px-2 py-1 uppercase font-bold">{prod.duration}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-4 border-t-2 border-dashed border-gray-100 mt-3">
                      <button onClick={() => handleEditProduct(prod as ProductItem)} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteProduct(prod.id)}
                        className={`p-2 border-2 border-black transition-all ${!isInDb ? 'opacity-20 pointer-events-none' : 'hover:bg-red-600 hover:text-white'}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ─── MENTOR FORM MODAL ─────────────────────────────────────────────── */}
      {showMentorForm && editingMentor && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowMentorForm(false)}>
          <div className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0_0_#ccff00]" onClick={e => e.stopPropagation()}>
            <div className="bg-black text-[#ccff00] p-4 flex justify-between items-center sticky top-0 z-10 border-b-4 border-black">
              <h3 className="font-black uppercase tracking-widest text-xs">Operador // {editingMentor.id}</h3>
              <button onClick={() => setShowMentorForm(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveMentor} className="p-4 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 border-2 border-black border-dashed">
                <div className="w-32 md:w-40 aspect-[4/5] border-4 border-black overflow-hidden grayscale bg-gray-200 shadow-[8px_8px_0_0_#000]">
                  <img src={editingMentor.image || ''} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Nome Completo</label><input required value={editingMentor.name || ''} onChange={e => setEditingMentor({ ...editingMentor, name: e.target.value })} className="border-2 border-black p-3 font-black uppercase text-sm" /></div>
                  <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Cargo</label><input required value={editingMentor.role || ''} onChange={e => setEditingMentor({ ...editingMentor, role: e.target.value })} className="border-2 border-black p-3 font-mono font-bold uppercase text-xs" /></div>
                  <div className="flex flex-col gap-1 col-span-1 md:col-span-2"><label className="text-[10px] font-black uppercase opacity-60">URL da Imagem</label><input required value={editingMentor.image || ''} onChange={e => setEditingMentor({ ...editingMentor, image: e.target.value })} className="border-2 border-black p-3 font-mono text-[9px]" /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase">Bio Curta (Grid)</label><textarea required value={editingMentor.bio || ''} onChange={e => setEditingMentor({ ...editingMentor, bio: e.target.value })} className="w-full h-24 border-2 border-black p-3 font-mono text-xs" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase">Bio Detalhada (Pop-up)</label><textarea value={editingMentor.detailedBio || ''} onChange={e => setEditingMentor({ ...editingMentor, detailedBio: e.target.value })} className="w-full h-24 border-2 border-black p-3 font-mono text-xs bg-[#ccff00]/5" /></div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowMentorForm(false)} className="px-6 py-4 border-2 border-black font-black uppercase text-[10px]">Cancelar</button>
                <button type="submit" disabled={loading} className="px-10 py-4 bg-black text-[#ccff00] border-2 border-black font-black uppercase text-[10px] shadow-[8px_8px_0_0_#000] disabled:opacity-50">
                  {loading ? 'Salvando...' : 'Salvar Operador'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── EVENT FORM MODAL ──────────────────────────────────────────────── */}
      {showEventForm && editingEvent && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowEventForm(false)}>
          <div className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0_0_#ccff00]" onClick={e => e.stopPropagation()}>
            <div className="bg-black text-[#ccff00] p-4 flex justify-between items-center sticky top-0 z-10 border-b-4 border-black">
              <h3 className="font-black uppercase tracking-widest text-xs">Config_de_Evento {editingEvent._dbId ? `// ID:${editingEvent._dbId}` : '// Novo'}</h3>
              <button onClick={() => setShowEventForm(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-4 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 border-2 border-black border-dashed">
                <div className="w-32 md:w-40 aspect-square border-4 border-black overflow-hidden grayscale bg-gray-200 shadow-[8px_8px_0_0_#000]">
                  {editingEvent.image ? <img src={editingEvent.image} className="w-full h-full object-cover" alt="" /> : <Calendar size={48} className="m-auto mt-10 opacity-20" />}
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Dia</label><input required value={editingEvent.day || ''} onChange={e => setEditingEvent({ ...editingEvent, day: e.target.value })} className="border-2 border-black p-3 font-pixel text-sm" /></div>
                  <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Mês</label><input required value={editingEvent.month || ''} onChange={e => setEditingEvent({ ...editingEvent, month: e.target.value })} className="border-2 border-black p-3 font-black text-xs" /></div>
                  <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Ano</label><input required value={editingEvent.year || ''} onChange={e => setEditingEvent({ ...editingEvent, year: e.target.value })} className="border-2 border-black p-3 font-pixel text-sm" /></div>
                  <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Horário</label><input required value={editingEvent.time || ''} onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })} className="border-2 border-black p-3 font-black text-xs" /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Título do Evento</label><input required value={editingEvent.title || ''} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} className="border-2 border-black p-3 font-black uppercase text-sm" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Localização</label><input value={editingEvent.location || ''} onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })} className="border-2 border-black p-3 font-mono font-bold text-xs" /></div>
              </div>
              <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">URL da Foto</label><input value={editingEvent.image || ''} onChange={e => setEditingEvent({ ...editingEvent, image: e.target.value })} className="border-2 border-black p-3 font-mono text-[9px]" /></div>
              <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Link do Botão</label><input value={editingEvent.link || ''} onChange={e => setEditingEvent({ ...editingEvent, link: e.target.value })} className="border-2 border-black p-3 font-mono text-[9px]" /></div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase">Descrição</label><textarea required value={editingEvent.description || ''} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} className="w-full h-24 border-2 border-black p-3 font-mono text-xs" /></div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowEventForm(false)} className="px-6 py-4 border-2 border-black font-black uppercase text-[10px]">Cancelar</button>
                <button type="submit" disabled={loading} className="px-10 py-4 bg-black text-[#ccff00] border-2 border-black font-black uppercase text-[10px] shadow-[8px_8px_0_0_#000] disabled:opacity-50">
                  {loading ? 'Salvando...' : 'Salvar Evento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── RESULT FORM MODAL ─────────────────────────────────────────────── */}
      {showResultForm && editingResult && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowResultForm(false)}>
          <div className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0_0_#ccff00]" onClick={e => e.stopPropagation()}>
            <div className="bg-black text-[#ccff00] p-4 flex justify-between items-center sticky top-0 z-10 border-b-4 border-black">
              <h3 className="font-black uppercase tracking-widest text-xs">Evidence_Edit // {editingResult.id}</h3>
              <button onClick={() => setShowResultForm(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveResult} className="p-4 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 border-2 border-black border-dashed">
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Assunto (Nome - Empresa)</label><input required value={editingResult.subject || ''} onChange={e => setEditingResult({ ...editingResult, subject: e.target.value })} className="border-2 border-black p-3 font-black uppercase text-sm" placeholder="FULANO - MARCA" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Cargo / Status</label><input required value={editingResult.role || ''} onChange={e => setEditingResult({ ...editingResult, role: e.target.value })} className="border-2 border-black p-3 font-mono font-bold text-xs" placeholder="MEMBER SINCE 2024" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Label de Impacto</label><input value={editingResult.impactLabel || ''} onChange={e => setEditingResult({ ...editingResult, impactLabel: e.target.value })} className="border-2 border-black p-3 font-mono font-bold text-xs" placeholder="AUMENTO DE RECEITA" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">URL da Logo/Thumbnail</label><input required value={editingResult.thumbnail || ''} onChange={e => setEditingResult({ ...editingResult, thumbnail: e.target.value })} className="border-2 border-black p-3 font-mono text-[9px]" /></div>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase">Texto de Impacto (Caixa Verde)</label><textarea required value={editingResult.impact || ''} onChange={e => setEditingResult({ ...editingResult, impact: e.target.value })} className="w-full h-24 border-2 border-black p-3 font-pixel text-xs bg-[#ccff00]/5" placeholder="DE X PARA Y..." /></div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase opacity-60">URL do Vídeo (YouTube ou .mp4) ou Imagem</label>
                <input value={editingResult.video || ''} onChange={e => setEditingResult({ ...editingResult, video: e.target.value })} className="border-2 border-black p-3 font-mono text-[9px]" placeholder="https://youtube.com/watch?v=... ou https://cdn.../video.mp4" />
                <span className="text-[9px] text-gray-400 mt-1">Deixe vazio para exibir apenas a thumbnail no modal</span>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowResultForm(false)} className="px-6 py-4 border-2 border-black font-black uppercase text-[10px]">Cancelar</button>
                <button type="submit" disabled={loading} className="px-10 py-4 bg-black text-[#ccff00] border-2 border-black font-black uppercase text-[10px] shadow-[8px_8px_0_0_#000] disabled:opacity-50">
                  {loading ? 'Salvando...' : 'Gravar Evidência'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── PRODUCT FORM MODAL ─────────────────────────────────────────────── */}
      {showProductForm && editingProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowProductForm(false)}>
          <div className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0_0_#ccff00]" onClick={e => e.stopPropagation()}>
            <div className="bg-black text-[#ccff00] p-4 flex justify-between items-center sticky top-0 z-10 border-b-4 border-black">
              <h3 className="font-black uppercase tracking-widest text-xs">Product_Edit // {editingProduct.id}</h3>
              <button onClick={() => setShowProductForm(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-4 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 border-2 border-black border-dashed">
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Título</label><input required value={editingProduct.title || ''} onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })} className="border-2 border-black p-3 font-black uppercase text-sm" placeholder="NOVO PRODUTO" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Ícone (Terminal, Target, Cpu, TrendingUp, Zap)</label><input required value={editingProduct.iconName || ''} onChange={e => setEditingProduct({ ...editingProduct, iconName: e.target.value })} className="border-2 border-black p-3 font-mono text-xs" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Duração</label><input value={editingProduct.duration || ''} onChange={e => setEditingProduct({ ...editingProduct, duration: e.target.value })} className="border-2 border-black p-3 font-mono font-bold text-xs" placeholder="2 DIAS / LIVE" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Duração Label</label><input value={editingProduct.durationLabel || ''} onChange={e => setEditingProduct({ ...editingProduct, durationLabel: e.target.value })} className="border-2 border-black p-3 font-mono text-xs" placeholder="DE DURAÇÃO" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Tag de Data</label><input value={editingProduct.dateTag || ''} onChange={e => setEditingProduct({ ...editingProduct, dateTag: e.target.value })} className="border-2 border-black p-3 font-mono text-xs" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Preço Original</label><input value={editingProduct.originalPrice || ''} onChange={e => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })} className="border-2 border-black p-3 font-mono text-xs" placeholder="R$3.997,90" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Preço Ativo</label><input value={editingProduct.price || ''} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} className="border-2 border-black p-3 font-mono text-xs" placeholder="R$1.997,90" /></div>
                <div className="flex flex-col gap-1"><label className="text-[10px] font-black uppercase opacity-60">Link do Botão</label><input value={editingProduct.link || ''} onChange={e => setEditingProduct({ ...editingProduct, link: e.target.value })} className="border-2 border-black p-3 font-mono text-xs" /></div>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase">Descrição do Produto</label><textarea required value={editingProduct.description || ''} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full h-32 border-2 border-black p-3 font-mono text-xs" placeholder="Use [[texto]] para destacar em verde..." /></div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowProductForm(false)} className="px-6 py-4 border-2 border-black font-black uppercase text-[10px]">Cancelar</button>
                <button type="submit" disabled={loading} className="px-10 py-4 bg-black text-[#ccff00] border-2 border-black font-black uppercase text-[10px] shadow-[8px_8px_0_0_#000] disabled:opacity-50">
                  {loading ? 'Salvando...' : 'Salvar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .shadow-hard { box-shadow: 8px 8px 0 0 #000; }
        .shadow-hard-sm { box-shadow: 4px 4px 0 0 #000; }
      `}</style>
    </div>
  );
};

export default AdminPage;
