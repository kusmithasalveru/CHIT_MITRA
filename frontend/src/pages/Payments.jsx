import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, AlertCircle, Calendar, Loader2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';

const Payments = () => {
  const [isPaying, setIsPaying] = useState(false);
  const [outstanding, setOutstanding] = useState(25000);
  const [methods, setMethods] = useState([{ id: 1, name: "HDFC Bank **** 4321", active: true }]);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handlePayNow = async () => {
    setIsPaying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOutstanding(0);
    setIsPaying(false);
    toast.success('Payment of ₹25,000 successful!');
  };

  const handleAddMethodSubmit = async (e) => {
    e.preventDefault();
    setIsAddingCard(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMethods([...methods, { id: Date.now(), name: "SBI Card **** 9988", active: false }]);
    setIsAddingCard(false);
    setIsAddCardModalOpen(false);
    toast.success('Card added successfully!');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Payments</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your upcoming dues and payment methods.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Payment Section */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 bg-gradient-to-br from-blue-600 to-emerald-600 text-white border-none relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <h2 className="text-blue-100 font-medium mb-1">Total Outstanding</h2>
            <div className="text-4xl font-extrabold mb-8">₹{outstanding.toLocaleString()}</div>
            
            {outstanding > 0 ? (
              <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-300" />
                  <div>
                    <div className="font-semibold">Premium Wealth Fund</div>
                    <div className="text-sm text-blue-100">Due in 3 days (May 18)</div>
                  </div>
                </div>
                <button 
                  onClick={handlePayNow}
                  disabled={isPaying}
                  className="px-6 py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg disabled:opacity-70 flex items-center gap-2"
                >
                  {isPaying && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isPaying ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <div className="font-semibold">All clear! No pending dues.</div>
              </div>
            )}
          </motion.div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white pt-4">Upcoming Schedule</h3>
          <div className="glass-card divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { fund: "Gold Accumulator", amount: "₹5,000", date: "May 25, 2026", status: "Upcoming" },
              { fund: "Premium Wealth Fund", amount: "₹25,000", date: "Jun 18, 2026", status: "Upcoming" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{item.fund}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{item.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 dark:text-white">{item.amount}</div>
                  <div className="text-xs text-blue-500 font-medium">{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Payment Methods</h3>
            <div className="space-y-4">
              {methods.map(method => (
                <div key={method.id} className="flex items-center justify-between p-4 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">{method.name}</div>
                      <div className="text-xs text-slate-500">Auto-pay {method.active ? 'enabled' : 'disabled'}</div>
                    </div>
                  </div>
                  {method.active && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                </div>
              ))}
              
              <button 
                onClick={() => setIsAddCardModalOpen(true)}
                className="w-full py-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                + Add New Payment Method
              </button>
            </div>
          </motion.div>

          <div className="glass-card p-6 bg-slate-50 dark:bg-slate-900">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Need Help?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              If you're facing issues with a payment, our support team is available 24/7.
            </p>
            <button 
              onClick={() => toast.success("Support ticket created. We will contact you shortly.")}
              className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      <Modal isOpen={isAddCardModalOpen} onClose={() => setIsAddCardModalOpen(false)} title="Add Payment Method">
        <form onSubmit={handleAddMethodSubmit} className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Your card details are protected with bank-grade encryption. We do not store your full card number or CVV.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name on Card</label>
              <input required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input required type="text" maxLength="19" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Expiry (MM/YY)</label>
                <input required type="text" maxLength="5" placeholder="MM/YY" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CVV</label>
                <input required type="password" maxLength="4" placeholder="123" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isAddingCard}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isAddingCard && <Loader2 className="w-4 h-4 animate-spin" />}
            {isAddingCard ? 'Securing Card...' : 'Add Card Securely'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Payments;
