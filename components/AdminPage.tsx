import { useState, useEffect } from 'react';
import { Lock, Package, MapPin, MessageSquare, Plus, Edit2, Trash2, Save, X, Eye, LogOut, BarChart2, CheckCircle, Clock, AlertCircle, Star, Quote, Upload, Image, Link } from 'lucide-react';
import { auth, api } from '../store';
import type { Package as Pkg, Destination, Inquiry, Testimonial } from '../store';

type Tab = 'dashboard' | 'packages' | 'destinations' | 'inquiries' | 'testimonials';

const emptyPkg: Omit<Pkg, 'id'> = {
  name: '', type: 'Adventure Trek', price: 0, duration: 1,
  difficulty: 'Easy', location: '', description: '', image: '',
};

const TYPES = ['Adventure Trek','Cultural Tour','Wildlife Safari','Mountain Expedition','Pilgrimage','City Tour'];
const DIFFICULTIES = ['Easy','Moderate','Challenging','Extreme'];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');
  const [loading, setLoading] = useState(false);

  // Data state
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Package editing
  const [editingPkg, setEditingPkg] = useState<Pkg | null>(null);
  const [addingPkg, setAddingPkg] = useState(false);
  const [newPkg, setNewPkg] = useState<Omit<Pkg,'id'>>(emptyPkg);

  // Destination editing
  const [newDest, setNewDest] = useState({ name: '', region: '' });
  const [addingDest, setAddingDest] = useState(false);

  // Image upload
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState<'file' | 'url'>('file');

  // Inquiry detail
  const [viewInquiry, setViewInquiry] = useState<Inquiry | null>(null);

  // Testimonial editing
  const emptyT: Omit<Testimonial, 'id'> = { name: '', country: '', tour: '', text: '', rating: 5, avatar: '', color: 'bg-brand-400' };
  const [editingT, setEditingT] = useState<Testimonial | null>(null);
  const [addingT, setAddingT] = useState(false);
  const [newT, setNewT] = useState<Omit<Testimonial, 'id'>>(emptyT);

  // Check existing token on mount
  useEffect(() => {
    if (auth.getToken()) {
      auth.verify().then(valid => {
        setAuthed(valid);
        if (!valid) auth.logout();
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, []);

  // Load data when authed
  useEffect(() => {
    if (authed) refresh();
  }, [authed]);

  const refresh = async () => {
    setLoading(true);
    try {
      const [pkgs, dests, inqs, tests] = await Promise.all([
        api.getPackages(),
        api.getDestinations(),
        api.getInquiries(),
        api.getTestimonials(),
      ]);
      setPackages(pkgs);
      setDestinations(dests);
      setInquiries(inqs);
      setTestimonials(tests);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
    setLoading(false);
  };

  // Testimonial ops
  const saveT = async () => {
    if (!newT.name || !newT.text) return alert('Name and review text are required');
    const avatar = newT.avatar || newT.name[0].toUpperCase();
    await api.createTestimonial({ ...newT, avatar });
    setAddingT(false);
    setNewT(emptyT);
    refresh();
  };
  const updateT = async () => {
    if (!editingT) return;
    const avatar = editingT.avatar || editingT.name[0].toUpperCase();
    await api.updateTestimonial(editingT.id, { ...editingT, avatar });
    setEditingT(null);
    refresh();
  };
  const deleteT = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.deleteTestimonial(id);
    refresh();
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(email, pw);
      setAuthed(true);
      setPwError('');
    } catch {
      setPwError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    auth.logout();
    setAuthed(false);
  };

  // Package ops
  const savePkg = async () => {
    if (!newPkg.name || !newPkg.location) return alert('Name and location are required');
    await api.createPackage(newPkg);
    setAddingPkg(false);
    setNewPkg(emptyPkg);
    refresh();
  };

  const updatePkg = async () => {
    if (!editingPkg) return;
    await api.updatePackage(editingPkg.id, editingPkg);
    setEditingPkg(null);
    refresh();
  };

  const deletePkg = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    await api.deletePackage(id);
    refresh();
  };

  // Destination ops
  const addDest = async () => {
    if (!newDest.name) return alert('Destination name is required');
    await api.createDestination(newDest);
    setNewDest({ name: '', region: '' });
    setAddingDest(false);
    refresh();
  };

  const deleteDest = async (id: string) => {
    if (!confirm('Remove this destination?')) return;
    await api.deleteDestination(id);
    refresh();
  };

  // Inquiry ops
  const markRead = async (id: string) => {
    const updated = await api.updateInquiryStatus(id, 'read');
    setInquiries(prev => prev.map(i => i.id === id ? updated : i));
    if (viewInquiry?.id === id) setViewInquiry(updated);
  };
  const markReplied = async (id: string) => {
    const updated = await api.updateInquiryStatus(id, 'replied');
    setInquiries(prev => prev.map(i => i.id === id ? updated : i));
    if (viewInquiry?.id === id) setViewInquiry(updated);
  };
  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await api.deleteInquiry(id);
    setInquiries(prev => prev.filter(i => i.id !== id));
    if (viewInquiry?.id === id) setViewInquiry(null);
  };

  // Stats
  const newCount = inquiries.filter(i => i.status === 'new').length;
  const bookingCount = inquiries.filter(i => i.type === 'booking').length;
  const contactCount = inquiries.filter(i => i.type === 'contact').length;

  const statusBadge = (s: Inquiry['status']) => {
    if (s === 'new') return <span className="bg-crimson-500/10 text-crimson-500 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3"/>New</span>;
    if (s === 'read') return <span className="bg-brand-400/10 text-brand-500 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><Eye className="w-3 h-3"/>Read</span>;
    return <span className="bg-sky-400/10 text-sky-500 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3"/>Replied</span>;
  };

  // ── Loading / Checking Token ──────────────────────────────────────────────
  if (checking) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="text-navy-300 text-sm">Checking session...</div>
      </div>
    );
  }

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-brand-400" />
            </div>
            <h1 className="text-2xl font-bold text-navy-800">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">Community Tours and Travels</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@communitytours.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" autoFocus />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Password</label>
              <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" />
            </div>
            {pwError && <p className="text-crimson-500 text-sm font-medium">{pwError}</p>}
            <button type="submit" className="w-full bg-navy-700 text-white py-3.5 rounded-xl font-bold hover:bg-navy-800 transition-all">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin Shell ───────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'packages', label: `Packages (${packages.length})`, icon: Package },
    { id: 'destinations', label: `Destinations (${destinations.length})`, icon: MapPin },
    { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: Star },
    { id: 'inquiries', label: `Inquiries${newCount > 0 ? ` (${newCount} new)` : ''}`, icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-navy-900 text-white px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-400 rounded-xl flex items-center justify-center">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base leading-tight">Admin Panel</h1>
            <p className="text-navy-400 text-[10px]">Community Tours and Travels</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-navy-300 hover:text-white text-sm transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </header>

      {loading && (
        <div className="bg-brand-400 text-white text-center text-xs py-1.5 font-semibold">Loading data...</div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">

        {/* Sidebar Tabs */}
        <aside className="lg:w-56 flex-shrink-0">
          <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${tab === t.id ? 'bg-navy-700 text-white' : 'text-navy-600 hover:bg-gray-50'}`}>
                <t.icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline lg:inline">{t.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">

          {/* ─── Dashboard ──────────────────────────── */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-navy-800">Dashboard Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Total Packages', value: packages.length, color: 'bg-navy-700', icon: Package },
                  { label: 'Destinations', value: destinations.length, color: 'bg-sky-400', icon: MapPin },
                  { label: 'Testimonials', value: testimonials.length, color: 'bg-brand-400', icon: Star },
                  { label: 'New Inquiries', value: newCount, color: 'bg-crimson-500', icon: AlertCircle },
                  { label: 'Total Inquiries', value: inquiries.length, color: 'bg-navy-700', icon: MessageSquare },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-navy-800">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-navy-800 mb-4">Recent Inquiries</h3>
                {inquiries.slice(0, 5).length === 0
                  ? <p className="text-gray-400 text-sm">No inquiries yet.</p>
                  : inquiries.slice(0, 5).map(i => (
                    <div key={i.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div>
                        <div className="font-semibold text-navy-700 text-sm">{i.name}</div>
                        <div className="text-xs text-gray-400">{i.type === 'booking' ? 'Booking' : 'Contact'} · {new Date(i.submittedAt).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {statusBadge(i.status)}
                        <button onClick={() => { setViewInquiry(i); setTab('inquiries'); }} className="text-sky-400 hover:text-sky-500 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* ─── Packages ───────────────────────────── */}
          {tab === 'packages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy-800">Manage Packages</h2>
                <button onClick={() => { setAddingPkg(true); setEditingPkg(null); }}
                  className="bg-brand-400 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Package
                </button>
              </div>

              {/* Add / Edit Form */}
              {(addingPkg || editingPkg) && (
                <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6">
                  <h3 className="font-bold text-navy-800 mb-5">{editingPkg ? 'Edit Package' : 'Add New Package'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Package Name *', field: 'name', type: 'text', placeholder: 'e.g. Everest Base Camp Trek' },
                      { label: 'Location *', field: 'location', type: 'text', placeholder: 'e.g. Khumbu, Solukhumbu' },
                      { label: 'Price (NPR)', field: 'price', type: 'number', placeholder: '0' },
                      { label: 'Duration (days)', field: 'duration', type: 'number', placeholder: '1' },
                    ].map(f => (
                      <div key={f.field}>
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder}
                          value={editingPkg ? String((editingPkg as any)[f.field]) : String((newPkg as any)[f.field])}
                          onChange={e => editingPkg
                            ? setEditingPkg({ ...editingPkg, [f.field]: f.type === 'number' ? Number(e.target.value) : e.target.value })
                            : setNewPkg({ ...newPkg, [f.field]: f.type === 'number' ? Number(e.target.value) : e.target.value })
                          }
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                      </div>
                    ))}

                    {/* Image Upload / URL */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-navy-600 mb-1.5">Package Image</label>
                      <div className="flex items-center gap-2 mb-3">
                        <button type="button" onClick={() => setImageMode('file')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${imageMode === 'file' ? 'bg-navy-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                          <Upload className="w-3.5 h-3.5" /> Upload File
                        </button>
                        <button type="button" onClick={() => setImageMode('url')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${imageMode === 'url' ? 'bg-navy-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                          <Link className="w-3.5 h-3.5" /> Image URL
                        </button>
                      </div>

                      {imageMode === 'file' ? (
                        <div className="flex items-center gap-4">
                          <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? 'border-brand-400 bg-brand-400/5' : 'border-gray-300 hover:border-navy-400 hover:bg-gray-50'}`}>
                            {uploading ? (
                              <span className="text-sm text-brand-500 font-semibold">Uploading...</span>
                            ) : (
                              <>
                                <Image className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-500">Choose an image (max 5MB)</span>
                              </>
                            )}
                            <input type="file" accept="image/*" className="hidden" disabled={uploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUploading(true);
                                try {
                                  const { url } = await api.uploadImage(file);
                                  if (editingPkg) setEditingPkg({ ...editingPkg, image: url });
                                  else setNewPkg({ ...newPkg, image: url });
                                } catch (err: any) {
                                  alert(err.message || 'Upload failed');
                                }
                                setUploading(false);
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        <input type="text" placeholder="https://images.unsplash.com/..."
                          value={editingPkg ? editingPkg.image : newPkg.image}
                          onChange={e => editingPkg
                            ? setEditingPkg({ ...editingPkg, image: e.target.value })
                            : setNewPkg({ ...newPkg, image: e.target.value })
                          }
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                      )}

                      {/* Preview */}
                      {(editingPkg?.image || newPkg.image) && (
                        <div className="mt-3 flex items-start gap-3">
                          <img
                            src={editingPkg ? editingPkg.image : newPkg.image}
                            alt="Preview"
                            className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            onLoad={(e) => { (e.target as HTMLImageElement).style.display = 'block'; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 truncate">{editingPkg ? editingPkg.image : newPkg.image}</p>
                            <button type="button" onClick={() => editingPkg ? setEditingPkg({ ...editingPkg, image: '' }) : setNewPkg({ ...newPkg, image: '' })}
                              className="text-xs text-crimson-500 hover:underline mt-1">Remove image</button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-600 mb-1.5">Type</label>
                      <select value={editingPkg ? editingPkg.type : newPkg.type}
                        onChange={e => editingPkg ? setEditingPkg({...editingPkg, type: e.target.value}) : setNewPkg({...newPkg, type: e.target.value})}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-600 mb-1.5">Difficulty</label>
                      <select value={editingPkg ? editingPkg.difficulty : newPkg.difficulty}
                        onChange={e => editingPkg ? setEditingPkg({...editingPkg, difficulty: e.target.value}) : setNewPkg({...newPkg, difficulty: e.target.value})}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                        {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-navy-600 mb-1.5">Description</label>
                      <textarea rows={3} placeholder="Short description of the package..."
                        value={editingPkg ? editingPkg.description : newPkg.description}
                        onChange={e => editingPkg ? setEditingPkg({...editingPkg, description: e.target.value}) : setNewPkg({...newPkg, description: e.target.value})}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={editingPkg ? updatePkg : savePkg}
                      className="bg-navy-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-navy-800 transition-all flex items-center gap-2">
                      <Save className="w-4 h-4" />{editingPkg ? 'Save Changes' : 'Add Package'}
                    </button>
                    <button onClick={() => { setEditingPkg(null); setAddingPkg(false); setNewPkg(emptyPkg); }}
                      className="border-2 border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Package List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-navy-600 uppercase tracking-wider">Package</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-navy-600 uppercase tracking-wider hidden sm:table-cell">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-navy-600 uppercase tracking-wider hidden md:table-cell">Duration</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-navy-600 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-navy-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {packages.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-navy-800">{p.name}</div>
                            <div className="text-xs text-gray-400">{p.location}</div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell text-gray-500">{p.type}</td>
                          <td className="px-4 py-3 hidden md:table-cell text-gray-500">{p.duration} days</td>
                          <td className="px-4 py-3 font-bold text-navy-700">NPR {p.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => { setEditingPkg(p); setAddingPkg(false); window.scrollTo(0,0); }}
                                className="w-8 h-8 bg-sky-400/10 text-sky-500 rounded-lg hover:bg-sky-400/20 transition-colors flex items-center justify-center">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => deletePkg(p.id)}
                                className="w-8 h-8 bg-crimson-500/10 text-crimson-500 rounded-lg hover:bg-crimson-500/20 transition-colors flex items-center justify-center">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {packages.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No packages yet. Click "Add Package" to get started.</div>}
                </div>
              </div>
            </div>
          )}

          {/* ─── Destinations ───────────────────────── */}
          {tab === 'destinations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy-800">Manage Destinations</h2>
                <button onClick={() => setAddingDest(true)}
                  className="bg-brand-400 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Destination
                </button>
              </div>

              {addingDest && (
                <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6">
                  <h3 className="font-bold text-navy-800 mb-4">Add New Destination</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-600 mb-1.5">Destination Name *</label>
                      <input type="text" value={newDest.name} onChange={e => setNewDest({...newDest, name: e.target.value})} placeholder="e.g. Manang"
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-600 mb-1.5">Region / Province</label>
                      <input type="text" value={newDest.region} onChange={e => setNewDest({...newDest, region: e.target.value})} placeholder="e.g. Gandaki Province"
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addDest} className="bg-navy-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-navy-800 transition-all flex items-center gap-2">
                      <Save className="w-4 h-4" /> Save Destination
                    </button>
                    <button onClick={() => { setAddingDest(false); setNewDest({name:'',region:''}); }}
                      className="border-2 border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0">
                  {destinations.map(d => (
                    <div key={d.id} className="flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-semibold text-navy-800 text-sm">{d.name}</div>
                        {d.region && <div className="text-xs text-gray-400">{d.region}</div>}
                      </div>
                      <button onClick={() => deleteDest(d.id)}
                        className="w-7 h-7 bg-crimson-500/10 text-crimson-500 rounded-lg hover:bg-crimson-500/20 transition-colors flex items-center justify-center flex-shrink-0 ml-3">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                {destinations.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No destinations yet.</div>}
              </div>
            </div>
          )}

          {/* ─── Testimonials ───────────────────────── */}
          {tab === 'testimonials' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy-800">Manage Testimonials</h2>
                <button onClick={() => { setAddingT(true); setEditingT(null); }}
                  className="bg-brand-400 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Testimonial
                </button>
              </div>

              {/* Add / Edit Form */}
              {(addingT || editingT) && (() => {
                const val = editingT ?? newT;
                const set = (patch: Partial<Testimonial>) =>
                  editingT ? setEditingT({ ...editingT, ...patch }) : setNewT({ ...newT, ...patch } as Omit<Testimonial,'id'>);
                return (
                  <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6">
                    <h3 className="font-bold text-navy-800 mb-5">{editingT ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Full Name *</label>
                        <input type="text" value={val.name} onChange={e => set({ name: e.target.value })} placeholder="e.g. John Smith"
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Country</label>
                        <input type="text" value={val.country} onChange={e => set({ country: e.target.value })} placeholder="e.g. United Kingdom"
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Tour / Package</label>
                        <input type="text" value={val.tour} onChange={e => set({ tour: e.target.value })} placeholder="e.g. Annapurna Circuit"
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Rating</label>
                        <select value={val.rating} onChange={e => set({ rating: Number(e.target.value) })}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r!==1?'s':''}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Avatar Letter (auto-fills from name)</label>
                        <input type="text" maxLength={1} value={val.avatar} onChange={e => set({ avatar: e.target.value.toUpperCase() })} placeholder="E.g. J"
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Avatar Color</label>
                        <select value={val.color} onChange={e => set({ color: e.target.value })}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                          <option value="bg-brand-400">Orange</option>
                          <option value="bg-crimson-500">Red</option>
                          <option value="bg-sky-400">Sky Blue</option>
                          <option value="bg-navy-700">Navy</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Review Text *</label>
                        <textarea rows={4} value={val.text} onChange={e => set({ text: e.target.value })} placeholder="Write the customer's review here..."
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-700 transition-colors resize-none" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-5">
                      <button onClick={editingT ? updateT : saveT}
                        className="bg-navy-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-navy-800 transition-all flex items-center gap-2">
                        <Save className="w-4 h-4" />{editingT ? 'Save Changes' : 'Add Testimonial'}
                      </button>
                      <button onClick={() => { setEditingT(null); setAddingT(false); setNewT(emptyT); }}
                        className="border-2 border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Testimonial Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                          {t.avatar || t.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-navy-800 text-sm">{t.name}</div>
                          <div className="text-xs text-gray-400">{t.country}{t.tour ? ` · ${t.tour}` : ''}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { setEditingT(t); setAddingT(false); window.scrollTo(0,0); }}
                          className="w-7 h-7 bg-sky-400/10 text-sky-500 rounded-lg hover:bg-sky-400/20 transition-colors flex items-center justify-center">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteT(t.id)}
                          className="w-7 h-7 bg-crimson-500/10 text-crimson-500 rounded-lg hover:bg-crimson-500/20 transition-colors flex items-center justify-center">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(t.rating)].map((_,i) => <Star key={i} className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />)}
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 italic">"{t.text}"</p>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <div className="md:col-span-2 py-12 text-center text-gray-400 text-sm">
                    <Quote className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No testimonials yet. Click "Add Testimonial" to get started.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── Inquiries ──────────────────────────── */}
          {tab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-xl font-bold text-navy-800">Inquiries & Bookings</h2>
                <div className="flex gap-2 text-xs font-bold">
                  <span className="bg-brand-400/10 text-brand-500 px-3 py-1.5 rounded-full">Bookings: {bookingCount}</span>
                  <span className="bg-sky-400/10 text-sky-500 px-3 py-1.5 rounded-full">Contacts: {contactCount}</span>
                  <span className="bg-crimson-500/10 text-crimson-500 px-3 py-1.5 rounded-full">New: {newCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* List */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {inquiries.length === 0
                    ? <div className="py-16 text-center text-gray-400 text-sm">No inquiries received yet.</div>
                    : inquiries.map(i => (
                      <div key={i.id}
                        onClick={() => { setViewInquiry(i); if (i.status === 'new') markRead(i.id); }}
                        className={`flex items-start justify-between px-5 py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${viewInquiry?.id === i.id ? 'bg-navy-50 border-l-4 border-l-navy-700' : ''}`}>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-navy-800 text-sm truncate">{i.name}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${i.type === 'booking' ? 'bg-brand-400/20 text-brand-500' : 'bg-sky-400/20 text-sky-500'}`}>
                              {i.type}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 truncate">{i.package || i.subject || 'No subject'}</div>
                          <div className="text-xs text-gray-300 mt-0.5">{new Date(i.submittedAt).toLocaleString()}</div>
                        </div>
                        <div className="ml-3 flex-shrink-0">{statusBadge(i.status)}</div>
                      </div>
                    ))
                  }
                </div>

                {/* Detail */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  {!viewInquiry
                    ? <div className="text-center text-gray-400 text-sm py-10"><Eye className="w-8 h-8 mx-auto mb-2 opacity-30" />Click an inquiry to view details</div>
                    : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-navy-800">Inquiry Details</h3>
                          {statusBadge(viewInquiry.status)}
                        </div>

                        <div className="space-y-2 text-sm">
                          {[
                            ['Name', viewInquiry.name],
                            ['Email', viewInquiry.email],
                            ['Phone', viewInquiry.phone],
                            ['Type', viewInquiry.type],
                            ['Package', viewInquiry.package],
                            ['Destination', viewInquiry.destination],
                            ['Travel Date', viewInquiry.travelDate],
                            ['Travelers', viewInquiry.travelers],
                            ['Subject', viewInquiry.subject],
                            ['Received', new Date(viewInquiry.submittedAt).toLocaleString()],
                          ].filter(([, v]) => v).map(([label, value]) => (
                            <div key={label} className="flex gap-2">
                              <span className="text-gray-400 text-xs font-semibold w-20 flex-shrink-0 pt-0.5">{label}</span>
                              <span className="text-navy-800 font-medium text-xs">{value}</span>
                            </div>
                          ))}
                        </div>

                        {viewInquiry.message && (
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs font-semibold text-gray-400 mb-1">Message</div>
                            <p className="text-sm text-gray-700 leading-relaxed">{viewInquiry.message}</p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                          <a href={(() => {
                            const subj = viewInquiry.type === 'booking'
                              ? `Re: Your Booking Inquiry${viewInquiry.package ? ` - ${viewInquiry.package}` : ''}`
                              : `Re: ${viewInquiry.subject || 'Your Inquiry'} - Community Tours`;
                            const body = [
                              `Dear ${viewInquiry.name},`,
                              '',
                              'Thank you for reaching out to Community Tours and Travels!',
                              '',
                              '--- Your inquiry details ---',
                              viewInquiry.package ? `Package: ${viewInquiry.package}` : '',
                              viewInquiry.destination ? `Destination: ${viewInquiry.destination}` : '',
                              viewInquiry.travelDate ? `Travel Date: ${viewInquiry.travelDate}` : '',
                              viewInquiry.travelers ? `Travelers: ${viewInquiry.travelers}` : '',
                              '---',
                              '',
                              'Best regards,',
                              'Community Tours and Travels',
                              '+977-01-4976661 | communitytravelservices@gmail.com',
                            ].filter(Boolean).join('\n');
                            return `mailto:${viewInquiry.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
                          })()}
                            className="bg-brand-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all text-center">
                            Reply via Email
                          </a>
                          {viewInquiry.status !== 'replied' && (
                            <button onClick={() => markReplied(viewInquiry.id)}
                              className="bg-sky-400/10 text-sky-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-400/20 transition-all flex items-center justify-center gap-2">
                              <CheckCircle className="w-4 h-4" /> Mark as Replied
                            </button>
                          )}
                          <button onClick={() => deleteInquiry(viewInquiry.id)}
                            className="bg-crimson-500/10 text-crimson-500 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-crimson-500/20 transition-all flex items-center justify-center gap-2">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
