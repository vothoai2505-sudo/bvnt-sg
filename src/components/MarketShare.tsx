'use client';
import { motion } from 'framer-motion';
import { Trophy, Target, Users } from 'lucide-react';

export default function MarketShare() {
  const stats = [
    { icon: Trophy, label: 'Thị phần', value: '20.8%', desc: 'Thị phần khai thác mới' },
    { icon: Target, label: 'Bảo vệ', value: '18M+', desc: 'Khách hàng' },
    { icon: Users, label: 'Tư vấn viên', value: '200K+', desc: 'Chuyên nghiệp' }
  ];

  return (
    <section className="py-24 relative z-20 bg-white/40 backdrop-blur-3xl border-y border-white/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Vị thế dẫn đầu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Khẳng định vị thế dẫn đầu tuyệt đối với 20.8% thị phần doanh thu phí khai thác mới. Nhìn chung, thị trường nhân thọ vẫn chủ yếu do các doanh nghiệp có vốn nước ngoài chi phối, Bảo Việt Life tự hào là doanh nghiệp nội địa vươn lên dẫn đầu, chiếm lĩnh hơn 1/5 toàn thị trường.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <stat.icon size={28} />
              </div>
              <h3 className="text-5xl font-black text-slate-900 mb-2">{stat.value}</h3>
              <p className="text-xl font-bold text-slate-700">{stat.label}</p>
              <p className="text-slate-500 mt-2">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}