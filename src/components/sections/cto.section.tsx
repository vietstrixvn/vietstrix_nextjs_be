import { ArrowRight } from 'lucide-react';

export default function SectionCTO() {
  const stats = [
    {
      percentage: '91%',
      description: 'of CTOs say growing technical debt is their main concern',
    },
    {
      percentage: '56%',
      description:
        'of IT recruiters say finding skilled talent is their no 1 challenge',
    },
    {
      percentage: '26%',
      description: 'of CTOs admit capacity is their no 2 challenge',
    },
  ];

  return (
    <div className="relative w-full h-[500px] bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Headline */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Keep <span className="text-cyan-400">projects moving</span>
            <br />
            even when the core
            <br />
            team is busy
          </h1>
        </div>

        {/* Right Column - Statistics */}
        <div className="space-y-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex items-center gap-3 min-w-fit">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {stat.percentage}
                </span>
                <ArrowRight className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
