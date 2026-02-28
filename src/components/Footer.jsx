import { siteConfig } from "../data/siteConfig";
import { FaPhone, FaMapLocationDot } from "react-icons/fa6";

const MAPS_URL = "https://maps.app.goo.gl/bFH8zWUWh8CQurTLA";
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(MAPS_URL)}`;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a] px-6 py-16 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8860b]/50 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* House name */}
          <div>
            <h3
              className="font-heading text-2xl font-medium tracking-wide text-white md:text-3xl"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              {siteConfig.houseName}
            </h3>
            <p className="mt-4 font-body text-sm text-white/60">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-white/80">
                Call
              </h4>
              <div className="mt-3 space-y-3">
                <a
                  href={`tel:${siteConfig.contact.yash.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white/90 transition-colors hover:border-[#b8860b] hover:text-[#b8860b]"
                >
                  <FaPhone className="h-4 w-4 shrink-0 text-[#b8860b]" />
                  <div>
                    <span className="block font-medium">{siteConfig.contact.yash.name}</span>
                    <span className="text-white/70">{siteConfig.contact.yash.phone}</span>
                  </div>
                </a>
                <a
                  href={`tel:${siteConfig.contact.aniket.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white/90 transition-colors hover:border-[#b8860b] hover:text-[#b8860b]"
                >
                  <FaPhone className="h-4 w-4 shrink-0 text-[#b8860b]" />
                  <div>
                    <span className="block font-medium">{siteConfig.contact.aniket.name}</span>
                    <span className="text-white/70">{siteConfig.contact.aniket.phone}</span>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-white/80">
                Visit
              </h4>
              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-start gap-3 rounded border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white/90 transition-colors hover:border-[#b8860b] hover:text-[#b8860b]"
              >
                <FaMapLocationDot className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                <div>
                  <span className="block">{siteConfig.contact.address}</span>
                  <span className="mt-1 text-xs text-[#b8860b]">Get directions →</span>
                </div>
              </a>
            </div>
          </div>

          {/* QR Code - Scan to navigate */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-white/80">
              Scan to Navigate
            </h4>
            <p className="mt-4 font-body text-sm text-white/60">
              Scan the QR code or tap to get directions
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg border-2 border-white/20 p-3 transition-all duration-300 hover:border-[#b8860b] hover:shadow-[0_0_20px_rgba(184,134,11,0.15)]"
            >
              <img
                src={QR_CODE_URL}
                alt="QR Code - Scan for directions to Churihar House"
                width={180}
                height={180}
                className="block"
              />
            </a>
          </div>

          {/* Back to top */}
          <div className="flex items-end">
            <a
              href="#hero"
              className="font-body text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-[#b8860b]"
            >
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {siteConfig.houseName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
