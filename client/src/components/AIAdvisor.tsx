import { Bot } from 'lucide-react';

export default function AIAdvisor() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="bg-[#6C5DD3]/20 p-6 rounded-full inline-block mb-4 shadow-lg shadow-[#6C5DD3]/20">
        <Bot size={64} className="text-[#6C5DD3]" />
      </div>
      <h2 className="text-4xl font-extrabold text-white">Claude AI Yield Advisor</h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Our integrated AI agent automatically analyzes Stellar's DeFi landscape to locate the optimal risk-to-reward vaults for your portfolio.
      </p>
      
      <div className="glass-panel p-8 mt-12 max-w-3xl w-full text-left">
        <div className="h-40 border-2 border-dashed border-[#6C5DD3]/30 rounded-xl flex items-center justify-center text-gray-500">
           Coming Soon: Interactive AI Chatbot Widget
        </div>
      </div>
    </div>
  );
}
