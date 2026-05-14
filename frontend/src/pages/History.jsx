import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, MoreVertical, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';

const initialTransactions = [
  { id: 'TXN-001', type: 'PAYMENT', desc: 'Monthly Contribution - Premium Fund', amount: '₹25,000', date: 'May 10, 2026', status: 'COMPLETED', ref: 'HDFC-UPI-987654321' },
  { id: 'TXN-002', type: 'RECEIPT', desc: 'Auction Dividend - Business Pool', amount: '₹1,200', date: 'May 05, 2026', status: 'COMPLETED', ref: 'NEFT-SBIN0001234' },
  { id: 'TXN-003', type: 'PAYMENT', desc: 'Monthly Contribution - Starter', amount: '₹5,000', date: 'May 01, 2026', status: 'COMPLETED', ref: 'UPI-1234567890' },
  { id: 'TXN-004', type: 'RECEIPT', desc: 'Prize Money - Gold Accumulator', amount: '₹1,00,000', date: 'Apr 28, 2026', status: 'PROCESSING', ref: 'PENDING-BANK-APPROVAL' },
  { id: 'TXN-005', type: 'FEE', desc: 'Late Payment Penalty', amount: '₹500', date: 'Apr 15, 2026', status: 'COMPLETED', ref: 'SYS-AUTO-DEDUCT' },
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filteredTransactions = initialTransactions.filter(txn => 
    txn.desc.toLowerCase().includes(searchTerm.toLowerCase()) || 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to export PDF.');
      return;
    }

    const rows = filteredTransactions.map(txn => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${txn.id}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${txn.desc}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${txn.date}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:${txn.type === 'RECEIPT' ? '#10b981' : '#0f172a'}">
          ${txn.type === 'RECEIPT' ? '+' : '-'}${txn.amount}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
          <span style="background:${txn.status === 'COMPLETED' ? '#d1fae5' : '#fef3c7'};color:${txn.status === 'COMPLETED' ? '#065f46' : '#92400e'};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;">${txn.status}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:11px;color:#64748b;">${txn.ref}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>ChitMitra Ledger</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; color: #0f172a; }
            h1 { font-size: 28px; color: #2563eb; margin: 0; }
            .subtitle { font-size: 14px; color: #64748b; margin: 4px 0 24px 0; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
            tr:nth-child(even) { background: #f8fafc; }
            .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <h1>ChitMitra</h1>
          <div class="subtitle">Transaction Ledger &mdash; Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <table>
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="footer">This is a system-generated document from ChitMitra. For queries, contact support@chitmitra.in</div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    toast.success('Print dialog opened — choose "Save as PDF"!');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Transaction History</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">View and download your complete financial ledger.</p>
        </div>
        <button 
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
        >
          <Download className="w-4 h-4" /> Export PDF
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by transaction ID or name"
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white"
            >
              <Filter className="w-4 h-4" /> Filter
            </button>
            <select className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium outline-none dark:text-white">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Transaction</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No transactions found matching your search.
                  </td>
                </tr>
              ) : filteredTransactions.map((txn, idx) => {
                const isPositive = txn.type === 'RECEIPT';
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={txn.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPositive ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                          {isPositive ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">{txn.desc}</div>
                          <div className="text-xs text-slate-500">{txn.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {txn.date}
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      <span className={isPositive ? 'text-emerald-500' : ''}>
                        {isPositive ? '+' : '-'}{txn.amount}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        txn.status === 'COMPLETED' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedTxn(txn)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Modal isOpen={!!selectedTxn} onClose={() => setSelectedTxn(null)} title="Transaction Details">
        {selectedTxn && (
          <div className="space-y-6">
            <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Amount {selectedTxn.type === 'RECEIPT' ? 'Received' : 'Paid'}</div>
              <div className={`text-4xl font-bold ${selectedTxn.type === 'RECEIPT' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                {selectedTxn.type === 'RECEIPT' ? '+' : '-'}{selectedTxn.amount}
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Description</span>
                <span className="font-medium text-slate-900 dark:text-white text-right max-w-[200px]">{selectedTxn.desc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Date & Time</span>
                <span className="font-medium text-slate-900 dark:text-white">{selectedTxn.date} at 10:45 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Transaction ID</span>
                <span className="font-medium text-slate-900 dark:text-white uppercase">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Reference No</span>
                <span className="font-medium text-slate-900 dark:text-white uppercase">{selectedTxn.ref}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Status</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" /> {selectedTxn.status}
                </span>
              </div>
            </div>

            <button 
              onClick={() => {
                toast.success('Receipt downloaded successfully!');
                setSelectedTxn(null);
              }}
              className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> Download Receipt
            </button>
          </div>
        )}
      </Modal>

      {/* Advanced Filter Modal */}
      <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} title="Advanced Filters">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 px-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium text-sm">All Types</button>
              <button className="py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium text-sm transition-colors">Receipts Only</button>
              <button className="py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium text-sm transition-colors">Payments Only</button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              <input type="date" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              onClick={() => setIsFilterModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={() => {
                toast.success('Filters applied!');
                setIsFilterModalOpen(false);
              }}
              className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default History;
