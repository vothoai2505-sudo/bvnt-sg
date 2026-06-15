'use client';
import { motion } from 'framer-motion';

export default function Milestone() {
  return (
    <section id="milestone" className="py-24 relative z-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-8"
        >
          Hành trình 3 Thập Kỷ Tự Hào
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          Đồng hành và bảo vệ hàng triệu gia đình Việt. Chúng tôi cam kết tiếp tục đổi mới, mang lại những giá trị thiết thực và sự an bình thịnh vượng cho mọi khách hàng trên khắp cả nước.
        </motion.p>
      </div>
    </section>
  );
}