import { CTOstats } from '@/lib';
import { ArrowRight } from 'lucide-react';

export default function SectionCTO() {
  return (
    <div className="relative w-full bg-gray-900 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Headline */}
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
            Keep <span className="text-cyan-400">projects moving</span>
            <br className="hidden sm:block" />
            even when the core
            <br />
            team is busy
          </h1>
        </div>

        {/* Right Column - Statistics */}
        <div className="space-y-8">
          {CTOstats.map((stat, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex items-center gap-3 min-w-fit">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {stat.percentage}
                </span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
              </div>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
