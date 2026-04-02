import React from 'react';
import { Link } from 'react-router-dom';

const transactions = [
  { id: 'TXN-4029', date: 'Apr 01, 2026', title: 'Monthly Maintenance', amount: 'Rs 4,250', status: 'Paid' },
  { id: 'TXN-3982', date: 'Mar 16, 2026', title: 'Parking Fee', amount: 'Rs 750', status: 'Paid' },
  { id: 'TXN-3921', date: 'Mar 01, 2026', title: 'Water Charges', amount: 'Rs 1,100', status: 'Pending' },
  { id: 'TXN-3904', date: 'Feb 28, 2026', title: 'Clubhouse Booking', amount: 'Rs 1,500', status: 'Paid' }
];

const Payments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50">
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
            <p className="text-3xl font-bold text-rose-600 mt-2">Rs 1,100</p>
            <p className="text-xs text-slate-500 mt-1">Due date: Apr 08, 2026</p>
          </article>
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Paid This Month</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">Rs 5,000</p>
            <p className="text-xs text-slate-500 mt-1">2 successful transactions</p>
          </article>
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Wallet Balance</p>
            <p className="text-3xl font-bold text-sky-600 mt-2">Rs 450</p>
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
                    <tr key={tx.id} className="border-b border-slate-100">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-slate-900">{tx.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{tx.id}</p>
                      </td>
                      <td className="py-4 pr-4 text-slate-600">{tx.date}</td>
                      <td className="py-4 pr-4 font-semibold text-slate-800">{tx.amount}</td>
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
              <button className="w-full rounded-xl border border-slate-300 px-4 py-3 text-left hover:border-sky-300 transition-colors">
                UPI
              </button>
              <button className="w-full rounded-xl border border-slate-300 px-4 py-3 text-left hover:border-sky-300 transition-colors">
                Credit or Debit Card
              </button>
              <button className="w-full rounded-xl border border-slate-300 px-4 py-3 text-left hover:border-sky-300 transition-colors">
                Net Banking
              </button>
            </div>

            <button className="w-full mt-6 rounded-xl bg-sky-600 text-white py-3 font-semibold hover:bg-sky-700 transition-colors">
              Pay Rs 1,100
            </button>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Payments;