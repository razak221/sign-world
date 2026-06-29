import myntra from "../../assets/client_logos/myntra.svg";
import flipkart from "../../assets/client_logos/flipkart.svg";
import swiggy from "../../assets/client_logos/swiggy.png";
import infosys from "../../assets/client_logos/infosys.svg";
import wipro from "../../assets/client_logos/wipro.svg";
import hm from "../../assets/client_logos/hm.svg";
import zara from "../../assets/client_logos/zara.svg";
import puma from "../../assets/client_logos/puma.svg";
import levis from "../../assets/client_logos/levis.svg";

interface LogoData {
  src: string;
  name: string;
}

export function ClientLogos() {
  const logos: LogoData[] = [
    { src: myntra, name: "Myntra" },
    { src: flipkart, name: "Flipkart" },
    { src: swiggy, name: "Swiggy" },
    { src: infosys, name: "Infosys" },
    { src: wipro, name: "Wipro" },
    { src: hm, name: "H&M" },
    { src: zara, name: "Zara" },
    { src: puma, name: "Puma" },
    { src: levis, name: "Levi's" },
  ];

  // Duplicate logos list once to create a seamless infinite marquee scrolling effect
  const doubleLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden relative py-4">
      {/* Sleek edge fades - white to transparent to match the white board background */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Marquee Container */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-2 items-center">
        {doubleLogos.map((logo, index) => (
          <div
            key={index}
            className="inline-flex items-center justify-center mx-12 cursor-pointer transition-all duration-500 hover:scale-110"
            title={`${logo.name} - Bangalore`}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 md:h-10 w-auto object-contain transition-all duration-500 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.08)] opacity-95 hover:opacity-100 hover:drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
