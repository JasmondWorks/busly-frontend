import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, MapPin, Navigation, CheckCircle, Loader2, Info } from 'lucide-react';

interface StopFormData {
  name: string;
  location: string;
  description: string;
  nearbyLandmark: string;
}

export default function AddStopPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<StopFormData>({
    name: '',
    location: '',
    description: '',
    nearbyLandmark: '',
  });
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: keyof StopFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUseCurrentLocation = () => {
    if (!('geolocation' in navigator)) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleChange('location', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setIsLocating(false);
      },
      () => {
        handleChange('location', '6.4541, 3.3947'); // Fallback: Lagos
        setIsLocating(false);
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) return;
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const isValid = form.name.trim().length > 0 && form.location.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative font-sans">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-brand-50/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-multiply"></div>

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
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add a Stop</h1>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            /* Success State */
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
                className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-emerald-500" />
              </motion.div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">Stop Submitted!</h2>
              <p className="text-gray-500 font-medium mb-2 max-w-sm mx-auto">
                <strong>"{form.name}"</strong> has been submitted for community review. You'll earn
                trust points once it's verified.
              </p>
              <p className="text-brand-600 font-bold text-sm mb-8">+150 points pending</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm({ name: '', location: '', description: '', nearbyLandmark: '' });
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
            /* Form */
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Info Banner */}
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-brand-50/50 border border-brand-100/50">
                <Info size={18} className="text-brand-600 mt-0.5 shrink-0" />
                <p className="text-sm text-brand-700 font-medium leading-relaxed">
                  Found a new pickup point that isn't on Busly? Share it with the community so
                  others can benefit. All submissions go through verification.
                </p>
              </div>

              {/* Stop Name */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Stop Name *
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder='e.g. "Marina Junction"'
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-200 transition-all"
                  />
                </label>
              </div>

              {/* Location */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Location *
                  </span>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="Coordinates or address"
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-200 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={isLocating}
                      className="px-4 py-3.5 bg-brand-50 text-brand-600 font-bold rounded-xl border border-brand-100 hover:bg-brand-100 transition-all flex items-center gap-2 text-sm shrink-0 disabled:opacity-50 active:scale-95"
                    >
                      {isLocating ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Navigation size={16} />
                      )}
                      <span className="hidden sm:inline">Use GPS</span>
                    </button>
                  </div>
                </label>
              </div>

              {/* Description */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Description
                  </span>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe the stop — where exactly is it, what does it look like?"
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-200 transition-all resize-none"
                  />
                </label>
              </div>

              {/* Nearby Landmark */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block flex items-center gap-2">
                    <MapPin size={12} /> Nearby Landmark (Optional)
                  </span>
                  <input
                    type="text"
                    value={form.nearbyLandmark}
                    onChange={(e) => handleChange('nearbyLandmark', e.target.value)}
                    placeholder='e.g. "Next to the Total Filling Station"'
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-200 transition-all"
                  />
                </label>
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
                    <Plus size={20} /> Submit Stop for Review
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
