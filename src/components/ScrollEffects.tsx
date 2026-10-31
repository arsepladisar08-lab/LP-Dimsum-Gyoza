import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollEffects: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;

          if (totalHeight > 0) {
            const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
            setScrollProgress(progress);
          }

          setShowBackToTop(currentScroll > 420);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Scroll reveal observer
    const revealTargets = document.querySelectorAll<HTMLElement>(
      'section.section, .product-card, .bundle-card, .benefit-card, .step-card, .testimonial-card, .faq-item'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((target, index) => {
      target.classList.add('reveal-on-scroll');
      // subtle stagger on sibling grid cards
      const delay = (index % 3) * 60;
      if (delay > 0) {
        target.style.transitionDelay = `${delay}ms`;
      }
      observer.observe(target);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Kemajuan gulir halaman"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
        aria-label="Kembali ke atas halaman"
        title="Kembali ke atas"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};
