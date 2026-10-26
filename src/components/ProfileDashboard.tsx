import React, { useState } from 'react';
import { Camera, Mail, Phone, ShieldCheck, MapPin, User, CheckCircle, Wallet, Zap, Sun, Wrench, History, Activity, Calendar, Battery, AlertTriangle, FileText, Loader2, Eye, Download, Trash2, Car, ShieldAlert, FileCheck, QrCode, HelpCircle, CreditCard, ArrowRight, UploadCloud } from 'lucide-react';
import { Profile, Vehicle, Document, HistoryItem } from '../types';

interface ProfileDashboardProps {
  profile: Profile;
  vehicles: Vehicle[];
  documents: Document[];
  history: HistoryItem[];
  onBack: () => void;
  onContactClick: () => void;
  t: any;
  onFileClaim: (item: HistoryItem) => void;
  onViewReport: (item: HistoryItem) => void;
  onOpenEVMap: () => void;
  onVehicleClick: (vehicle: Vehicle) => void;
  onRegisterClick: () => void;
  onOpenQR: () => void;
  onOpenMarketplace: () => void;
  onOpenMaintenance: () => void;
  onUpdateProfile: (profile: Profile) => void;
  onAddDocument: (doc: Document) => void;
  onRemoveDocument: (id: string) => void;
}

