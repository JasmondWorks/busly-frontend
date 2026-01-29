import { useNavigate } from 'react-router-dom';
import { Navigation, GitMerge, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex flex-col md:flex-row bg-white">
      {/* Left Column: Hero (Desktop Only) - Flat Clean Color */}
      <div className="hidden md:flex flex-1 bg-brand-600 text-white flex-col justify-center px-12 relative overflow-hidden">
        {/* Subtle pattern instead of gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.4] pointer-events-none"></div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-extrabold tracking-tighter mb-6 relative">
            Navigate Lagos <br />
            <span className="text-brand-200">like a pro.</span>
          </h1>
          <p className="text-brand-100 text-xl leading-relaxed font-medium">
            Join thousands of commuters using Busly to find the fastest, cheapest, and safest
            routes.
          </p>
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 text-center md:text-left bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 md:self-start w-full"
        >
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Navigation className="text-white w-5 h-5 fill-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tighter">busly</h1>
          </div>
        </motion.div>

        <div className="max-w-sm w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight md:hidden">
            Start your journey
          </h2>
          <p className="text-gray-500 mb-10 md:hidden">Smart navigation for Lagos.</p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-left space-y-4 mb-12"
          >
            <FeatureItem
              icon={<Navigation className="text-brand-600 w-5 h-5" />}
              title="Stop-by-stop routes"
              desc="See every boarding point clearly."
            />
            <FeatureItem
              icon={<GitMerge className="text-brand-600 w-5 h-5" />}
              title="Real alternatives"
              desc="Compare multiple routes instantly."
            />
            <FeatureItem
              icon={<Users className="text-brand-600 w-5 h-5" />}
              title="Community-backed"
              desc="Local insights you can trust."
            />
          </motion.div>

          <button
            onClick={() => navigate('/onboarding/location')}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl flex items-center justify-center text-lg shadow-sm active:scale-95 transition-all"
          >
            Find My Route <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-brand-600">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{title}</h3>
        <p className="text-gray-500 text-xs">{desc}</p>
      </div>
    </div>
  );
}
