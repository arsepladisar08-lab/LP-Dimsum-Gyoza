import React, { useState } from 'react';
import { buildWhatsAppInquiryUrl } from '../utils/order';
import { WHATSAPP_NUMBER } from '../data/products';
import { MessageCircle, HelpCircle, Plus } from 'lucide-react';

const questions = [
  {q:'Apa saja pilihan menu yang tersedia?',a:'Gyozen menyediakan pilihan gyoza, dimsum original, dimsum goreng keju, mentai, platter, party box, ready frozen, dan Ebi Chili Oil. Pilihan serta detail porsi dapat dilihat pada katalog.'},
  {q:'Bagaimana cara memesan?',a:'Pilih produk, tambahkan ke keranjang, isi nama dan area pengiriman, lalu kirim rangkuman pesanan melalui WhatsApp. Admin akan membantu konfirmasi selanjutnya.'},
  {q:'Apakah tersedia pilihan frozen?',a:'Ya, katalog memiliki kategori Ready Frozen. Ikuti petunjuk penyimpanan dan penyajian pada detail produk, serta konfirmasi stok terbaru kepada admin.'},
  {q:'Apakah bisa memesan untuk acara atau jumlah banyak?',a:'Kamu dapat menanyakan ketersediaan Party Box atau pesanan dalam jumlah banyak langsung melalui WhatsApp agar jumlah, jadwal, dan pengiriman dapat dikonfirmasi.'},
  {q:'Bagaimana mengetahui ongkos kirim?',a:'Ongkos kirim bergantung pada area dan metode pengiriman. Masukkan kecamatan atau area pada form keranjang, lalu konfirmasi nominalnya dengan admin.'}
];

export const FAQ: React.FC = () => {
  const [openSet, setOpenSet] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenSet((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container-custom faq-layout">
        <div className="faq-intro">
          <p className="section-kicker"><HelpCircle size={14}/> GOOD TO KNOW</p>
          <h2 id="faq-title" className="stagger-heading stagger-h2">
            <span className="stagger-item" style={{ animationDelay: '140ms' }}>Ada yang ingin</span>
            <span className="stagger-item stagger-item-em" style={{ animationDelay: '280ms' }}>
              <em>kamu tanyakan?</em>
            </span>
          </h2>
          <p className="section-intro">Temukan jawaban singkat sebelum memilih menu. Untuk informasi stok dan pengiriman terbaru, admin siap membantu.</p>
          <a
            className="btn btn-primary active:scale-95 transition-transform"
            href={buildWhatsAppInquiryUrl(WHATSAPP_NUMBER, 'Pertanyaan seputar menu, stok, dan pemesanan Gyozen')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16}/> Tanya admin Gyozen
          </a>
        </div>
        <div className="faq-list">
          {questions.map(({q, a}, index) => {
            const isOpen = openSet.includes(index);
            return (
              <div className={`faq-item transition-all duration-300 ${isOpen ? 'border-amber-900/25 shadow-xs' : ''}`} key={q}>
                <button
                  type="button"
                  className="w-full text-left flex items-center gap-3 min-h-[66px] cursor-pointer bg-transparent border-0 p-0 text-[var(--brown)]"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="faq-number">0{index+1}</span>
                  <strong className="flex-1 text-xs font-black">{q}</strong>
                  <Plus className={`faq-plus text-[var(--red)] transition-transform duration-300 ${isOpen ? 'rotate-45 text-[var(--red-deep)]' : ''}`} size={18}/>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="m-0 pb-4.5 pl-7 text-[11px] text-[var(--muted)] leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
