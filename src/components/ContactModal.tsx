import React, { useState, useEffect } from 'react';
import { SealChop } from './SealChop.tsx';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1B1917]/55 backdrop-blur-sm cursor-pointer"
      />

      <div className="relative z-10 w-full max-w-lg bg-[#F2EDE4] border border-[#1B1917]/15 shadow-2xl p-6 sm:p-8 md:p-10 bg-parchment-texture text-[#1B1917]">
        <div className="flex items-center justify-between pb-4 border-b border-[#1B1917]/10">
          <div className="flex items-center gap-3">
            <SealChop size="sm" label="MW" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#7E786E]">
              DIRECT ENQUIRY
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-lg hover:rotate-90 transition-transform cursor-pointer font-serif"
          >
            ✕
          </button>
        </div>

        {sent ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#B23A2A]/15 text-[#B23A2A] flex items-center justify-center text-xl font-serif">
              印
            </div>
            <h3 className="font-serif text-2xl text-[#1B1917]">Message Received</h3>
            <p className="text-sm text-[#555047] font-light max-w-xs mx-auto">
              Thank you for reaching out. Marcus typically responds within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2 text-xs uppercase tracking-[0.2em] font-semibold bg-[#1B1917] text-[#F2EDE4] hover:bg-[#33302B] transition-colors cursor-pointer"
            >
              RETURN
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-6 space-y-5">
            <h3 id="contact-title" className="font-serif text-3xl text-[#1B1917]">
              Start a conversation
            </h3>
            <p className="text-xs text-[#555047] font-light">
              London & remote product leadership opportunities, advisor inquiries, or 0→1 marketplace architecture.
            </p>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#7E786E] block">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eleanor Vance"
                className="w-full px-3 py-2 bg-[#EAE3D6]/60 border border-[#1B1917]/20 text-sm focus:outline-none focus:border-[#B23A2A] rounded-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#7E786E] block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@organization.com"
                className="w-full px-3 py-2 bg-[#EAE3D6]/60 border border-[#1B1917]/20 text-sm focus:outline-none focus:border-[#B23A2A] rounded-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#7E786E] block">
                Message or Project Context
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the problem space, the team, and what launch needs..."
                className="w-full px-3 py-2 bg-[#EAE3D6]/60 border border-[#1B1917]/20 text-sm focus:outline-none focus:border-[#B23A2A] rounded-none transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-[#7E786E] tracking-wider uppercase">
                Replies within 24h
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold bg-[#B23A2A] text-white hover:bg-[#8F271A] transition-colors cursor-pointer"
              >
                TRANSMIT MESSAGE
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
