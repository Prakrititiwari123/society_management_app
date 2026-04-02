import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const issueTypes = ['Maintenance', 'Security', 'Billing', 'Facilities', 'Suggestion'];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    issueType: '',
    priority: 'Medium'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const messageLength = form.message.trim().length;
  const minMessageLength = 20;
  const isMessageValid = messageLength >= minMessageLength;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isMessageValid) return;
    console.log('contact form', form);
    setIsSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '', issueType: '', priority: 'Medium' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
        >
          Back to Home
        </Link>

        <header className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact</h1>
          <p className="text-slate-600 mt-2">Need help? Reach out to management or submit your request below.</p>
        </header>

        <section className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="space-y-4">
            <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">Management Office</h2>
              <p className="text-sm text-slate-600 mt-2">Tower A, Ground Floor</p>
              <p className="text-sm text-slate-600">Mon to Sat, 10:00 AM - 6:00 PM</p>
            </article>
            <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">Support Helpline</h2>
              <p className="text-sm text-slate-600 mt-2">+91 98765 43210</p>
              <p className="text-sm text-slate-600">support@societyapp.com</p>
            </article>
            <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">Emergency Desk</h2>
              <p className="text-sm text-slate-600 mt-2">Security Gate: +91 90000 11111</p>
              <p className="text-sm text-slate-600">Fire and Safety: +91 90000 22222</p>
            </article>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Send a Message</h2>
            <p className="text-slate-600 mt-2">We usually respond within 24 hours.</p>

            {isSubmitted && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Request submitted successfully. Our team will contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Issue Type</label>
                <div className="flex flex-wrap gap-2">
                  {issueTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setForm((prev) => ({ ...prev, issueType: type }));
                      }}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        form.issueType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setIsSubmitted(false);
                      setForm((prev) => ({ ...prev, name: e.target.value }));
                    }}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setIsSubmitted(false);
                      setForm((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => {
                    setIsSubmitted(false);
                    setForm((prev) => ({ ...prev, priority: e.target.value }));
                  }}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => {
                    setIsSubmitted(false);
                    setForm((prev) => ({ ...prev, subject: e.target.value }));
                  }}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="What can we help with?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(e) => {
                    setIsSubmitted(false);
                    setForm((prev) => ({ ...prev, message: e.target.value }));
                  }}
                  required
                  className={`w-full rounded-xl border px-4 py-3 focus:ring-2 outline-none ${
                    !isMessageValid && form.message
                      ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="Describe your request"
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className={isMessageValid ? 'text-emerald-600' : 'text-amber-600'}>
                    {isMessageValid
                      ? 'Looks good'
                      : `Please enter at least ${minMessageLength} characters`}
                  </span>
                  <span className="text-slate-500">{messageLength} chars</span>
                </div>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={!isMessageValid}
              >
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;