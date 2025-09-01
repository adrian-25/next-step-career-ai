import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

const skillData = [
  { skill: 'Frontend', current: 85, target: 95, fullMark: 100 },
  { skill: 'Backend', current: 70, target: 85, fullMark: 100 },
  { skill: 'Database', current: 65, target: 80, fullMark: 100 },
  { skill: 'DevOps', current: 45, target: 70, fullMark: 100 },
  { skill: 'Testing', current: 60, target: 80, fullMark: 100 },
  { skill: 'UI/UX', current: 80, target: 85, fullMark: 100 },
];

const SkillRadarChart = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={skillData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid gridType="polygon" className="opacity-30" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ 
              fontSize: 12, 
              fill: 'hsl(var(--text-secondary))',
              fontWeight: 500
            }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ 
              fontSize: 10, 
              fill: 'hsl(var(--text-secondary))'
            }}
            tickCount={6}
          />
          <Radar
            name="Target"
            dataKey="target"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary))"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Radar
            name="Current"
            dataKey="current"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.15}
            strokeWidth={3}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-sm text-text-secondary">Current Level</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-secondary" style={{ borderTop: '2px dashed hsl(var(--secondary))' }} />
          <span className="text-sm text-text-secondary">Target Level</span>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;