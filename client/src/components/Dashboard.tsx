import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

interface YieldData {
  protocol: string;
  asset: string;
  apy: number;
  tvl: number;
  risk: string;
}

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 800 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 1200 },
  { name: 'May', value: 1800 },
  { name: 'Jun', value: 2400 },
];

export default function Dashboard() {
  const [yields, setYields] = useState<YieldData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/yields')
      .then(res => res.json())
      .then(data => {
        setYields(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch yields", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight mb-2">Welcome Back</h2>
        <p className="text-gray-400">Optimize your returns across the Stellar ecosystem</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-[#6C5DD3]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-400 font-medium tracking-wide">TOTAL VALUE LOCKED</p>
              <h3 className="text-3xl font-bold mt-1 shadow-sm">$4,250,000</h3>
            </div>
            <div className="bg-[#6C5DD3]/20 p-3 rounded-xl text-[#6C5DD3]">
              <Activity size={24} />
            </div>
          </div>
          <div className="text-sm font-medium text-green-400 flex items-center gap-1">
            <ArrowUpRight size={16} /> +12.5% this week
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-400 font-medium tracking-wide">NET APY</p>
              <h3 className="text-3xl font-bold mt-1">14.2%</h3>
            </div>
            <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-400 flex items-center gap-1">
            Active in 3 protocols
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-400 font-medium tracking-wide">RISK SCORE</p>
              <h3 className="text-3xl font-bold mt-1">Low</h3>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl text-blue-500">
              <ShieldCheck size={24} />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-400 flex items-center gap-1">
            Audited smart contracts
          </div>
        </div>
      </div>

      {/* Chart Component */}
      <div className="glass-card p-6 h-[350px] mt-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          Portfolio Growth
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C5DD3" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#6C5DD3" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(20,24,34,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="value" stroke="#6C5DD3" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Main Yield Table */}
      <div className="glass-panel overflow-hidden mt-8">
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-center">
          <h3 className="text-xl font-bold">Top Stellar Yields</h3>
          <button className="text-sm text-[#6C5DD3] font-medium hover:text-white transition-colors">View All &rarr;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(255,255,255,0.02)] text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Protocol</th>
                <th className="px-6 py-4 font-semibold">Asset</th>
                <th className="px-6 py-4 font-semibold">APY</th>
                <th className="px-6 py-4 font-semibold">TVL</th>
                <th className="px-6 py-4 font-semibold">Risk</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-3">
                       <span className="w-5 h-5 rounded-full border-2 border-[#6C5DD3] border-t-transparent animate-spin"></span>
                       Fetching on-chain data...
                    </div>
                  </td>
                </tr>
              ) : yields.map((y, i) => (
                <tr key={i} className="group hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                  <td className="px-6 py-5">
                    <span className="font-semibold text-white tracking-wide">{y.protocol}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-gradient-to-r from-[#6C5DD3]/20 to-[#6C5DD3]/10 text-[#6C5DD3] px-3 py-1.5 rounded-full text-xs font-bold border border-[#6C5DD3]/30">
                      {y.asset}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-green-400 font-extrabold text-lg">{y.apy}%</span>
                  </td>
                  <td className="px-6 py-5 text-gray-300 font-medium">
                    ${y.tvl.toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1.5 rounded bg-opacity-20 text-xs font-bold uppercase tracking-wider ${
                      y.risk === 'Low' ? 'bg-green-500 text-green-400' :
                      y.risk === 'Medium' ? 'bg-yellow-500 text-yellow-400' :
                      'bg-red-500 text-red-400'
                    }`}>
                      {y.risk}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="btn-secondary text-sm px-5 py-2 opacity-80 group-hover:opacity-100 group-hover:bg-[#6C5DD3] group-hover:border-[#6C5DD3] group-hover:text-white transition-all shadow-md">
                      Deposit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
