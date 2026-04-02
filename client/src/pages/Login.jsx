import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid lg:grid-cols-2">
        <section className="p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white">
          <Link
            to="/"
            className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
          >
            {'<'} Back to Home
          </Link>
          <p className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            Welcome Back
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-5 leading-tight">Manage your society in one secure place.</h1>
          <p className="text-slate-200 mt-4">
            Access payments, bookings, notices, and community updates from your resident dashboard.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-100">
            <p>Fast visitor approvals</p>
            <p>Transparent maintenance history</p>
            <p>Instant committee announcements</p>
          </div>
        </section>

        <section className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Resident Login</h2>
          <p className="text-slate-500 mt-2">Sign in to continue</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-24 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-amber-700 hover:text-amber-800 px-2 py-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                Remember me
              </label>
              <a href="#" className="font-medium text-amber-700 hover:text-amber-800">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-600 text-white py-3 font-semibold hover:bg-amber-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-slate-600 mt-6">
            New resident?{' '}
            <a href="/register" className="font-semibold text-amber-700 hover:text-amber-800">
              Create an account
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;