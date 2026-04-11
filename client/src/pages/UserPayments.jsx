import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { clearAuth, getAuth } from '../api/client';

const UserPayments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    if (!auth?.token) {
      navigate('/login');
      return;
    }

    const loadUserPayment = async () => {
      try {
        const { data } = await api.get('/dashboard/overview');
        setPayment(data?.recentPayments?.[0] || null);
      } catch (error) {
        const message = error?.response?.data?.message || 'Failed to load user payments';
        toast.error(message);

        if (error?.response?.status === 401) {
          clearAuth();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserPayment();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center text-white">
        <p className="text-lg font-semibold tracking-wide">Loading user payments...</p>
      </div>
    );
  }

  if (!payment) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 text-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-slate-950/30">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">User Payments</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">Latest payment</h1>
          <p className="mt-2 text-slate-300 max-w-2xl">Only the current user’s latest payment is shown here.</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-white">{payment.title}</p>
                <p className="text-sm text-slate-400 mt-1">
                  {payment.date || payment.paidAt || payment.createdAt || '-'}
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                {payment.status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-slate-400">Amount</p>
                <p className="mt-1 font-semibold text-white">Rs {payment.amount}</p>
              </div>
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-slate-400">Method</p>
                <p className="mt-1 font-semibold text-white">{payment.method || '-'}</p>
              </div>
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-slate-400">Transaction</p>
                <p className="mt-1 font-semibold text-white">{payment._id || payment.id || '-'}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UserPayments;