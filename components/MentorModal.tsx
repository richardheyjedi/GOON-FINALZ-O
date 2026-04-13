import React from 'react';
import { X, Target, Award, BarChart3, Zap } from 'lucide-react';
import { Mentor } from '../content';
import RetroWindow from './RetroWindow';

interface MentorModalProps {
  mentor: Mentor;
  onClose: () => void;
}

const MentorModal: React.FC<MentorModalProps> = ({ mentor, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <RetroWindow 
        title={`OPERATOR_PROFILE: ${mentor.id}`} 
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[20px_20px_0_0_#000]"
      >
        <div className="flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[70vh] custom-scrollbar p-2">
          
          {/* Close Button Overlay for Mobile */}
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 md:hidden bg-red-600 text-white p-1 border-2 border-black"
          >
            <X size={20} />
          </button>

          {/* Left: Avatar & Quick Stats */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="relative border-4 border-black aspect-square overflow-hidden bg-gray-100 shadow-hard">
               <img 
                src={mentor.image} 
                alt={mentor.name} 
                className={`w-full h-full object-cover filter grayscale contrast-125 ${mentor.imagePosition || 'object-top'}`}
              />
              <div className="absolute bottom-0 right-0 bg-black text-white px-2 py-1 font-pixel text-[10px]">
                {mentor.level}
              </div>
            </div>

            <div className="bg-black text-[#ccff00] p-3 font-mono text-[10px] space-y-1 border-2 border-black">
               <div className="flex justify-between">
                 <span>STATUS:</span>
                 <span className="animate-pulse">ACTIVE_OP</span>
               </div>
               <div className="flex justify-between">
                 <span>RANK:</span>
                 <span>ELITE_MENTOR</span>
               </div>
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-1 border-b-4 border-black inline-block">
                {mentor.name}
              </h2>
              <p className="text-sm font-mono font-bold text-blue-600 uppercase tracking-widest mt-2">
                {mentor.role}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase bg-gray-100 p-2 border-l-4 border-black">
                 <Target size={14} />
                 Mission_Briefing
              </div>
              <p className="font-mono text-sm leading-relaxed text-gray-800">
                {mentor.detailedBio || mentor.bio}
              </p>
            </div>

            {mentor.achievements && mentor.achievements.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase bg-gray-100 p-2 border-l-4 border-black">
                   <Award size={14} />
                   Core_Achievements
                </div>
                <ul className="grid grid-cols-1 gap-2">
                  {mentor.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-mono border border-black/10 p-2 bg-white hover:bg-[#ccff00]/10 transition-colors">
                      <Zap size={12} className="mt-0.5 text-blue-600 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mentor.stats && mentor.stats.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase bg-gray-100 p-2 border-l-4 border-black">
                   <BarChart3 size={14} />
                   System_Metrics
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {mentor.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] font-mono font-bold uppercase mb-1">
                        <span>{stat.label}</span>
                        <span>{stat.val}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 border border-black relative">
                        <div 
                          className={`h-full ${stat.color} transition-all duration-1000`}
                          style={{ width: `${stat.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-black flex justify-between items-center">
           <div className="flex gap-2">
              {mentor.tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-bold bg-black text-white px-2 py-0.5 uppercase">
                  #{tag}
                </span>
              ))}
           </div>
           <button 
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-2 font-mono text-xs font-black uppercase border-2 border-black hover:bg-black transition-all shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
           >
             CLOSE_ENCRYPTED_FILE
           </button>
        </div>
      </RetroWindow>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
      `}</style>
    </div>
  );
};

export default MentorModal;
