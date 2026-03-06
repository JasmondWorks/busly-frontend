import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  Loader2,
  Info,
  ImagePlus,
  ChevronDown,
} from 'lucide-react';

const MOCK_STOPS = [
  { id: '1', name: 'Obalende Underbridge' },
  { id: '2', name: 'CMS Bus Stop' },
  { id: '3', name: 'Anthony Bus Stop' },
  { id: '4', name: 'Maryland Junction' },
  { id: '5', name: 'Palmgrove' },
  { id: '6', name: 'Onipanu' },
  { id: '7', name: 'Yaba' },
];

const LANDMARK_TYPES = [
  { id: 'bridge', label: 'Bridge', icon: '🌉' },
  { id: 'market', label: 'Market', icon: '🏪' },
  { id: 'station', label: 'Filling Station', icon: '⛽' },
  { id: 'building', label: 'Building', icon: '🏢' },
  { id: 'junction', label: 'Junction', icon: '🔀' },
  { id: 'school', label: 'School', icon: '🏫' },
  { id: 'worship', label: 'Place of Worship', icon: '🕌' },
  { id: 'other', label: 'Other', icon: '📍' },
];

interface LandmarkFormData {
  stopId: string;
  name: string;
  type: string;
  description: string;
}

export default function LandmarkPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LandmarkFormData>({
    stopId: '',
    name: '',
    type: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleChange = (field: keyof LandmarkFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoClick = () => {
    // Mock — simulate picking an image
    setPhotoPreview(
      'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=400&auto=format&fit=crop',
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.stopId || !form.name.trim() || !form.type) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const isValid = form.stopId && form.name.trim().length > 0 && form.type;
  const selectedStop = MOCK_STOPS.find((s) => s.id === form.stopId);

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative font-sans">
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-2xl mx-auto px-6 py-8 md:px-12 md:py-12 relative z-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-linear-to-br from-brand-600 to-brand-800 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20">
              B
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Suggest Landmark</h1>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-brand-900/5 p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-blue-500" />
              </motion.div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">Landmark Suggested!</h2>
              <p className="text-gray-500 font-medium mb-2 max-w-sm mx-auto">
                <strong>"{form.name}"</strong> near <strong>{selectedStop?.name}</strong> has been
                submitted for review.
              </p>
              <p className="text-blue-600 font-bold text-sm mb-8">+100 points pending</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm({ stopId: '', name: '', type: '', description: '' });
                    setPhotoPreview(null);
                  }}
                  className="flex-1 py-4 bg-gray-50 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  Add Another
                </button>
                <button
                  onClick={() => navigate('/contribute')}
                  className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                >
                  Back to Hub
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Info */}
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                <Info size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-700 font-medium leading-relaxed">
                  Landmarks help commuters identify stops using real-world references like "the blue
                  bridge" or "next to Shoprite." Add popular ones near existing stops.
                </p>
              </div>

              {/* Select Stop */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Near Which Stop? *
                  </span>
                  <div className="relative">
                    <select
                      value={form.stopId}
                      onChange={(e) => handleChange('stopId', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-200 transition-all"
                    >
                      <option value="">Select a stop...</option>
                      {MOCK_STOPS.map((stop) => (
                        <option key={stop.id} value={stop.id}>
                          {stop.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </label>
              </div>

              {/* Landmark Name */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Landmark Name *
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder='e.g. "Blue Pedestrian Bridge"'
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-200 transition-all"
                  />
                </label>
              </div>

              {/* Landmark Type */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                  Landmark Type *
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {LANDMARK_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleChange('type', type.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all active:scale-95 ${
                        form.type === type.id
                          ? 'bg-brand-50 border-brand-200 shadow-sm ring-1 ring-brand-100'
                          : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{type.icon}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${form.type === type.id ? 'text-brand-700' : 'text-gray-500'}`}
                      >
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Description
                  </span>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder='e.g. "Large blue footbridge crossing the expressway. Visible from the road."'
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-200 transition-all resize-none"
                  />
                </label>
              </div>

              {/* Photo Upload */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                  Photo (Optional)
                </span>
                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-100">
                    <img
                      src={photoPreview}
                      alt="Landmark preview"
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-600 shadow-sm hover:bg-white transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handlePhotoClick}
                    className="w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-brand-300 hover:text-brand-500 hover:bg-brand-50/30 transition-all"
                  >
                    <ImagePlus size={28} />
                    <span className="text-xs font-bold">Tap to add a photo</span>
                  </button>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full py-5 font-bold rounded-2xl flex items-center justify-center gap-2 text-lg transition-all shadow-lg active:scale-95 ${
                  isValid
                    ? 'bg-gray-900 text-white hover:bg-brand-600 hover:shadow-xl hover:scale-[1.02]'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <MapPin size={20} /> Suggest Landmark
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
