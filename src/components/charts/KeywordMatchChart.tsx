import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const keywordData = [
  { keyword: 'React', matched: 8, total: 10, percentage: 80 },
  { keyword: 'JavaScript', matched: 9, total: 10, percentage: 90 },
  { keyword: 'TypeScript', matched: 6, total: 10, percentage: 60 },
  { keyword: 'Node.js', matched: 5, total: 10, percentage: 50 },
  { keyword: 'Python', matched: 3, total: 10, percentage: 30 },
  { keyword: 'AWS', matched: 4, total: 10, percentage: 40 },
  { keyword: 'Docker', matched: 7, total: 10, percentage: 70 },
  { keyword: 'Git', matched: 9, total: 10, percentage: 90 },
];

const KeywordMatchChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-hover">
          <p className="font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            Matched: {data.matched}/{data.total} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={keywordData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="keyword" 
            tick={{ 
              fontSize: 11, 
              fill: 'hsl(var(--text-secondary))',
            }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ 
              fontSize: 11, 
              fill: 'hsl(var(--text-secondary))'
            }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="percentage" 
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div className="flex justify-between items-center mt-4 p-3 bg-neutral-light rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">68%</div>
          <div className="text-xs text-text-secondary">Avg Match</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-success">5</div>
          <div className="text-xs text-text-secondary">Strong Matches</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-warning">3</div>
          <div className="text-xs text-text-secondary">Need Improvement</div>
        </div>
      </div>
    </div>
  );
};

export default KeywordMatchChart;