import React, { useState } from 'react';
import { HelpCircle, Plus } from 'lucide-react';

const questions = [
  { q: 'Apa saja pilihan menu yang tersedia?', a: 'Gyozen menyediakan gyoza, dimsum original, dimsum goreng keju, mentai, platter, party box, pilihan ready frozen, dan Ebi Chili Oil sebagai pelengkap. Detail porsi dan harga dapat dilihat pada katalog.' },
  { q: 'Bagaimana cara memesan?', a: 'Pilih produk, tambahkan ke keranjang, lengkapi nama serta alamat, lalu kirim rangkuman melalui WhatsApp. Admin akan membantu konfirmasi stok, ongkir, dan pembayaran.' },
  { q: 'Apakah pesanan langsung terkonfirmasi setelah dikirim?', a: 'Belum. Pesan WhatsApp merupakan permintaan pemesanan. Pesanan baru terkonfirmasi setelah admin mengecek ketersediaan produk, ongkir, dan detail pembayaran.' },
  { q: 'Apakah alamat bisa dipilih dari seluruh Indonesia?', a: 'Form alamat menyediakan pilihan wilayah dari seluruh Indonesia. Namun, ketersediaan pengantaran tetap perlu dikonfirmasi dengan admin. Pemilihan wilayah tidak otomatis menjamin area tersebut terlayani.' },
  { q: 'Bagaimana jika kode pos tidak muncul atau kurang sesuai?', a: 'Kode pos diisi otomatis berdasarkan desa/kelurahan dari data referensi dan tetap bisa dikoreksi. Jika data belum tersedia, kode pos boleh dikosongkan dan dikonfirmasi kepada admin.' },
  { q: 'Bagaimana mengetahui ongkos kirim?', a: 'Ongkos kirim bergantung pada area dan metode pengiriman. Admin akan mengonfirmasi nominal ongkir setelah menerima alamat lengkap.' },
  { q: 'Apakah tersedia pilihan frozen atau pesanan jumlah banyak?', a: 'Ya, katalog memiliki pilihan Ready Frozen dan Party Box. Untuk stok, jadwal, atau pesanan dalam jumlah banyak, silakan konfirmasi langsung kepada admin.' }
];

export const FAQ: React.FC = () => {
  const [openSet, setOpenSet] = useState<number[]>([0]);
  const toggle = (idx: number) => setOpenSet((prev) =>
    prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
  );

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container-custom faq-layout">
        <div className="faq-intro lg:sticky lg:top-28">
          <p className="section-kicker"><HelpCircle size={14}/> GOOD TO KNOW</p>
          <h2 id="faq-title" className="stagger-heading stagger-h2 mb-0">
            <span className="stagger-item" style={{ animationDelay: '140ms' }}>Ada yang ingin</span>
            <span className="stagger-item stagger-item-em" style={{ animationDelay: '280ms' }}><em>kamu tanyakan?</em></span>
          </h2>
        </div>
        <div className="faq-list">
          {questions.map(({ q, a }, index) => {
            const isOpen = openSet.includes(index);
            return (
              <div className={`faq-item transition-all duration-300 ${isOpen ? 'border-amber-900/25 shadow-xs' : ''}`} key={q}>
                <button type="button"
                  className="w-full text-left flex items-center gap-3 min-h-[66px] cursor-pointer bg-transparent border-0 p-0 text-[var(--brown)]"
                  onClick={() => toggle(index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}>
                  <span className="faq-number">0{index + 1}</span>
                  <strong className="flex-1 text-sm md:text-base font-black">{q}</strong>
                  <Plus className={`faq-plus text-[var(--red)] transition-transform duration-300 ${isOpen ? 'rotate-45 text-[var(--red-deep)]' : ''}`} size={18}/>
                </button>
                <div id={`faq-answer-${index}`} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden"><p className="m-0 pb-4.5 pl-7 text-sm text-[var(--muted)] leading-relaxed">{a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
