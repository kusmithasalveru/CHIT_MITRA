import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp, Users, ArrowRight, Calculator, X } from 'lucide-react';

const LandingPage = () => {
  const [showCalc, setShowCalc] = useState(false);
  const [calcValues, setCalcValues] = useState({
    amount: 100000,
    members: 20,
    duration: 20,
  });

  const monthlyContribution = calcValues.amount / calcValues.members;
  const totalPaid = monthlyContribution * calcValues.duration;
  // Simulated best-case: win the auction early with a discount
  const estimatedDiscount = calcValues.amount * 0.12;
  const effectiveReturn = ((estimatedDiscount / totalPaid) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
          ChitMitra
        </div>
        <div className="flex gap-4">
          <Link to="/auth" className="px-5 py-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors font-medium">
            Log In
          </Link>
          <Link to="/auth" className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all font-medium">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium mb-8 border border-blue-100 dark:border-blue-800"
        >
          <Shield className="w-4 h-4" />
          <span>Secure. Transparent. Regulated.</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 max-w-4xl"
        >
          The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Chit Funds</span> is Digital.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl"
        >
          Experience high-yield savings and low-cost borrowing with India's most advanced digital chit fund platform. Built for trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link to="/auth" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-lg hover:scale-105 transition-transform shadow-xl">
            Start Investing <ArrowRight className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => setShowCalc(true)}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Calculator className="w-5 h-5" /> View Returns Calculator
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full"
        >
          {[
            { icon: TrendingUp, title: "High Yield Returns", desc: "Earn up to 12% XIRR through smart reverse-auction bidding." },
            { icon: Users, title: "Community Driven", desc: "Join trusted groups verified through strict KYC and credit checks." },
            { icon: Shield, title: "Bank-Grade Security", desc: "Escrow-backed transactions and regulated by the Chit Funds Act." }
          ].map((feat, idx) => (
            <div key={idx} className="glass-card p-8 text-left group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feat.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Returns Calculator Modal */}
      {showCalc && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowCalc(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="glass-card w-full max-w-lg bg-white dark:bg-slate-950 pointer-events-auto relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Returns Calculator</h2>
                </div>
                <button 
                  onClick={() => setShowCalc(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Chit Value Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Chit Value</label>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">₹{calcValues.amount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="50000" max="1000000" step="50000" 
                    value={calcValues.amount}
                    onChange={(e) => setCalcValues({...calcValues, amount: Number(e.target.value)})}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>₹50K</span><span>₹10L</span>
                  </div>
                </div>

                {/* Members Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Group Members</label>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{calcValues.members}</span>
                  </div>
                  <input 
                    type="range" min="10" max="50" step="5" 
                    value={calcValues.members}
                    onChange={(e) => setCalcValues({...calcValues, members: Number(e.target.value)})}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>10</span><span>50</span>
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration (Months)</label>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{calcValues.duration}</span>
                  </div>
                  <input 
                    type="range" min="10" max="40" step="5" 
                    value={calcValues.duration}
                    onChange={(e) => setCalcValues({...calcValues, duration: Number(e.target.value)})}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>10 mo</span><span>40 mo</span>
                  </div>
                </div>

                {/* Results */}
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
                  <div className="text-sm font-medium text-blue-100 mb-4">Estimated Returns Summary</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-blue-200">Monthly Contribution</div>
                      <div className="text-xl font-bold">₹{monthlyContribution.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">Total Amount Paid</div>
                      <div className="text-xl font-bold">₹{totalPaid.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">Est. Auction Discount</div>
                      <div className="text-xl font-bold">₹{estimatedDiscount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">Effective XIRR</div>
                      <div className="text-xl font-bold text-emerald-300">{effectiveReturn}%</div>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/auth" 
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity shadow-lg mt-2"
                >
                  Start Investing Now <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
