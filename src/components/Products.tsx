'use client';
import { motion } from 'framer-motion';
import { Shield, Target, Trophy } from 'lucide-react';

const products = [
  {
    title: 'An Khang Hạnh Phúc',
    desc: 'Giải pháp bảo vệ toàn diện và đầu tư sinh lời hiệu quả cho tương lai.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    title: 'An Phát Cát Tường',
    desc: 'Bảo vệ tài chính vững chắc trước mọi rủi ro với mức phí linh hoạt.',
    icon: Target,
    color: 'from-purple-500 to-pink-400'
  },
  {
    title: 'An Khoa Trạng Nguyên',
    desc: 'Đầu tư giáo dục vươn tầm quốc tế cho thế hệ tương lai.',
    icon: Trophy,
    color: 'from-amber-400 to-orange-500'
  }
];

export default function Products() {
  return (
    <section id="products" className="py-24 relative z-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Giải pháp Tài chính
          </h2>
          <p className="text-lg text-slate-600">
            Được thiết kế cá nhân hóa cho từng chặng đường cuộc sống của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${p.color} opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500`} />
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center mb-8 shadow-lg`}>
                <p.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{p.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{p.desc}</p>
              <button className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2">
                Xem chi tiết <span className="text-xl">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}