export const ProfileDashboard = ({ 
  profile, 
  vehicles, 
  documents, 
  history, 
  onBack, 
  onContactClick, 
  t, 
  onFileClaim, 
  onViewReport, 
  onOpenEVMap, 
  onVehicleClick, 
  onRegisterClick, 
  onOpenQR, 
  onOpenMarketplace, 
  onOpenMaintenance, 
  onUpdateProfile, 
  onAddDocument, 
  onRemoveDocument 
}: ProfileDashboardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(10);
    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        const newDoc: Document = {
          id: `doc-${Date.now()}`,
          title: file.name,
          expiry: 'N/A',
          status: 'Valid',
          icon: FileText,
          image: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };
        if (onAddDocument) onAddDocument(newDoc);
        setTimeout(() => setUploadProgress(0), 500);
      } else {
        setUploadProgress(currentProgress);
      }
    }, 200);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedProfile({ ...editedProfile, photo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!/^\d+$/.test(editedProfile.phone)) {
      alert("Phone number must be numeric.");
      return;
    }
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const reminders = [
    ...documents.filter((d: any) => d.status === 'Expiring Soon').map((d: any) => ({ type: 'document', title: d.title, date: d.expiry })),
    ...vehicles.filter((v: any) => {
      const expiry = v.registrationExpiry.split('/');
      const expiryDate = new Date(parseInt(expiry[2]), parseInt(expiry[1]) - 1, parseInt(expiry[0]));
      const now = new Date();
      const diff = expiryDate.getTime() - now.getTime();
      return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
    }).map((v: any) => ({ type: 'vehicle', title: `${v.make} ${v.model} Registration`, date: v.registrationExpiry }))
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-20 transition-colors duration-300" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
          <div className="relative">
            <img src={editedProfile.photo || profile.photo} alt={profile.name} className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 dark:border-blue-500" />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <Camera size={16} />
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </label>
          </div>
          <div className="text-center md:text-start flex-1">
            <div className="mb-2">
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Welcome</p>
              {isEditing ? (
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">{t.profile.nameLabel}</label>
                    <input 
                      type="text" 
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">{t.profile.phoneLabel}</label>
                      <input 
                        type="text" 
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className={`w-full bg-zinc-50 dark:bg-zinc-800 border ${!/^\d+$/.test(editedProfile.phone) ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                      {!/^\d+$/.test(editedProfile.phone) && <p className="text-rose-500 text-[10px] mt-1">Must be numeric</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">{t.profile.addressLabel}</label>
                      <input 
                        type="text" 
                        value={editedProfile.address}
                        onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">{profile.name}</h1>
              )}
            </div>
            {!isEditing && (
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-2"><Mail size={16} /> {profile.email}</span>
                <span className="flex items-center gap-2"><Phone size={16} /> {profile.phone}</span>
                <span className="flex items-center gap-2 font-mono"><ShieldCheck size={16} /> {profile.idNumber}</span>
                <span className="flex items-center gap-2"><MapPin size={16} /> {profile.address}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  {t.profile.save}
                </button>
                <button 
                  onClick={() => { setIsEditing(false); setEditedProfile({ ...profile }); }}
                  className="px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {t.profile.cancel}
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <User size={18} />
                {t.profile.edit}
              </button>
            )}
            <button 
              onClick={onBack}
              className="px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {t.profile.back}
            </button>
            <button 
              onClick={async () => {
                await fetch('/api/mock/accident-update', {
                  method: 'POST',
                  headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': 'dev-api-key-123'
                  },
                  body: JSON.stringify({ reportId: 'SR-10182', status: 'Approved' })
                })
              }}
              className="px-6 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Test Notification
            </button>
          </div>
        </div>

        {/* Smart Summary & Digital Wallet */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl text-white shadow-lg shadow-blue-600/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold opacity-80 uppercase tracking-wider">{t.profile.wallet}</span>
              <Wallet size={20} />
            </div>
            <p className="text-3xl font-black mb-1">AED 1,240.50</p>
            <p className="text-xs opacity-70">{t.profile.walletDesc}</p>
            <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-colors">{t.profile.topUp}</button>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{t.profile.points}</span>
              <Zap size={20} className="text-amber-500" />
            </div>
            <p className="text-3xl font-black text-zinc-900 dark:text-white mb-1">04</p>
            <p className="text-xs text-zinc-500">{t.profile.pointsDesc}</p>
            <div className="mt-4 w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[16.6%]"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{t.profile.ecoScore}</span>
              <Sun size={20} className="text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-zinc-900 dark:text-white mb-1">88/100</p>
            <p className="text-xs text-zinc-500">{t.profile.ecoDesc}</p>
            <div className="mt-4 w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[88%]"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{t.profile.rewards}</span>
              <Zap size={20} className="text-blue-500" />
            </div>
            <p className="text-3xl font-black text-zinc-900 dark:text-white mb-1">2,450</p>
            <p className="text-xs text-zinc-500">{t.profile.rewardsDesc}</p>
            <button className="mt-4 w-full py-2 text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">{t.profile.viewRewards}</button>
          </div>
        </div>

        {/* Predictive Maintenance & EV Support Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                  <Wrench className="text-amber-600 dark:text-amber-400" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{t?.profile?.maintenance?.title}</h2>
                  <p className="text-xs text-zinc-500">{t.profile.maintenance.desc}</p>
                </div>
              </div>
              <button 
                onClick={onOpenMaintenance}
                className="p-2 text-zinc-400 hover:text-amber-600 transition-colors"
              >
                <History size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-blue-500" />
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{t?.profile?.maintenance?.alerts?.title}</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Brake Pad Wear (85%)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full">Low Priority</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-emerald-500" />
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{t.profile.maintenance.nextService}</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">15,000 KM Service</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">In 1,240 KM</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                <Battery className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{t?.profile?.ev?.title}</h2>
                <p className="text-xs text-zinc-500">{t.profile.ev.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{t.profile.ev.health}</p>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">94%</p>
                <p className="text-[10px] text-zinc-500 mt-1">Excellent Condition</p>
              </div>
              <button 
                onClick={onOpenEVMap}
                className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
              >
                <MapPin size={24} className="mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{t.profile.ev.stations}</p>
                <p className="text-[10px] text-zinc-500 mt-1">3 Nearby Found</p>
              </button>
            </div>
          </div>
        </div>

        {/* Reminders Section */}
        {reminders.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-amber-500" size={20} />
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{t.profile.expiries}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reminders.map((r, i) => (
                <div key={i} className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{t.profile.types[r.type as keyof typeof t.profile.types] || r.type}</p>
                    <p className="font-bold text-zinc-900 dark:text-white">{r.title}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.profile.expires}: {r.date}</p>
                  </div>
                  <button className="px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-full hover:bg-amber-600 transition-colors">{t.profile.renewNow}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Documents & Vehicles */}
          <div className="lg:col-span-2 space-y-8">
            {/* Documents */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileText className="text-blue-600" /> {t.profile.documents}
                </h2>
                <div className="flex items-center gap-4">
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-xs text-zinc-500">{uploadProgress}%</span>
                    </div>
                  )}
                  <label className="text-blue-600 text-sm font-bold hover:underline cursor-pointer flex items-center gap-1">
                    <UploadCloud size={16} />
                    {t.profile.addNew}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      disabled={uploadProgress > 0 && uploadProgress < 100}
                    />
                  </label>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {documents.map((doc: any) => (
                  <div key={doc.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all group overflow-hidden">
                    {doc.image && (
                      <div className="mb-4 -mx-6 -mt-6 h-32 overflow-hidden relative">
                        <img src={doc.image} alt={doc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl relative">
                        <doc.icon className="text-blue-600 dark:text-blue-400" size={20} />
                        {doc.status === 'Expiring Soon' && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-white dark:border-zinc-900 rounded-full animate-pulse" />
                        )}
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 ${doc.status === 'active' || doc.status === 'Valid' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'} rounded-full`}>
                        {t.documentStatuses[doc.status as keyof typeof t.documentStatuses] || doc.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{t.documentTypes[doc.type as keyof typeof t.documentTypes] || doc.type}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.profile.expires}: {doc.expiry}</p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-2 text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex items-center justify-center gap-2">
                        <Eye size={16} /> {t.profile.view}
                      </button>
                      <button 
                        className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                      <button 
                        onClick={() => onRemoveDocument && onRemoveDocument(doc.id)}
                        className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Vehicles */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Car className="text-blue-600" /> {t.profile.vehicles}
                </h2>
                <button onClick={onRegisterClick} className="text-blue-600 text-sm font-bold hover:underline cursor-pointer">{t.profile.register}</button>
              </div>
              <div className="space-y-4">
                {vehicles.map((v: any) => {
                  const expiry = v.registrationExpiry.split('/');
                  const expiryDate = new Date(parseInt(expiry[2]), parseInt(expiry[1]) - 1, parseInt(expiry[0]));
                  const now = new Date();
                  const isExpiringSoon = (expiryDate.getTime() - now.getTime()) < 30 * 24 * 60 * 60 * 1000;

                  return (
                    <div 
                      key={v.id} 
                      onClick={() => onVehicleClick(v)}
                      className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-md transition-shadow relative overflow-hidden cursor-pointer group"
                    >
                      {isExpiringSoon && (
                        <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-rose-500/20 rotate-45 flex items-end justify-center pb-2">
                          <AlertTriangle size={16} className="text-rose-600 dark:text-rose-400" />
                        </div>
                      )}
                      <div className={`w-20 h-20 rounded-xl flex items-center justify-center shrink-0 relative ${isExpiringSoon ? 'bg-rose-50 dark:bg-rose-900/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                        <Car size={32} className={isExpiringSoon ? 'text-rose-500' : 'text-zinc-400'} />
                        {isExpiringSoon && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-white dark:border-zinc-900 rounded-full animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                          {v.make} {v.model}
                          {isExpiringSoon && <span className="text-[10px] bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">{t.profile.actionRequired}</span>}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-3">{v.year} • {v.color}</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{t.profile.expiry}</p>
                            <p className={`text-sm font-semibold ${isExpiringSoon ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-700 dark:text-zinc-300'}`}>{v.registrationExpiry}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{t.profile.insurance}</p>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{v.insuranceStatus}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{t.profile.provider}</p>
                            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{v.insuranceProvider}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{t.profile.lastService}</p>
                            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{v.lastInspection}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-zinc-50 dark:bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-center shrink-0">
                        <p className="text-xs text-zinc-400 uppercase font-bold tracking-widest">{t.profile.plate}</p>
                        <p className="text-xl font-black text-zinc-900 dark:text-white font-mono">{v.plate}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Service History & Quick Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <section className="bg-blue-600 dark:bg-blue-700 p-8 rounded-3xl text-white">
              <h2 className="text-xl font-bold mb-6">{t.profile.quick}</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <ShieldAlert size={20} />, label: t.profile.quickActions?.report || "Report Accident", action: () => {} },
                  { icon: <CreditCard size={20} />, label: t.profile.quickActions?.pay || "Pay Fines", action: () => {} },
                  { icon: <FileCheck size={20} />, label: t.profile.quickActions?.renew || "Renew License", action: () => {} },
                  { icon: <QrCode size={20} />, label: t?.profile?.digitalKeys?.title || "", action: onOpenQR },
                  { icon: <HelpCircle size={20} />, label: t.profile.reportOther, action: onContactClick }
                ].map((action, i) => (
                  <button 
                    key={i} 
                    onClick={action.action}
                    className={`flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors cursor-pointer ${i === 4 ? 'col-span-2' : ''}`}
                  >
                    {action.icon}
                    <span className="text-xs font-bold text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Active Requests */}
            <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Active Requests</h2>
              <div className="space-y-4">
                {history.filter((item: any) => item.status !== 'Completed' && item.status !== 'Paid').map((item: any) => (
                  <div key={item.id} className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 flex justify-between items-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors" onClick={() => onViewReport(item)}>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{item.service}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.date}</p>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">{item.status}</span>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                ))}
                {history.filter((item: any) => item.status !== 'Completed' && item.status !== 'Paid').length === 0 && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">No active requests.</p>
                )}
              </div>
            </section>

            {/* Accident Reports */}
            <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Accident Reports</h2>
              <div className="space-y-4">
                {history.filter((item: any) => item.service.includes("Accident")).map((item: any) => (
                  <div key={item.id} className="p-5 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{item.service}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.date}</p>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">{item.status}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => onFileClaim(item)} className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full hover:bg-blue-700 transition-colors">
                        {t.profile.insuranceClaims.fileClaim}
                      </button>
                      <button onClick={() => onViewReport(item)} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px] font-bold rounded-full hover:bg-zinc-300 transition-colors">
                        {t.profile.view} {t.profile.types.document}
                      </button>
                      <button onClick={() => console.log('Download report', item.id)} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px] font-bold rounded-full hover:bg-zinc-300 transition-colors">
                        Download Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Service History */}
            <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">{t.profile.activity}</h2>
              <div className="space-y-6">
                {history.filter((item: any) => !item.service.includes("Accident")).map((item: any) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-1 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{item.service}</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.date}</p>
                          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{item.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors cursor-pointer">{t.profile.history}</button>
            </section>
          </div>
        </div>
        {/* Enhanced Footer */}
        <footer className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-start">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
                <span className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter">SAAED</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                {t.hero.desc}
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <div key={social} className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-sm opacity-50" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-6">{t?.footer?.about?.title}</h3>
              <ul className="space-y-4">
                {t.footer.about.links.map((link: string) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-6">{t?.footer?.media?.title}</h3>
              <ul className="space-y-4">
                {t.footer.media.links.map((link: string) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-6">{t.nav.contact}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <Phone size={16} className="text-blue-600" />
                  <span>800-SAAED (72233)</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <Mail size={16} className="text-blue-600" />
                  <span>info@saaed.ae</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <MapPin size={16} className="text-blue-600" />
                  <span>Abu Dhabi, UAE</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Need Help?</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mb-3">Our AI assistant is available 24/7 to help you with your queries.</p>
                <button onClick={onContactClick} className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Start Chatting Now</button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t.footer.copyright}
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
