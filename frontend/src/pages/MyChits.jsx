import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Clock, ArrowRight, ShieldCheck, Trophy, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';

const activeChits = [
  { id: 1, name: "Premium Wealth Fund", totalAmount: "₹5,00,000", monthly: "₹25,000", members: 20, progress: 45, nextAuction: "In 5 days", isWinner: false, risk: "Medium" },
  { id: 2, name: "Gold Accumulator", totalAmount: "₹1,00,000", monthly: "₹5,000", members: 20, progress: 80, nextAuction: "Tomorrow", isWinner: true, risk: "Low" },
];

const discoverChits = [
  { id: 3, name: "Business Growth Pool", totalAmount: "₹10,00,000", duration: "20 Months", risk: "Low", verified: true },
  { id: 4, name: "Starter Savings", totalAmount: "₹50,000", duration: "10 Months", risk: "Very Low", verified: true },
];

const MyChits = () => {
  const [waitlistStatus, setWaitlistStatus] = useState({});
  const [selectedChitDetails, setSelectedChitDetails] = useState(null);

  const handleJoinWaitlist = async (id, name) => {
    setWaitlistStatus(prev => ({ ...prev, [id]: 'loading' }));
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setWaitlistStatus(prev => ({ ...prev, [id]: 'joined' }));
    toast.success(`Successfully joined waitlist for ${name}!`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">My Chits</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your active groups and discover new opportunities.</p>
      </div>

      {/* Active Chits Section */}
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-4">Active Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeChits.map((chit, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={chit.id} 
            className="glass-card p-6 border-l-4 border-l-blue-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{chit.name}</h3>
                  {chit.isWinner && <span className="bg-amber-100 text-amber-600 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><Trophy className="w-3 h-3"/> Winner</span>}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Users className="w-4 h-4" /> {chit.members} Members
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-slate-900 dark:text-white">{chit.totalAmount}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Pool</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Completion Progress</span>
                <span className="font-medium text-slate-900 dark:text-white">{chit.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${chit.progress}%` }}></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-slate-600 dark:text-slate-300">Next Auction: <span className="font-semibold">{chit.nextAuction}</span></span>
              </div>
              <button 
                onClick={() => setSelectedChitDetails(chit)}
                className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Discover Section */}
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-12 mb-4">Discover Verified Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {discoverChits.map((chit, idx) => {
          const status = waitlistStatus[chit.id];
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              key={chit.id} 
              className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <Target className="w-6 h-6" />
                  </div>
                  {chit.verified && <ShieldCheck className="w-5 h-5 text-blue-500" title="KYC Verified" />}
                </div>
                <h3 className="text-md font-bold text-slate-900 dark:text-white mb-1">{chit.name}</h3>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{chit.totalAmount}</div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">{chit.duration}</span>
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">{chit.risk} Risk</span>
                </div>
              </div>
              <button 
                onClick={() => handleJoinWaitlist(chit.id, chit.name)}
                disabled={status === 'joined' || status === 'loading'}
                className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${
                  status === 'joined' ? 'bg-emerald-500 text-white opacity-100' : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 opacity-100'
                }`}
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'joined' ? 'Waitlisted' : status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Chit Details Modal */}
      <Modal isOpen={!!selectedChitDetails} onClose={() => setSelectedChitDetails(null)} title="Group Details">
        {selectedChitDetails && (
          <div className="space-y-6">
            <div className="flex justify-between items-start pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedChitDetails.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4" /> {selectedChitDetails.members} Members Enrolled
                </p>
              </div>
              {selectedChitDetails.isWinner && (
                <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full font-bold flex items-center gap-1 text-sm">
                  <Trophy className="w-4 h-4"/> Winner
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Pool</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{selectedChitDetails.totalAmount}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Monthly Due</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{selectedChitDetails.monthly}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Risk Profile</span>
                <span className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{selectedChitDetails.risk}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Next Auction Date</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedChitDetails.nextAuction}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Status</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" /> Active
                </span>
              </div>
            </div>

            <button 
              onClick={() => {
                toast.success('Certificate downloaded successfully!');
                setSelectedChitDetails(null);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 mt-4"
            >
              Download Ledger PDF
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyChits;
