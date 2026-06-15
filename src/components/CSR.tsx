'use client';
import { motion } from 'framer-motion';

export default function CSR() {
  return (
    <section id="csr" className="py-24 relative z-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-8"
        >
          Trách Nhiệm Cộng Đồng
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          Hơn cả một doanh nghiệp bảo hiểm, Bảo Việt Nhân Thọ tâm niệm sự phát triển vững bền phải gắn liền với thế hệ tương lai. Hàng chục ngàn suất học bổng "Vì một Việt Nam tươi đẹp" đã được trao đến những mầm non hiếu học trên cả nước.
        </motion.p>
      </div>
    </section>
  );
}