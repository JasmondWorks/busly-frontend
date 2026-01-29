import { Bell, Moon, Volume2, Shield, ChevronRight, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();
  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-linear-to-br from-brand-600 to-brand-800 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20">
          B
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
      </div>

      <div className="space-y-6">
        <Section title="Preferences">
          <ToggleRow icon={<Bell />} label="Push Notifications" defaultChecked />
          <ToggleRow icon={<Volume2 />} label="Voice Navigation" defaultChecked />
          <ToggleRow icon={<Moon />} label="Dark Mode" description="Follow system" />
        </Section>

        <Section title="Account">
          <LinkRow
            icon={<Shield />}
            label="Privacy & Security"
            onClick={() => navigate('/settings/privacy')}
          />
          <LinkRow
            icon={<Smartphone />}
            label="Linked Devices"
            onClick={() => navigate('/settings/devices')}
          />
        </Section>

        <div className="pt-6">
          <button className="w-full py-4 text-red-500 font-bold bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
            Log Out
          </button>
          <p className="text-center text-xs text-slate-400 mt-4">Version 1.0.2 (Build 45)</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
        {title}
      </h2>
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
        {children}
      </div>
    </section>
  );
}

function ToggleRow({
  icon,
  label,
  defaultChecked,
  description,
}: {
  icon: any;
  label: string;
  defaultChecked?: boolean;
  description?: string;
}) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div
      className="p-4 flex items-center justify-between border-b 
        border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-400">{icon}</div>
        <div>
          <div className="font-bold text-slate-900">{label}</div>
          {description && <div className="text-xs text-slate-400">{description}</div>}
        </div>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-12 h-7 rounded-full transition-colors relative ${checked ? 'bg-brand-600' : 'bg-slate-200'}`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`}
        ></div>
      </button>
    </div>
  );
}

function LinkRow({ icon, label, onClick }: { icon: any; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors text-left"
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-400">{icon}</div>
        <div className="font-bold text-slate-900">{label}</div>
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </button>
  );
}
