import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, MapPin, User, Shield, Trophy } from 'lucide-react';

interface PendingContribution {
  id: string;
  type: 'stop' | 'landmark';
  name: string;
  location: string;
  description: string;
  contributor: string;
  submittedAt: string;
  trustLevel: 'New' | 'Trusted' | 'Expert';
}

const MOCK_PENDING: PendingContribution[] = [
  {
    id: '1',
    type: 'stop',
    name: 'Fadeyi Bus Stop',
    location: '6.5177, 3.3746',
    description:
      'Popular danfo stop on Ikorodu Road, just before the railway crossing. Serves routes to Yaba, Oyingbo, and CMS.',
    contributor: 'Adewale',
    submittedAt: '30 mins ago',
    trustLevel: 'Trusted',
  },
  {
    id: '2',
    type: 'landmark',
    name: 'Yellow GTBank ATM',
    location: 'Near Palmgrove Bus Stop',
    description:
      'Bright yellow GTBank ATM gallery on the left side of the road. Very visible at night due to the LED signage.',
    contributor: 'Chioma',
    submittedAt: '2 hours ago',
    trustLevel: 'New',
  },
  {
    id: '3',
    type: 'stop',
    name: 'Costain Roundabout',
    location: '6.4580, 3.3835',
    description:
      'Major roundabout with multiple bus exits. Serves routes to Iponri, Surulere, and Apapa. Look for the Total fuel station.',
    contributor: 'Ibrahim',
    submittedAt: '5 hours ago',
    trustLevel: 'Expert',
  },
  {
    id: '4',
    type: 'landmark',
    name: 'Red Shoprite Banner',
    location: 'Near Lekki Phase 1',
    description:
      'Large red Shoprite banner hanging over the pedestrian bridge. Can be seen from both sides of the expressway.',
    contributor: 'Grace',
    submittedAt: '1 day ago',
    trustLevel: 'Trusted',
  },
];

export default function ValidationPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(MOCK_PENDING);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRemovedIds((prev) => new Set([...prev, id]));
    if (action === 'approve') {
      setEarnedPoints((prev) => prev + 50);
    } else {
      setEarnedPoints((prev) => prev + 10);
    }
    // Remove from list after animation
    setTimeout(() => {
      setPending((prev) => prev.filter((c) => c.id !== id));
    }, 400);
  };

  const trustBadge = (level: PendingContribution['trustLevel']) => {
    const styles = {
      New: 'bg-gray-100 text-gray-500 border-gray-200',
      Trusted: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      Expert: 'bg-brand-50 text-brand-600 border-brand-100',
    };
    return styles[level];
  };

  const allDone = pending.length === 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative font-sans">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-emerald-50/30 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-2xl mx-auto px-6 py-8 md:px-12 md:py-12 relative z-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 bg-linear-to-br from-brand-600 to-brand-800 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20">
              B
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Validate</h1>
          </div>
        </header>

        {/* Score Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5 mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Points Earned This Session
              </p>
              <div className="flex items-baseline gap-1">
                <motion.span
                  key={earnedPoints}
                  initial={{ scale: 1.3, color: '#4f46e5' }}
                  animate={{ scale: 1, color: '#0f172a' }}
                  className="text-2xl font-black"
                >
                  +{earnedPoints}
                </motion.span>
                <span className="text-sm font-bold text-gray-400">pts</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Remaining
            </p>
            <span className="text-2xl font-black text-gray-900">{pending.length}</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="space-y-5">
          <AnimatePresence>
            {pending.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={
                  removedIds.has(item.id)
                    ? { opacity: 0, x: 100, scale: 0.9 }
                    : { opacity: 1, y: 0 }
                }
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ delay: removedIds.has(item.id) ? 0 : index * 0.1 }}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          item.type === 'stop'
                            ? 'bg-brand-50 text-brand-600 border-brand-100'
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}
                      >
                        {item.type === 'stop' ? '📍 New Stop' : '🏷️ Landmark'}
                      </span>
                      <span className="text-xs font-bold text-gray-300">{item.submittedAt}</span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${trustBadge(item.trustLevel)}`}
                    >
                      <Shield size={10} />
                      {item.trustLevel}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 mb-1">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-3">
                    <MapPin size={14} /> {item.location}
                  </div>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Contributor + Actions */}
                <div className="px-6 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <User size={14} />
                    </div>
                    <span className="text-sm font-bold text-gray-600">{item.contributor}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction(item.id, 'reject')}
                      className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-90 transition-all border border-red-100"
                    >
                      <XCircle size={22} />
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'approve')}
                      className="h-12 px-5 rounded-2xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 active:scale-90 transition-all border border-emerald-100 text-sm"
                    >
                      <CheckCircle size={18} /> Approve
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* All Done State */}
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-brand-900/5 p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Trophy size={40} className="text-emerald-500" />
              </motion.div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">All Caught Up! 🎉</h2>
              <p className="text-gray-500 font-medium mb-2 max-w-sm mx-auto">
                You've reviewed all pending contributions. You earned{' '}
                <strong className="text-brand-600">+{earnedPoints} points</strong> this session.
              </p>
              <p className="text-gray-400 text-sm mb-8">Check back later for new submissions.</p>
              <button
                onClick={() => navigate('/contribute')}
                className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
              >
                Back to Hub
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
