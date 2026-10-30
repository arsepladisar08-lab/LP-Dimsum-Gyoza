import React from 'react';
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
  const askWhatsApp = () => window.open(buildWhatsAppInquiryUrl(WHATSAPP_NUMBER,'Pertanyaan seputar menu, stok, dan pemesanan Gyozen'),'_blank','noopener,noreferrer');

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container-custom faq-layout">
        <div className="faq-intro"><p className="section-kicker"><HelpCircle size={14}/> GOOD TO KNOW</p><h2 id="faq-title">Ada yang ingin<br/><em>kamu tanyakan?</em></h2><p className="section-intro">Temukan jawaban singkat sebelum memilih menu. Untuk informasi stok dan pengiriman terbaru, admin siap membantu.</p><button className="btn btn-primary" type="button" onClick={askWhatsApp}><MessageCircle size={16}/> Tanya admin Gyozen</button></div>
        <div className="faq-list">
          {questions.map(({q,a},index)=>(
            <details className="faq-item" key={q} open={index===0}>
              <summary><span className="faq-number">0{index+1}</span><strong>{q}</strong><Plus className="faq-plus" size={18}/></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
