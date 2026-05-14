import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Banknote, CheckCircle, Smartphone, Mail, Lock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [bankLinked, setBankLinked] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast.success('Profile updated successfully!');
  };

  const handleLinkBank = async () => {
    toast('Redirecting to secure portal...', { icon: "🏦" });
    await new Promise(resolve => setTimeout(resolve, 2000));
    setBankLinked(true);
    toast.success('Bank account linked successfully!');
  };

  const handlePasswordUpdate = () => {
    toast.success('Password update email sent to your inbox.');
  };

  const tabs = [
    { id: 'profile', label: 'Profile & KYC', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'bank', label: 'Bank Details', icon: Banknote },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Account Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your profile, security preferences, and KYC.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              
              {/* KYC Status Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">KYC Verified</h3>
                    <p className="text-emerald-100 text-sm">Your account is fully verified for all transactions.</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="px-3 py-1 bg-white/20 rounded-lg text-sm backdrop-blur-sm font-medium">Level 3 Complete</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Full Name</label>
                    <input type="text" defaultValue="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" defaultValue="john.doe@example.com" disabled className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-slate-500 cursor-not-allowed" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" defaultValue="+91 98765 43210" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Password & Authentication</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Change Password</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Last changed 3 months ago</div>
                      </div>
                    </div>
                    <button onClick={handlePasswordUpdate} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      Update
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Protect your account with an extra layer of security</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked onChange={(e) => {
                        toast.success(`2FA is now ${e.target.checked ? 'enabled' : 'disabled'}`);
                      }} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { title: "Payment Reminders", desc: "Get notified 3 days before a payment is due" },
                  { title: "Auction Results", desc: "Instantly know who won the monthly auction" },
                  { title: "New Group Invites", desc: "When a new verified chit group opens for joining" },
                  { title: "Marketing & Offers", desc: "Promotional emails and platform updates" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 3} onChange={() => {
                        toast.success(`${item.title} preferences updated.`);
                      }} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'bank' && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 py-12">
               {bankLinked ? (
                 <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">HDFC Bank Linked</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Your primary account ending in 4321 is set up for automatic dividend payouts.</p>
                 </div>
               ) : (
                 <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Banknote className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Bank Account Added</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">Add your bank account details securely to receive dividend payouts and auction prize money directly.</p>
                    <button onClick={handleLinkBank} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
                        + Link Bank Account
                      </button>
                 </div>
               )}
             </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
