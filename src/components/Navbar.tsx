'use client';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <Shield size={24} />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
          Bảo Việt Sài Gòn
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
        <a href="#about" className="hover:text-blue-600 transition-colors">Về chúng tôi</a>
        <a href="#products" className="hover:text-blue-600 transition-colors">Sản phẩm</a>
        <a href="#team" className="hover:text-blue-600 transition-colors">Đội ngũ</a>
        <button className="px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
          Tư vấn ngay
        </button>
      </div>
    </motion.nav>
  );
}