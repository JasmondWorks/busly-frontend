import { Calendar as CalendarIcon, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverCalendarPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shift Calendar</h1>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 font-bold text-slate-900">August 2026</span>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-slate-50/50">
            <div className="grid grid-cols-7 gap-4 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div
                  key={day}
                  className="text-[10px] font-black uppercase text-slate-400 tracking-widest"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-7 gap-4">
              {/* Simple calendar grid placeholder */}
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer relative ${
                    i + 1 === 31
                      ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : 'bg-white border-slate-50 hover:border-brand-100 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold text-lg">{i + 1}</span>
                  {i % 4 === 0 && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${i + 1 === 31 ? 'bg-white' : 'bg-brand-500'}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CalendarIcon size={18} className="text-brand-500" />
            Today's Schedule
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-600">08:00 AM - 12:00 PM</span>
              <span className="font-black text-slate-900">Lagos Island - Ikeja</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-600">01:00 PM - 05:00 PM</span>
              <span className="font-black text-slate-900">Oshodi - Victoria Island</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
