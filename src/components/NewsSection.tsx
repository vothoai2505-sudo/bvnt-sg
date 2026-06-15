'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MARKET_NEWS = [
  {
    id: 1,
    title: "Thị trường bảo hiểm nhân thọ quý I/2026: Phục hồi ấn tượng",
    excerpt: "Theo số liệu từ Hiệp hội Bảo hiểm, tổng doanh thu phí bảo hiểm nhân thọ toàn thị trường ghi nhận sự tăng trưởng dương trở lại...",
    date: "12/06/2026",
    tag: "Thị trường"
  },
  {
    id: 2,
    title: "Xu hướng số hóa toàn diện trong quy trình bồi thường",
    excerpt: "Các doanh nghiệp bảo hiểm đua nhau áp dụng AI và tự động hóa nhằm rút ngắn thời gian chi trả quyền lợi xuống chỉ còn 30 phút...",
    date: "08/06/2026",
    tag: "Công nghệ"
  },
  {
    id: 3,
    title: "Sản phẩm liên kết đầu tư tiếp tục dẫn dắt đà tăng trưởng",
    excerpt: "Bất chấp biến động thị trường chứng khoán, dòng sản phẩm liên kết đơn vị vẫn thu hút lượng lớn khách hàng trẻ...",
    date: "05/06/2026",
    tag: "Sản phẩm"
  }
];

const BAOVIET_NEWS = [
  {
    id: 1,
    title: "Bảo Việt Nhân Thọ Sài Gòn ra mắt ứng dụng e-Claim phiên bản mới",
    excerpt: "Trải nghiệm bồi thường siêu tốc bằng công nghệ OCR nhận diện khuôn mặt và hóa đơn viện phí chỉ với 3 thao tác đơn giản...",
    date: "14/06/2026",
    tag: "Chuyển đổi số",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Hơn 500 tư vấn viên mới gia nhập đội ngũ tinh nhuệ tại TP.HCM",
    excerpt: "Lễ ra quân và chào đón tân binh tháng 6 đánh dấu bước tiến mạnh mẽ trong chiến lược mở rộng quy mô phục vụ...",
    date: "10/06/2026",
    tag: "Tuyển dụng",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Trao tặng 1 tỷ đồng quỹ học bổng cho trẻ em hiếu học",
    excerpt: "Nối tiếp chuỗi hoạt động vì cộng đồng, đại diện Bảo Việt Nhân Thọ đã trao hàng trăm suất học bổng cho học sinh nghèo vượt khó...",
    date: "02/06/2026",
    tag: "CSR",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600"
  }
];

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<'market' | 'baoviet'>('baoviet');

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Holographic Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007AC2] opacity-5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#eab308] opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#003a6c] mb-4"
          >
            Tâm Điểm Tin Tức
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Cập nhật liên tục những chuyển động mới nhất từ thị trường Bảo hiểm và các hoạt động nổi bật của Bảo Việt Nhân Thọ.
          </motion.p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab('baoviet')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'baoviet' 
                ? 'bg-gradient-to-r from-[#003a6c] to-[#007AC2] text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Tin Bảo Việt Nhân Thọ
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'market' 
                ? 'bg-gradient-to-r from-[#eab308] to-[#facc15] text-[#003a6c] shadow-md' 
                : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Tin Thị Trường
            </button>
          </div>
        </div>

        {/* Content Area - Hologram Style Cards */}
        <div className="relative min-h-[400px]">
          {/* Bao Viet News */}
          {activeTab === 'baoviet' && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {BAOVIET_NEWS.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,122,194,0.05)] overflow-hidden hover:shadow-[0_8px_32px_0_rgba(0,122,194,0.15)] transition-all duration-500"
                >
                  {/* Holographic rim light effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                  
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#003a6c]/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all duration-500" />
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-[#eab308] text-[#003a6c] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {news.tag}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 relative z-20">
                    <div className="text-sm text-[#007AC2] font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {news.date}
                    </div>
                    <h3 className="text-xl font-bold text-[#003a6c] mb-3 group-hover:text-[#007AC2] transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {news.excerpt}
                    </p>
                    <button className="text-[#eab308] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Đọc tiếp
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Market News */}
          {activeTab === 'market' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {MARKET_NEWS.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-[#003a6c] to-[#001f3f] rounded-2xl p-1 shadow-[0_8px_32px_0_rgba(0,58,108,0.2)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eab308]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative bg-[#001f3f]/80 backdrop-blur-xl h-full rounded-2xl p-6 flex flex-col border border-white/10">
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-white/10 text-white border border-white/20 text-xs font-medium px-3 py-1 rounded-full">
                        {news.tag}
                      </span>
                      <span className="text-gray-400 text-sm font-medium">
                        {news.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#eab308] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6 flex-grow opacity-80">
                      {news.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[#007AC2] font-semibold text-sm group-hover:text-white transition-colors">
                        Bản tin thị trường
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#eab308] group-hover:text-[#003a6c] text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}