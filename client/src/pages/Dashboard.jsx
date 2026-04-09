import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { clearAuth, getAuth } from '../api/client';

const emptyMaintenanceForm = {
  title: '',
  category: 'Other',
  priority: 'Medium',
  description: '',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [submittingMaintenance, setSubmittingMaintenance] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [dashboard, setDashboard] = useState({
    profile: null,
    paymentSummary: { totalDue: 0, paidThisMonth: 0, walletBalance: 0, transactionsCount: 0 },
    recentPayments: [],
    maintenanceRequests: [],
    maintenanceStats: { open: 0, total: 0 },
    userFacilities: [],
    paymentMethods: [],
  });
  const [maintenanceForm, setMaintenanceForm] = useState(emptyMaintenanceForm);

  useEffect(() => {
    const auth = getAuth();

    if (!auth?.token) {
      navigate('/login');
      return;
    }

    const loadDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard/overview');
        setDashboard(data);
      } catch (error) {
        const message = error?.response?.data?.message || 'Failed to load dashboard';
        toast.error(message);

        if (error?.response?.status === 401) {
          clearAuth();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const refreshDashboard = async () => {
    const { data } = await api.get('/dashboard/overview');
    setDashboard(data);
  };

  const handleQuickPay = async () => {
    setSubmittingPayment(true);

    try {
      await api.post('/payments/pay', {
        title: 'Monthly Maintenance',
        amount: dashboard.paymentSummary.totalDue || 0,
        method: selectedMethod,
      });

      toast.success('Payment recorded successfully');
      await refreshDashboard();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Payment failed');
    } finally {
      setSubmittingPayment(false);
    }
  };

  const handleMaintenanceSubmit = async (event) => {
    event.preventDefault();
    setSubmittingMaintenance(true);

    try {
      await api.post('/maintenance', maintenanceForm);
      toast.success('Maintenance request submitted');
      setMaintenanceForm(emptyMaintenanceForm);
      await refreshDashboard();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to submit request');
    } finally {
      setSubmittingMaintenance(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  const profile = dashboard.profile || getAuth() || {};
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Resident';

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center text-white">
        <p className="text-lg font-semibold tracking-wide">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 text-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Resident Dashboard</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">Welcome back, {fullName}</h1>
              <p className="mt-2 text-slate-300 max-w-2xl">
                Track all payments, raise maintenance requests, view your room number, and keep your resident profile in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/payments"
                className="inline-flex items-center rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                Payments
              </Link>
              <Link
                to="/facilities"
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                User Facilities
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-100 hover:bg-rose-500/20 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mt-2">
            <article className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
              <p className="text-sm text-slate-400">Room No</p>
              <p className="mt-2 text-2xl font-semibold text-white">{profile.roomNo || 'Not assigned'}</p>
              <p className="mt-1 text-xs text-slate-400">Resident unit identifier</p>
            </article>
            <article className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
              <p className="text-sm text-slate-400">Total Due</p>
              <p className="mt-2 text-2xl font-semibold text-amber-300">Rs {dashboard.paymentSummary.totalDue ?? 0}</p>
              <p className="mt-1 text-xs text-slate-400">Pending maintenance charges</p>
            </article>
            <article className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
              <p className="text-sm text-slate-400">Open Maintenance</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-300">{dashboard.maintenanceStats.open ?? 0}</p>
              <p className="mt-1 text-xs text-slate-400">Requests awaiting resolution</p>
            </article>
            <article className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
              <p className="text-sm text-slate-400">Transactions</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">{dashboard.paymentSummary.transactionsCount ?? 0}</p>
              <p className="mt-1 text-xs text-slate-400">All payment records</p>
            </article>
          </div>
        </header>

        <section className="grid xl:grid-cols-3 gap-6 mt-8">
          <div className="xl:col-span-2 space-y-6">
            <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-slate-950/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">Payments</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">All payment types</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dashboard.paymentMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setSelectedMethod(method)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        selectedMethod === method
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-white/10 text-slate-200 hover:bg-white/15'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 md:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                    <span className="text-xs text-slate-400">Latest 5 records</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {dashboard.recentPayments.length === 0 ? (
                      <p className="text-sm text-slate-400">No payment history yet.</p>
                    ) : (
                      dashboard.recentPayments.map((transaction) => (
                        <div
                          key={transaction._id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-white/8 bg-white/5 px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-white">{transaction.title}</p>
                            <p className="text-xs text-slate-400">{transaction.method || 'Method not recorded'}</p>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-slate-300">Rs {transaction.amount}</span>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                transaction.status === 'Paid' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-300'
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                  <h3 className="text-lg font-semibold text-white">Quick Pay</h3>
                  <p className="mt-2 text-sm text-slate-400">Pay pending dues with the selected method.</p>

                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                      <span>Selected method</span>
                      <span className="font-semibold text-white">{selectedMethod}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                      <span>Paid this month</span>
                      <span className="font-semibold text-emerald-300">Rs {dashboard.paymentSummary.paidThisMonth ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                      <span>Wallet balance</span>
                      <span className="font-semibold text-cyan-300">Rs {dashboard.paymentSummary.walletBalance ?? 0}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleQuickPay}
                    disabled={submittingPayment || (dashboard.paymentSummary.totalDue ?? 0) === 0}
                    className="mt-5 w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-300 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submittingPayment ? 'Processing...' : `Pay Rs ${dashboard.paymentSummary.totalDue ?? 0}`}
                  </button>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-slate-950/30">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">Maintenance</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Raise a request</h2>
                </div>
                <span className="text-sm text-slate-300">Open: {dashboard.maintenanceStats.open ?? 0}</span>
              </div>

              <form onSubmit={handleMaintenanceSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="maintenance-title">
                    Title
                  </label>
                  <input
                    id="maintenance-title"
                    value={maintenanceForm.title}
                    onChange={(event) => setMaintenanceForm((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Leaking tap in kitchen"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="maintenance-category">
                    Category
                  </label>
                  <select
                    id="maintenance-category"
                    value={maintenanceForm.category}
                    onChange={(event) => setMaintenanceForm((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white focus:border-cyan-300 focus:outline-none"
                  >
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Cleaning</option>
                    <option>Carpentry</option>
                    <option>Lift</option>
                    <option>Security</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="maintenance-priority">
                    Priority
                  </label>
                  <select
                    id="maintenance-priority"
                    value={maintenanceForm.priority}
                    onChange={(event) => setMaintenanceForm((prev) => ({ ...prev, priority: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white focus:border-cyan-300 focus:outline-none"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="maintenance-description">
                    Description
                  </label>
                  <textarea
                    id="maintenance-description"
                    rows="4"
                    value={maintenanceForm.description}
                    onChange={(event) => setMaintenanceForm((prev) => ({ ...prev, description: event.target.value }))}
                    placeholder="Describe the issue in detail..."
                    className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={submittingMaintenance}
                    className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-100 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submittingMaintenance ? 'Submitting...' : 'Submit Maintenance Request'}
                  </button>
                </div>
              </form>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {dashboard.maintenanceRequests.map((request) => (
                  <article key={request._id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white">{request.title}</h3>
                      <span className="rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                        {request.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{request.category} • {request.priority}</p>
                    <p className="mt-2 text-sm text-slate-300">{request.description}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-slate-950/30">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">Personal Information</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Resident profile</h2>

              <dl className="mt-5 space-y-4 text-sm">
                {[
                  ['First Name', profile.firstName || '-'],
                  ['Last Name', profile.lastName || '-'],
                  ['Username', profile.username || '-'],
                  ['Email', profile.email || '-'],
                  ['Phone', profile.phone || '-'],
                  ['Room No', profile.roomNo || '-'],
                  ['Gender', profile.gender || '-'],
                  ['Date of Birth', profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : '-'],
                  ['Role', profile.role || 'resident'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 rounded-xl bg-slate-950/40 px-4 py-3">
                    <dt className="text-slate-400">{label}</dt>
                    <dd className="font-semibold text-white text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-slate-950/30">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">User Facilities</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Facilities used and paid for</h2>

              <div className="mt-5 space-y-3">
                {dashboard.userFacilities.length === 0 ? (
                  <p className="text-sm text-slate-400">No facility usage or facility payments yet.</p>
                ) : (
                  dashboard.userFacilities.map((item) => (
                    <div key={item._id} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-white">{item.name}</p>
                        <span className="rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        {item.type === 'booking'
                          ? `${item.date} at ${item.time} • ${item.status}`
                          : `${new Date(item.date).toLocaleDateString()} • ${item.status}`}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                    </div>
                  ))
                )}
              </div>
            </article>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;