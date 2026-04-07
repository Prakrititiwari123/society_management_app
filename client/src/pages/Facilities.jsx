import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';

const facilityStyles = [
  'from-orange-100 to-orange-200',
  'from-cyan-100 to-cyan-200',
  'from-lime-100 to-lime-200',
  'from-amber-100 to-amber-200',
  'from-slate-100 to-slate-200',
  'from-rose-100 to-rose-200',
];

const Facilities = () => {
  const [amenities, setAmenities] = useState([]);
  const [booking, setBooking] = useState({ facility: '', date: '', time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadAmenities = async () => {
      try {
        const { data } = await api.get('/facilities/amenities');
        setAmenities(
          (data || []).map((name, index) => ({
            name,
            slots: 'Available for booking',
            color: facilityStyles[index % facilityStyles.length],
          }))
        );
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load facilities');
      }
    };

    loadAmenities();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/facilities/bookings', booking);
      toast.success('Facility booking submitted');
      setBooking({ facility: '', date: '', time: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Booking failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50 transition-colors"
        >
          Back to Home
        </Link>

        <header className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Facilities</h1>
          <p className="text-slate-600 mt-2">Reserve amenities, avoid conflicts, and manage shared spaces smoothly.</p>
        </header>

        <section className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Amenities</h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {amenities.map((item) => (
                <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className={`h-2 w-full rounded-full bg-linear-to-r ${item.color}`} />
                  <h3 className="font-semibold text-slate-900 mt-4">{item.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.slots}</p>
                  <button className="mt-4 text-sm font-semibold text-orange-700 hover:text-orange-800">View Schedule</button>
                </article>
              ))}
            </div>
          </div>

          <aside className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-slate-900">Book a Facility</h2>
            <p className="text-sm text-slate-600 mt-2">Select your amenity and preferred slot.</p>

            <form onSubmit={handleBooking} className="space-y-4 mt-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Facility</label>
                <select
                  value={booking.facility}
                  onChange={(e) => setBooking((prev) => ({ ...prev, facility: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                >
                  <option value="">Choose a facility</option>
                  {amenities.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={booking.date}
                  onChange={(e) => setBooking((prev) => ({ ...prev, date: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Time Slot</label>
                <input
                  type="time"
                  value={booking.time}
                  onChange={(e) => setBooking((prev) => ({ ...prev, time: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-orange-600 text-white py-3 font-semibold hover:bg-orange-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Request Booking'}
              </button>
            </form>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Facilities;