import {
  MapPin,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Lock,
  Globe,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface Landmark {
  id: string;
  type: 'system' | 'user';
  author?: string;
  privacy?: 'public' | 'private';
  hint: string;
  detail: string;
  image?: string | null;
  votes?: number;
}

interface LandmarkCardProps {
  landmarks: Landmark[];
  stopName: string;
}

export function LandmarkCard({ landmarks, stopName }: LandmarkCardProps) {
  const [status, setStatus] = useState<'info' | 'confirmed' | 'missed'>('info');
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  const currentLandmark = landmarks[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % landmarks.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + landmarks.length) % landmarks.length);
  };

  // --- RECOVERY UI (Missed Stop) ---
  if (status === 'missed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4 overflow-hidden relative"
      >
        <div className="flex items-start gap-4 z-10 relative">
          <div className="bg-red-100 p-2 rounded-lg text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-red-900 text-lg">Don't Panic.</h3>
            <p className="text-red-700 text-sm mb-3">
              It happens! The next safe stop is <span className="font-bold">Maryland (5 mins)</span>
              .
            </p>
            <button
              onClick={() => setStatus('info')}
              className="text-xs font-bold text-red-600 underline hover:text-red-800"
            >
              Undo (I am still here)
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- CONFIRMED STATE ---
  if (status === 'confirmed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 bg-green-600 text-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-green-900/20"
      >
        <div className="bg-white/20 p-3 rounded-full mb-3">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <h3 className="font-bold text-xl mb-1">Stop Confirmed!</h3>
        <p className="text-green-100 text-sm">You've successfully identified {stopName}.</p>
      </motion.div>
    );
  }

  // --- MAIN INFO CARD ---
  return (
    <>
      <div className="mt-4 space-y-3">
        {/* LANDMARK CARD with Carousel */}
        <motion.div
          layout
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
          onClick={() => setShowModal(true)}
        >
          {/* Image Area */}
          <div className="h-32 bg-gray-100 relative">
            {currentLandmark.image ? (
              <img
                src={currentLandmark.image}
                alt="Landmark"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-300">
                <MapPin size={32} />
              </div>
            )}

            {/* Type Badge */}
            <div className="absolute top-3 left-3 flex gap-2">
              {currentLandmark.type === 'system' ? (
                <span className="px-2 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                  System Default
                </span>
              ) : (
                <span className="px-2 py-1 bg-indigo-600/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10 flex items-center gap-1">
                  {currentLandmark.privacy === 'public' ? <Globe size={10} /> : <Lock size={10} />}
                  By {currentLandmark.author}
                </span>
              )}
            </div>

            {/* Expand Icon */}
            <div className="absolute top-3 right-3 w-8 h-8 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={16} />
            </div>

            {/* Carousel Controls (Only if multiple) */}
            {landmarks.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-sm"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-sm"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {/* Content Area */}
          <div className="p-4">
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-1 bg-brand-100 p-1.5 rounded-md text-brand-600 shrink-0">
                <Eye size={16} />
              </div>
              <div>
                <p className="text-xs text-brand-600 font-bold uppercase tracking-wider mb-0.5">
                  Look out for:
                </p>
                <p className="font-bold text-gray-900 leading-tight">{currentLandmark.hint}</p>
              </div>
            </div>

            {/* Pagination Dots */}
            {landmarks.length > 1 && (
              <div className="flex justify-center gap-1 mt-2">
                {landmarks.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-brand-600' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setStatus('confirmed')}
            className="py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} />
            Yes, I see it
          </button>
          <button
            onClick={() => setStatus('missed')}
            className="py-3 bg-white border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-sm"
          >
            Missed it?
          </button>
        </div>

        {/* ADD CONTRIBUTIONS BUTTON */}
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-600 transition-colors border-t border-gray-50 pt-3"
        >
          <Plus size={14} /> Add your own landmark for {stopName}
        </button>
      </div>

      {/* MODAL - Details View */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              layoutId={`landmark-${currentLandmark.id}`}
              className="bg-white w-full max-w-lg rounded-3xl overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="h-64 relative">
                {currentLandmark.image ? (
                  <img src={currentLandmark.image} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    No Image
                  </div>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full mb-4">
                  {currentLandmark.type === 'system'
                    ? 'Official Landmark'
                    : `Added by ${currentLandmark.author}`}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentLandmark.hint}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{currentLandmark.detail}</p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setStatus('confirmed');
                  }}
                  className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl text-lg hover:bg-brand-700"
                >
                  Confirm Stop
                </button>
              </div>
            </motion.div>
          </div>,
          document.body,
        )}

      {/* MODAL - Add Landmark Form (Simulated) */}
      {showAddForm &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddForm(false)}
            />
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl p-6 relative z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Add Landmark</h3>
                <button onClick={() => setShowAddForm(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    What do you see?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. A red postbox"
                    className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-brand-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    placeholder="Describe it to help others..."
                    className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-brand-500 transition-all font-medium h-24"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex-1 p-3 border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-brand-500 bg-white">
                    <input
                      type="radio"
                      name="privacy"
                      defaultChecked
                      className="accent-brand-600"
                    />
                    <div className="text-left">
                      <span className="block text-sm font-bold text-gray-900">Public</span>
                      <span className="block text-xs text-gray-400">Everyone can see</span>
                    </div>
                  </label>
                  <label className="flex-1 p-3 border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-brand-500 bg-white">
                    <input type="radio" name="privacy" className="accent-brand-600" />
                    <div className="text-left">
                      <span className="block text-sm font-bold text-gray-900">Private</span>
                      <span className="block text-xs text-gray-400">Only you</span>
                    </div>
                  </label>
                </div>

                <button
                  onClick={() => {
                    setShowAddForm(false);
                    alert('Thanks! Your landmark has been added.');
                  }}
                  className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl mt-4"
                >
                  Save Landmark
                </button>
              </div>
            </motion.div>
          </div>,
          document.body,
        )}
    </>
  );
}
