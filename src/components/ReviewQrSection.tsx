import React, { useRef, useState } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Check, Download, ExternalLink, QrCode, Star } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { AnimatedContent } from './motion/AnimatedContent';
import { ClickSpark } from './motion/ClickSpark';
import { BrandMark } from './BrandMark';

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  fill: string,
) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / 5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

export const ReviewQrSection: React.FC = () => {
  const qrCanvasContainerRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadPrintableCard = () => {
    const sourceCanvas = qrCanvasContainerRef.current?.querySelector('canvas');
    if (!sourceCanvas) return;

    const W = 1200;
    const H = 1640;
    const out = document.createElement('canvas');
    out.width = W;
    out.height = H;
    const ctx = out.getContext('2d');
    if (!ctx) return;

    // 1. Deep Roasted Espresso Background
    ctx.fillStyle = '#110E0C';
    ctx.fillRect(0, 0, W, H);

    // Subtle warm radial glow behind QR frame
    const radial = ctx.createRadialGradient(W / 2, 860, 40, W / 2, 860, 560);
    radial.addColorStop(0, 'rgba(201, 154, 59, 0.16)');
    radial.addColorStop(1, 'rgba(17, 14, 12, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // 2. Burnished Gold Double Frame
    ctx.strokeStyle = 'rgba(201, 154, 59, 0.55)';
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, 48, 48, W - 96, H - 96, 42);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(201, 154, 59, 0.22)';
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, 72, 72, W - 144, H - 144, 30);
    ctx.stroke();

    // 3. Crest + Brand Heading
    ctx.textAlign = 'center';
    ctx.fillStyle = '#C99A3B';
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('RAJ CAFE DHAWA  •  RCD', W / 2, 162);

    ctx.fillStyle = '#F7F2EA';
    ctx.font = '600 72px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Loved Your Visit?', W / 2, 258);

    ctx.fillStyle = 'rgba(247, 242, 234, 0.78)';
    ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Drop us a 5-star Google Review in 10 seconds', W / 2, 322);

    // 4. Five Gold Stars
    const starSpacing = 62;
    const startX = W / 2 - starSpacing * 2;
    for (let i = 0; i < 5; i++) {
      drawStar(ctx, startX + i * starSpacing, 405, 22, 10, '#C99A3B');
    }

    // 5. High-Contrast White Card for Scannable QR Code
    const cardW = 720;
    const cardH = 820;
    const cardX = (W - cardW) / 2;
    const cardY = 475;

    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 36);
    ctx.fill();

    ctx.strokeStyle = '#C99A3B';
    ctx.lineWidth = 4;
    drawRoundedRect(ctx, cardX + 14, cardY + 14, cardW - 28, cardH - 28, 26);
    ctx.stroke();

    // Draw high-res QR code centered inside white frame
    const qrSize = 560;
    const qrX = (W - qrSize) / 2;
    const qrY = cardY + 72;
    ctx.drawImage(sourceCanvas, qrX, qrY, qrSize, qrSize);

    // Label below QR inside white card
    ctx.fillStyle = '#110E0C';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SCAN FOR GOOGLE REVIEW', W / 2, cardY + cardH - 84);

    ctx.fillStyle = '#7A5B1F';
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Point your phone camera here', W / 2, cardY + cardH - 42);

    // 6. Footer Details
    ctx.fillStyle = '#C99A3B';
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('4.4 ★ ON GOOGLE  •  OPEN DAILY 10:30 AM – 10:00 PM', W / 2, 1410);

    ctx.fillStyle = 'rgba(247, 242, 234, 0.72)';
    ctx.font = '400 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('2nd Floor (Above Dada Mirchi Masala), Sinli Road, Dhawa, Jodhpur', W / 2, 1470);

    ctx.fillStyle = 'rgba(201, 154, 59, 0.85)';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Instagram: @raj_cafe_dhawa  •  +91 63764 94346', W / 2, 1525);

    const dataUrl = out.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'raj-cafe-dhawa-review-qr-card.png';
    link.href = dataUrl;
    link.click();

    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="review-qr" className="bg-[#F8F3EB] py-20 sm:py-28 text-[#1C1612]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="overflow-hidden rounded-3xl border border-[#1C1612]/12 bg-[#110E0C] text-[#F7F2EA] shadow-[0_24px_65px_rgba(28,22,18,0.14)]">
            <div className="grid grid-cols-1 items-center gap-10 p-7 sm:p-12 lg:grid-cols-12 lg:gap-12">
              {/* Left Side — Copy & Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1 rounded-full border border-[#C99A3B]/40 bg-[#C99A3B]/14 px-3.5 py-1.5 text-xs font-semibold text-[#C99A3B]">
                    <div className="flex items-center gap-0.5 mr-1" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <Star
                          key={idx}
                          className={`h-3.5 w-3.5 ${
                            idx < 4
                              ? 'fill-[#C99A3B] text-[#C99A3B]'
                              : 'fill-[#C99A3B]/60 text-[#C99A3B]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="tabular-nums">4.4 ★ on Google</span>
                  </div>

                  <span className="text-xs font-medium text-[#F7F2EA]/65">
                    {CAFE_DATA.google.reviewsCountText} · Dhawa, Jodhpur
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C99A3B]">
                    Guest Love &amp; Table QR Standee
                  </span>
                  <h2 className="font-editorial mt-2 text-3xl font-semibold leading-[1.08] text-[#F7F2EA] sm:text-5xl">
                    Loved the coffee or cabin vibe?
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#F7F2EA]/80 sm:text-base">
                    Scan to drop us a 5-star Google review in 10 seconds! Whether it was our fiery
                    Schezwan Chowmein, chilled Cold Coffee, or a quiet evening in our curtained
                    cabins, your feedback helps more neighbors in Dhawa &amp; Jodhpur discover us.
                  </p>
                </div>

                {/*Interactive 5-star visual bar */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1B1613] px-4 py-3.5 max-w-md">
                  <div className="flex items-center gap-1 text-[#C99A3B]">
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <Star key={idx} className="h-5 w-5 fill-[#C99A3B]" />
                    ))}
                  </div>
                  <div className="text-xs text-[#F7F2EA]/80">
                    Direct Google Review link · Instant mobile scan
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <ClickSpark sparkColor="#F7F2EA">
                    <a
                      href={CAFE_DATA.google.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#C99A3B] px-6 py-3.5 text-sm font-semibold text-[#110E0C] transition-[background-color,transform] duration-200 hover:bg-[#d8ab4c] active:scale-[0.98]"
                    >
                      <span>Write a Google Review</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </ClickSpark>

                  <button
                    type="button"
                    onClick={handleDownloadPrintableCard}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-[#1B1613] px-6 py-3.5 text-sm font-semibold text-[#F7F2EA] transition-colors hover:border-[#C99A3B] hover:text-[#C99A3B] cursor-pointer"
                  >
                    {downloaded ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-300">Table QR Card Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 text-[#C99A3B]" />
                        <span>Download Printable Table QR Card</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Side — Scannable QR Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[320px] rounded-3xl border-2 border-[#C99A3B]/65 bg-white p-6 text-center text-[#110E0C] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <BrandMark size={28} />
                    <span className="font-editorial text-lg font-bold tracking-wide uppercase text-[#110E0C]">
                      Raj Cafe Dhawa
                    </span>
                  </div>

                  <div className="mx-auto inline-flex rounded-2xl border border-[#110E0C]/10 bg-white p-3">
                    <QRCodeSVG
                      value={CAFE_DATA.google.reviewUrl}
                      size={200}
                      level="H"
                      bgColor="#FFFFFF"
                      fgColor="#110E0C"
                    />
                  </div>

                  <div className="mt-4 space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] uppercase text-[#110E0C]">
                      <QrCode className="h-3.5 w-3.5 text-[#9A6F1E]" />
                      <span>Scan for Google Review</span>
                    </div>
                    <p className="text-[11px] text-[#57493E]">
                      Point camera to rate us on Google Maps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* Hidden high-resolution canvas used cleanly to export the printable PNG standee */}
        <div ref={qrCanvasContainerRef} className="sr-only" aria-hidden="true">
          <QRCodeCanvas
            value={CAFE_DATA.google.reviewUrl}
            size={640}
            level="H"
            bgColor="#FFFFFF"
            fgColor="#110E0C"
          />
        </div>
      </div>
    </section>
  );
};
