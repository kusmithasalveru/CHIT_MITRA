import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card p-6"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
  </motion.div>
);

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Portfolio Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Track your chit fund investments and returns.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Invested" 
          value="₹1,24,500" 
          change="+12.5%" 
          isPositive={true} 
          icon={Wallet}
          delay={0.1}
        />
        <StatCard 
          title="Current Value" 
          value="₹1,42,800" 
          change="+14.2%" 
          isPositive={true} 
          icon={TrendingUp}
          delay={0.2}
        />
        <StatCard 
          title="Upcoming Due" 
          value="₹12,500" 
          change="In 3 days" 
          isPositive={false} 
          icon={Activity}
          delay={0.3}
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Growth Trajectory</h2>
            <select 
              onChange={(e) => toast.success(`Showing data for: ${e.target.value}`)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-sm outline-none dark:text-white cursor-pointer"
            >
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { title: 'Monthly Contribution', group: 'Premium Fund A', amount: '-₹5,000', date: 'Today, 10:00 AM', positive: false },
              { title: 'Dividend Received', group: 'Gold Accumulators', amount: '+₹1,200', date: 'Yesterday', positive: true },
              { title: 'Auction Won', group: 'Business Fund', amount: '+₹1,00,000', date: 'May 12, 2026', positive: true },
              { title: 'Late Fee Penalty', group: 'Premium Fund A', amount: '-₹500', date: 'May 10, 2026', positive: false },
            ].map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{activity.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{activity.group} • {activity.date}</div>
                </div>
                <div className={`text-sm font-bold ${activity.positive ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/dashboard/history')}
            className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            View All Transactions
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
