import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { clearAuth, getAuth } from '../api/client';

const Payments = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalDue: 1100, paidThisMonth: 5000, walletBalance: 450 });
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    if (!auth?.token) {
      navigate('/login');
      return;
    }

    const loadPayments = async () => {
      try {
        const [summaryResponse, transactionsResponse] = await Promise.all([
          api.get('/payments/summary'),
          api.get('/payments/transactions'),
        ]);

        setSummary(summaryResponse.data || summary);
        setTransactions(transactionsResponse.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load payment data');

        if (error?.response?.status === 401) {
          clearAuth();
          navigate('/login');
        }
      }
    };

    loadPayments();
  }, [navigate]);

  const handlePay = async () => {
    setIsSubmitting(true);

    try {
      await api.post('/payments/pay', {
        title: 'Monthly Maintenance',
        amount: summary.totalDue || 1100,
        method: selectedMethod,
      });

      toast.success('Payment completed');

      const [summaryResponse, transactionsResponse] = await Promise.all([
        api.get('/payments/summary'),
        api.get('/payments/transactions'),
      ]);

      setSummary(summaryResponse.data || summary);
      setTransactions(transactionsResponse.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Payment failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 transition-colors"
        >
          Back to Home
        </Link>

        <header className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-600 mt-2">Track dues, view transaction history, and pay in seconds.</p>
        </header>

        <section className="grid md:grid-cols-3 gap-4 mt-8">
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Due</p>
            <p className="text-3xl font-bold text-rose-600 mt-2">Rs {summary.totalDue ?? 0}</p>
            <p className="text-xs text-slate-500 mt-1">Due date: Apr 08, 2026</p>
          </article>
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Paid This Month</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">Rs {summary.paidThisMonth ?? 0}</p>
            <p className="text-xs text-slate-500 mt-1">{transactions.length} successful transactions</p>
          </article>
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Wallet Balance</p>
            <p className="text-3xl font-bold text-sky-600 mt-2">Rs {summary.walletBalance ?? 0}</p>
            <p className="text-xs text-slate-500 mt-1">Use towards next payment</p>
          </article>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Recent Transactions</h2>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Download Statement
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="pb-3 pr-4 font-medium">Transaction</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 pr-4 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx._id || tx.id} className="border-b border-slate-100">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-slate-900">{tx.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{tx._id || tx.id}</p>
                      </td>
                      <td className="py-4 pr-4 text-slate-600">{tx.date || tx.paidAt || '-'}</td>
                      <td className="py-4 pr-4 font-semibold text-slate-800">Rs {tx.amount}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            tx.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Quick Pay</h2>
            <p className="text-sm text-slate-600 mt-2">Pay pending dues instantly using your preferred method.</p>

            <div className="space-y-3 mt-5">
              <button
                type="button"
                onClick={() => setSelectedMethod('UPI')}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                  selectedMethod === 'UPI' ? 'border-sky-500 bg-sky-50' : 'border-slate-300 hover:border-sky-300'
                }`}
              >
                UPI
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('Card')}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                  selectedMethod === 'Card' ? 'border-sky-500 bg-sky-50' : 'border-slate-300 hover:border-sky-300'
                }`}
              >
                Credit or Debit Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('Net Banking')}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                  selectedMethod === 'Net Banking' ? 'border-sky-500 bg-sky-50' : 'border-slate-300 hover:border-sky-300'
                }`}
              >
                Net Banking
              </button>
            </div>

            <button
              type="button"
              onClick={handlePay}
              disabled={isSubmitting}
              className="w-full mt-6 rounded-xl bg-sky-600 text-white py-3 font-semibold hover:bg-sky-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : `Pay Rs ${summary.totalDue ?? 0}`}
            </button>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Payments;