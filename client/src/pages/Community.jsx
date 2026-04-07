import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';

const Community = () => {
  const [highlights, setHighlights] = useState([]);
  const [events, setEvents] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommunityData = async () => {
      try {
        const [highlightsResponse, eventsResponse, discussionsResponse] = await Promise.all([
          api.get('/community/highlights'),
          api.get('/community/events'),
          api.get('/community/discussions'),
        ]);

        const data = highlightsResponse.data || {};

        setHighlights([
          { title: 'Residents Active', value: String(data.residentsActive ?? 0), note: 'Live count' },
          { title: 'Open Discussions', value: String(data.openDiscussions ?? 0), note: 'Active topics' },
          { title: 'Upcoming Events', value: String(data.upcomingEvents ?? 0), note: 'Scheduled items' },
          { title: 'Volunteer Groups', value: String(data.volunteerGroups ?? 0), note: 'Community teams' },
        ]);
        setEvents(eventsResponse.data || []);
        setDiscussions(discussionsResponse.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load community data');
      } finally {
        setLoading(false);
      }
    };

    loadCommunityData();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-cyan-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
        >
          Back to Home
        </Link>

        <header className="bg-white/80 backdrop-blur rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-10">
          <p className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
            Community Hub
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4">Connect with your neighbors</h1>
          <p className="text-slate-600 mt-3 max-w-2xl">
            Discover events, participate in decisions, and stay updated with everything happening in your
            society.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {highlights.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.title}</p>
              <p className="text-3xl font-bold mt-2 text-emerald-700">{item.value}</p>
              <p className="text-xs text-slate-500 mt-1">{item.note}</p>
            </article>
          ))}
        </section>

        {loading && <p className="mt-6 text-sm text-slate-500">Loading community data...</p>}

        <section className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Upcoming Events</h2>
              <button className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">View all</button>
            </div>
            <div className="space-y-4 mt-5">
              {events.map((event) => (
                <div key={event._id || event.name} className="border border-slate-200 rounded-2xl p-4 hover:border-emerald-200 transition-colors">
                  <h3 className="font-semibold text-slate-900">{event.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {event.date} at {event.time}
                  </p>
                  <p className="text-sm text-slate-500">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <ul className="space-y-4 mt-5">
              <li className="rounded-xl bg-slate-50 p-4 text-sm">
                Lift maintenance in Tower C on Apr 5 from 11:00 AM to 1:00 PM.
              </li>
              <li className="rounded-xl bg-slate-50 p-4 text-sm">
                Water tank cleaning scheduled for Apr 8. Please store water accordingly.
              </li>
              <li className="rounded-xl bg-slate-50 p-4 text-sm">
                New badminton court booking slots are now live under facilities.
              </li>
            </ul>
          </aside>
        </section>

        <section className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold">Resident Discussions</h2>
            <button className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700 transition-colors">
              Start Discussion
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            {discussions.map((discussion) => (
              <article key={discussion._id || discussion.topic} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs inline-flex rounded-full bg-cyan-100 text-cyan-700 px-2 py-1 font-medium">
                  {discussion.category}
                </p>
                <h3 className="font-semibold mt-3">{discussion.topic}</h3>
                <p className="text-sm text-slate-500 mt-2">By {discussion.authorName}</p>
                <p className="text-sm text-emerald-700 font-semibold mt-3">{discussion.replies} replies</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Community;