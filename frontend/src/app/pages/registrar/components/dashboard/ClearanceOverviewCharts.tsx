import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

const dailyData = [
  { name: 'Mon', approved: 4000, rejected: 2400, pending: 2400 },
  { name: 'Tue', approved: 3000, rejected: 1398, pending: 2210 },
  { name: 'Wed', approved: 2000, rejected: 9800, pending: 2290 },
  { name: 'Thu', approved: 2780, rejected: 3908, pending: 2000 },
  { name: 'Fri', approved: 1890, rejected: 4800, pending: 2181 },
  { name: 'Sat', approved: 2390, rejected: 3800, pending: 2500 },
  { name: 'Sun', approved: 3490, rejected: 4300, pending: 2100 },
];

const deptData = [
  { name: 'Library', progress: 85 },
  { name: 'Cafe', progress: 92 },
  { name: 'Dorm', progress: 65 },
  { name: 'Sports', progress: 98 },
  { name: 'Finance', progress: 75 },
];

export function ClearanceOverviewCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Main Chart */}
      <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-500" />
            Clearance Progress Trends
          </h3>
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button className="px-3 py-1 text-xs font-medium rounded-md bg-white text-slate-900 shadow-sm">Daily</button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-900">Weekly</button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-900">Monthly</button>
          </div>
        </div>
        <div className="p-6 flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '13px' }}
                labelStyle={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}
              />
              <Area type="monotone" dataKey="approved" name="Approved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorApproved)" />
              <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPending)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-slate-500" />
            Department Completion %
          </h3>
        </div>
        <div className="p-6 flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={deptData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={60} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="progress" name="Completion %" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
