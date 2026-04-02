import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBuilding, FaShieldAlt, FaCalendarCheck, FaWifi, FaSwimmer, 
  FaDumbbell, FaParking, FaTree, FaUsers, FaBell, 
  FaFileInvoice, FaBox, FaDoorOpen, FaHandHoldingHeart,
  FaChevronRight, FaBolt, FaSun, FaMoon
} from 'react-icons/fa';
import { 
  IoIosNotificationsOutline, IoIosPersonAdd, 
  IoIosSettings, IoIosLogOut 
} from 'react-icons/io';
import { 
  MdOutlineLocalLaundryService, MdOutlineSecurity,
  MdOutlineElevator, MdOutlineVideoCameraFront
} from 'react-icons/md';
import { 
  TbDeviceLandlinePhone, TbTrash
} from 'react-icons/tb';
import { 
  GiFlowerPot, GiPartyPopper
} from 'react-icons/gi';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 font-sans antialiased">
      
      {/* ----- NAVBAR: premium, sticky, with glassmorphism ----- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-indigo-100/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo + Brand */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-700 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-200/70 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl tracking-tight">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-800 tracking-tight leading-none">
                  Proximate<span className="text-indigo-600 font-light text-2xl">.</span>
                </span>
                <span className="text-[10px] font-medium text-indigo-400 tracking-wider uppercase -mt-1">
                  living together
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { label: 'Home', path: '/' },
                { label: 'Facilities', path: '/facilities' },
                { label: 'Community', path: '/community' },
                { label: 'Payments', path: '/payments' },
                { label: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    item.label === 'Home'
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:bg-indigo-50/70 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side - actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className="hidden sm:flex items-center gap-2 bg-white border border-indigo-200 hover:bg-indigo-50 text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow"
              >
                <IoIosPersonAdd className="text-indigo-600" />
                <span>Register</span>
              </Link>
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md shadow-indigo-200 flex items-center gap-2"
              >
                <span>Login</span>
                <FaChevronRight className="text-xs" />
              </Link>
              <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ----- HERO SECTION: modern, benefit-driven ----- */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: headline */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                <FaBolt className="text-indigo-600 text-sm" />
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">The future of society management</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Your community,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500">
                  seamlessly connected.
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Proximate brings your society together — from maintenance requests to community events, everything in one intelligent platform.
              </p>
              
              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all shadow-xl shadow-indigo-200/70 flex items-center gap-3 hover:scale-105">
                  <FaBuilding />
                  Start your society
                </button>
                <button className="bg-white border-2 border-indigo-200 hover:border-indigo-300 text-slate-700 px-8 py-4 rounded-2xl text-base font-semibold transition-all flex items-center gap-3 hover:shadow-lg">
                  <FaShieldAlt className="text-indigo-500" />
                  View demo
                </button>
              </div>
              
              {/* Trust indicator */}
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-700">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-500">Trusted by <span className="font-bold text-slate-700">250+ societies</span> across India</span>
              </div>
            </div>
            
            {/* Right: visual dashboard preview */}
            <div className="relative hidden lg:block">
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/50 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <span className="text-xs font-mono text-slate-400 ml-2">Proximate · live</span>
                  </div>
                  <FaSun className="text-amber-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-2xl">
                    <FaCalendarCheck className="text-indigo-600 text-xl mb-2" />
                    <p className="text-xs text-slate-500">Maintenance</p>
                    <p className="text-lg font-bold text-slate-800">Due in 3d</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-2xl">
                    <FaUsers className="text-cyan-600 text-xl mb-2" />
                    <p className="text-xs text-slate-500">Community</p>
                    <p className="text-lg font-bold text-slate-800">82% active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- ADVANTAGES SECTION: why Proximate ----- */}
      <div className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Why Proximate</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-6">
              Built differently, for modern communities
            </h2>
            <p className="text-lg text-slate-600">
              We don't just digitize — we transform how societies connect, communicate, and care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Advantage 1 */}
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/60 hover:border-indigo-200 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaBolt className="text-indigo-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Visitor entries under 10 seconds. Maintenance requests resolved 3x faster. No waiting, no delays.
              </p>
            </div>
            {/* Advantage 2 */}
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/60 hover:border-indigo-200 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-emerald-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bank-Grade Security</h3>
              <p className="text-slate-600 leading-relaxed">
                End-to-end encryption, secure payments, and resident data protection. Your trust is our foundation.
              </p>
            </div>
            {/* Advantage 3 */}
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/60 hover:border-indigo-200 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GiPartyPopper className="text-amber-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community First</h3>
              <p className="text-slate-600 leading-relaxed">
                Polls, events, and forums that actually bring neighbours together. Built for connection, not just management.
              </p>
            </div>
            {/* Advantage 4 */}
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/60 hover:border-indigo-200 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaFileInvoice className="text-purple-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Zero Paperwork</h3>
              <p className="text-slate-600 leading-relaxed">
                From maintenance bills to committee elections — fully digital, fully transparent, fully green.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ----- FACILITIES SECTION: smart amenities management ----- */}
      <div className="bg-gradient-to-b from-indigo-50/30 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: facilities grid */}
            <div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Premium amenities</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-6">
                Smart facilities, <br />smarter access.
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                Book, track, and manage all society amenities in real-time — no more conflicts or confusion.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <FaSwimmer className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Swimming Pool</p>
                  <p className="text-xs text-slate-500 mt-1">Slot booking • 4 slots</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <FaDumbbell className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Gym & Fitness</p>
                  <p className="text-xs text-slate-500 mt-1">24x7 • Live occupancy</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <GiFlowerPot className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Community Garden</p>
                  <p className="text-xs text-slate-500 mt-1">Green zone • Events</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <FaParking className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Smart Parking</p>
                  <p className="text-xs text-slate-500 mt-1">Visitor slots • EV charging</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <MdOutlineLocalLaundryService className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Laundry</p>
                  <p className="text-xs text-slate-500 mt-1">Token system • 24/7</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <FaDoorOpen className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Clubhouse</p>
                  <p className="text-xs text-slate-500 mt-1">Party hall • Meetings</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <MdOutlineSecurity className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Security Desk</p>
                  <p className="text-xs text-slate-500 mt-1">Visitor logs • CCTV</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <TbTrash className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Waste Mgmt</p>
                  <p className="text-xs text-slate-500 mt-1">Schedule • Segregation</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
                  <FaBox className="text-indigo-600 text-2xl mb-3" />
                  <p className="font-semibold text-slate-800">Parcel Room</p>
                  <p className="text-xs text-slate-500 mt-1">Smart lockers</p>
                </div>
              </div>
            </div>
            
            {/* Right: facilities management preview card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100 relative">
              <div className="absolute top-6 right-6 bg-indigo-100 rounded-full px-4 py-1.5 text-xs font-bold text-indigo-700 flex items-center gap-1">
                <FaBolt className="text-indigo-600" /> LIVE
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Facility booking · today</h3>
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
                      <FaSwimmer />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Swimming Pool</p>
                      <p className="text-xs text-slate-500">Booked by A. Sharma · 302</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium bg-amber-100 text-amber-700 px-3 py-1 rounded-full">6-7 PM</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                      <GiFlowerPot />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Garden Yoga</p>
                      <p className="text-xs text-slate-500">Group event · 12 attending</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">7 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
                      <FaDoorOpen />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Clubhouse</p>
                      <p className="text-xs text-slate-500">Birthday party · 25 guests</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-full">7-10 PM</span>
                </div>
              </div>
              <button className="w-full mt-8 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 border border-indigo-200">
                <FaCalendarCheck />
                Book a facility
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----- CTA BANNER: ready to start ----- */}
      <div className="bg-indigo-900 py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-700 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your society?
          </h2>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-10">
            Join 250+ societies that trust Proximate for seamless, intelligent community management.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-900 px-8 py-4 rounded-2xl text-base font-bold hover:bg-indigo-50 transition-all shadow-2xl flex items-center gap-3">
              <FaBuilding />
              Start free trial
            </button>
            <button className="border-2 border-indigo-400 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-indigo-800 transition-all flex items-center gap-3">
              <FaHandHoldingHeart />
              Schedule demo
            </button>
          </div>
          <p className="text-indigo-300 text-sm mt-8">
            No credit card required · Free 14-day trial
          </p>
        </div>
      </div>

      {/* ----- FOOTER ----- */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-white font-semibold text-lg">Proximate<span className="text-indigo-400">.</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <a href="#" className="hover:text-white transition">About</a>
              <a href="#" className="hover:text-white transition">Facilities</a>
              <a href="#" className="hover:text-white transition">Pricing</a>
              <a href="#" className="hover:text-white transition">Security</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
            <div className="text-sm text-slate-400">
              © 2024 Proximate. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;