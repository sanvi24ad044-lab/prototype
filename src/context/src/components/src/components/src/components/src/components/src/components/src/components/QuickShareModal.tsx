import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Share2, Copy, Check, X, MessageCircle } from 'lucide-react';

interface QuickShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl?: string;
}

export const QuickShareModal: React.FC<QuickShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://mandimitra.ai'
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(shareUrl, { width: 220, margin: 2 })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('Error generating QR Code:', err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`🌾 *MANDIMITRA AI*\nCheck out live mandi rates, soil health predictions, and crop loss calculators:\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-600 dark:text-emerald-400">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Quick Share Platform</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Scan QR Code or share instantly with fellow farmers
          </p>
        </div>

        <div className="my-5 flex justify-center">
          <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-200">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="MandiMitra QR Code" className="w-44 h-44" />
            ) : (
              <div className="w-44 h-44 flex items-center justify-center text-xs text-slate-400">
                Generating QR...
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" /> Share on WhatsApp
          </button>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
};
