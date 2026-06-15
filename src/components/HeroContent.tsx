'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto space-y-8 pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/50 text-blue-700 text-sm font-semibold tracking-wide shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          Tiên phong Công nghệ Bảo hiểm
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 drop-shadow-sm leading-[1.1]">
          Bảo vệ tương lai <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400">
            bằng Trí Tuệ Nhân Tạo
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          Bảo Việt Nhân Thọ Sài Gòn tự hào mang đến giải pháp tài chính tối ưu, an toàn và cá nhân hóa tuyệt đối.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button className="group px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center gap-2">
            Khám phá ngay <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full bg-white/60 backdrop-blur-md text-slate-800 font-semibold text-lg hover:bg-white/90 transition-all border border-slate-200 hover:shadow-lg">
            Tìm hiểu thêm
          </button>
        </div>
      </motion.div>
    </div>
  );
}