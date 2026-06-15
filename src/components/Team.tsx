'use client';
import { motion } from 'framer-motion';

export default function Team() {
  return (
    <section id="team" className="py-24 relative z-20 bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Đội ngũ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Tinh hoa Sài Gòn
              </span>
            </h2>
            <p className="text-xl text-slate-300 font-light leading-relaxed max-w-lg">
              Được trang bị kiến thức chuyên sâu và công cụ AI hiện đại, đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
            </p>
            <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors">
              Gia nhập cùng chúng tôi
            </button>
          </div>
          
          <div className="flex-1 w-full relative h-[400px]">
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-64 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 mb-4" />
              <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
              <div className="h-3 w-1/2 bg-white/10 rounded" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-10 w-72 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500 mb-4" />
              <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
              <div className="h-3 w-1/2 bg-white/10 rounded" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}