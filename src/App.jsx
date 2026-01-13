import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Plus,
  Minus,
  Instagram,
  Twitter,
  Linkedin,
  Truck,
  Zap,
  Target,
  Eye,
  ChevronRight,
  Play,
  Menu,
  X,
} from "lucide-react";

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = React.useRef(null);

  // Scroll animation refs for each section
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [uniqueRef, uniqueVisible] = useScrollAnimation();
  const [videoSectionRef, videoSectionVisible] = useScrollAnimation();
  const [rollingRef, rollingVisible] = useScrollAnimation();
  const [faqRef, faqVisible] = useScrollAnimation();

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Custom Font Injection
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@300;400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const sections = {
    unique: [
      {
        title: "HYPER-LOCAL REACH",
        desc: "We don't wait for people to see your ad. We go where they live, work, and commute.",
        icon: <Target className="w-8 h-8" />,
      },
      {
        title: "UNMISSABLE SCALE",
        desc: "A 20-foot moving canvas commands attention in a way a static billboard never can.",
        icon: <Truck className="w-8 h-8" />,
      },
      {
        title: "REAL-TIME TRACKING",
        desc: "Advanced GPS tracking and heatmaps show exactly where your message is being seen.",
        icon: <Zap className="w-8 h-8" />,
      },
      {
        title: "DYNAMIC ROUTING",
        desc: "We adjust routes based on city events and traffic patterns for maximum impressions.",
        icon: <Eye className="w-8 h-8" />,
      },
    ],
    blog: [
      {
        title: "The Psychology of Motion",
        category: "Insights",
        date: "Oct 24",
      },
      { title: "Urban Reach in 2024", category: "Strategy", date: "Sep 12" },
      {
        title: "Campaign Spotlight: Neon",
        category: "Case Study",
        date: "Aug 05",
      },
    ],
    faqs: [
      {
        q: "How do we track campaign success?",
        a: "We provide detailed analytics including GPS logs, estimated impressions based on traffic data, and QR code interaction reports.",
      },
      {
        q: "What cities do you cover?",
        a: "Currently, we operate in major metropolitan hubs across the country, focusing on high-density urban corridors.",
      },
      {
        q: "Can we change the routes mid-campaign?",
        a: "Yes, our flexible routing system allows for adjustments based on live data or shifting marketing priorities.",
      },
    ],
  };

  return (
    <div className="bg-white text-black font-barlow selection:bg-black selection:text-white overflow-x-hidden">
      <style>{`
        .font-condensed { font-family: 'Barlow Condensed', sans-serif; }
        .font-barlow { font-family: 'Barlow', sans-serif; }
        .boxy-border { border: 1px solid #000; }
        .boxy-border-heavy { border: 2px solid #000; }
        
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .hero-line {
          display: block;
          overflow: hidden;
        }
        
        .hero-line span {
          display: block;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .hero-line:nth-child(1) span { animation-delay: 0.2s; }
        .hero-line:nth-child(2) span { animation-delay: 0.4s; }
        .hero-line:nth-child(3) span { animation-delay: 0.6s; }
        
        .hero-fade {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .hero-fade-1 { animation-delay: 0.8s; }
        .hero-fade-2 { animation-delay: 1s; }
        .hero-fade-3 { animation-delay: 1.2s; }
        
        /* Scroll-triggered animations */
        .section-header {
          display: block;
          overflow: hidden;
        }
        
        .section-header-text {
          display: block;
          opacity: 0;
          transform: translateY(100%);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .section-header-text.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-fade {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .scroll-fade.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-fade-delay-1 { transition-delay: 0.1s; }
        .scroll-fade-delay-2 { transition-delay: 0.2s; }
        .scroll-fade-delay-3 { transition-delay: 0.3s; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b-2 border-black h-20 flex items-center justify-between px-6 md:px-12">
        <div className="font-condensed text-3xl font-black tracking-tighter">
          ADSYUG
        </div>

        <div className="hidden md:flex gap-10 font-condensed text-lg font-bold tracking-wide">
          <a href="#about" className="hover:line-through transition-all">
            ABOUT
          </a>
          <a href="#unique" className="hover:line-through transition-all">
            FEATURES
          </a>
          <a href="#rolling" className="hover:line-through transition-all">
            INSIGHTS
          </a>
          <a href="#contact" className="hover:line-through transition-all">
            CONTACT
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <button className="hidden md:block boxy-border-heavy px-8 py-2 font-condensed font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
          Book a Fleet
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-condensed text-7xl md:text-[12rem] font-black leading-[0.85] uppercase tracking-tighter">
              <span className="hero-line">
                <span>DRIVING</span>
              </span>
              <span className="hero-line">
                <span
                  className="text-white"
                  style={{ WebkitTextStroke: "2px black" }}
                >
                  ATTENTION
                </span>
              </span>
              <span className="hero-line">
                <span>TO STREETS</span>
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-xl md:text-2xl font-light mb-8 max-w-sm leading-tight uppercase hero-fade hero-fade-1">
              The city is our gallery. <br /> Your brand is the masterpiece.{" "}
              <br /> AdsYug turns logistics into legend.
            </p>
            <div className="flex gap-4 hero-fade hero-fade-2">
              <button className="bg-black text-white px-8 py-4 font-condensed font-bold text-xl uppercase flex items-center gap-3 group hover:bg-zinc-800 transition-colors">
                Start Rolling{" "}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 border-t-2 border-black hero-fade hero-fade-3">
          <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
            <span className="font-condensed font-black text-4xl block">
              12.4M+
            </span>
            <span className="uppercase text-sm font-bold opacity-60">
              Monthly Impressions
            </span>
          </div>
          <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
            <span className="font-condensed font-black text-4xl block">
              450+
            </span>
            <span className="uppercase text-sm font-bold opacity-60">
              Active Trucks
            </span>
          </div>
          <div className="p-8">
            <span className="font-condensed font-black text-4xl block">
              98%
            </span>
            <span className="uppercase text-sm font-bold opacity-60">
              Recall Rate
            </span>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section
        id="about"
        ref={aboutRef}
        className="bg-black text-white py-24 px-6 md:px-12 border-y-2 border-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-condensed text-6xl font-bold uppercase tracking-tight leading-none">
              <span className="section-header">
                <span className={`section-header-text ${aboutVisible ? 'visible' : ''}`}>REDEFINING</span>
              </span>
              <span className="section-header">
                <span className={`section-header-text ${aboutVisible ? 'visible' : ''}`} style={{transitionDelay: '0.1s'}}>URBAN VISIBILITY</span>
              </span>
            </h2>
            <p className={`text-xl font-light opacity-80 leading-relaxed max-w-xl scroll-fade ${aboutVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
              AdsYug wasn't born in a boardroom; it was born in traffic. We
              realized the most valuable real estate in the city isn't a
              building—it's the space between them. We leverage a fleet of
              high-performance trucks to deliver high-impact advertising exactly
              where your audience lives.
            </p>
            <div className={`p-8 border border-white/20 scroll-fade ${aboutVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
              <p className="font-condensed text-2xl uppercase font-bold italic">
                "We don't just run ads; we start parades for your brand."
              </p>
            </div>
          </div>
          <div className="relative aspect-square bg-[#111] border border-white/20 p-4 flex items-center justify-center overflow-hidden">
            {/* Abstract Boxy Graphic */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 h-full">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-white/10" />
                ))}
              </div>
            </div>
            <div className="relative z-10 text-center uppercase tracking-widest font-condensed">
              <Truck size={120} strokeWidth={0.5} className="mx-auto mb-6" />
              <span className="text-sm font-bold block">
                Mobile Billboard Technology
              </span>
              <span className="text-[10rem] font-black block leading-none">
                AY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section
        id="unique"
        ref={uniqueRef}
        className="py-24 px-6 md:px-12 border-b-2 border-black"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="font-condensed text-6xl font-black uppercase leading-none">
            <span className="section-header">
              <span className={`section-header-text ${uniqueVisible ? 'visible' : ''}`}>WHY WE</span>
            </span>
            <span className="section-header">
              <span className={`section-header-text ${uniqueVisible ? 'visible' : ''}`} style={{transitionDelay: '0.1s'}}>DOMINATE</span>
            </span>
          </h2>
          <p className={`max-w-xs uppercase font-bold text-sm tracking-wider scroll-fade ${uniqueVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
            Our methodology combines industrial brute force with surgical
            digital precision.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-2 border-black divide-y-2 md:divide-y-0 md:divide-x-2 divide-black scroll-fade ${uniqueVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
          {sections.unique.map((item, idx) => (
            <div
              key={idx}
              className="p-10 hover:bg-black hover:text-white transition-colors group"
            >
              <div className="mb-12">{item.icon}</div>
              <h3 className="font-condensed text-3xl font-bold mb-4 uppercase">
                {item.title}
              </h3>
              <p className="text-sm uppercase font-medium opacity-60 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Full Screen Video Section */}
      <section ref={videoSectionRef} className="relative h-[80vh] bg-black overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video-asset.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-16">
          <div className="text-center">
            <h2 className="font-condensed text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">
              <span className="section-header">
                <span className={`section-header-text ${videoSectionVisible ? 'visible' : ''}`} style={{color: 'white'}}>THE CITY IN MOTION</span>
              </span>
            </h2>
            <span className={`text-white uppercase font-bold tracking-[0.4em] text-sm mt-4 block scroll-fade ${videoSectionVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
              Reel 2024
            </span>
          </div>
        </div>
      </section>

      {/* Blog and Social: Rolling Stories & Insights */}
      <section
        id="rolling"
        ref={rollingRef}
        className="py-24 px-6 md:px-12 border-y-2 border-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-condensed text-5xl font-black uppercase mb-6 leading-[0.9]">
              <span className="section-header">
                <span className={`section-header-text ${rollingVisible ? 'visible' : ''}`}>ROLLING</span>
              </span>
              <span className="section-header">
                <span className={`section-header-text ${rollingVisible ? 'visible' : ''}`} style={{transitionDelay: '0.1s'}}>STORIES &</span>
              </span>
              <span className="section-header">
                <span className={`section-header-text ${rollingVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>INSIGHTS</span>
              </span>
            </h2>
            <p className={`uppercase font-bold text-sm mb-12 max-w-xs scroll-fade ${rollingVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
              Data, anecdotes, and strategies from the road.
            </p>
            <div className={`space-y-4 scroll-fade ${rollingVisible ? 'visible' : ''}`} style={{transitionDelay: '0.4s'}}>
              <div className="p-6 border-2 border-black flex justify-between items-center group cursor-pointer hover:bg-black hover:text-white transition-all">
                <span className="font-bold uppercase">Follow on Instagram</span>
                <Instagram size={20} />
              </div>
              <div className="p-6 border-2 border-black flex justify-between items-center group cursor-pointer hover:bg-black hover:text-white transition-all">
                <span className="font-bold uppercase">View Case Studies</span>
                <ChevronRight size={20} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.blog.map((post, idx) => (
              <div
                key={idx}
                className="border-2 border-black p-8 flex flex-col justify-between hover:translate-y-[-8px] transition-transform cursor-pointer group"
              >
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <span className="bg-black text-white px-3 py-1 font-condensed text-sm font-bold">
                      {post.category}
                    </span>
                    <span className="font-condensed font-bold opacity-40">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-condensed text-4xl font-black uppercase leading-none group-hover:underline underline-offset-8">
                    {post.title}
                  </h3>
                </div>
                <div className="mt-12 flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            ))}

            <div className="border-2 border-black p-8 flex flex-col items-center justify-center text-center bg-zinc-50 border-dashed">
              <p className="font-condensed font-bold text-xl uppercase mb-4">
                Want to see how we roll daily?
              </p>
              <div className="flex gap-4">
                <Twitter className="cursor-pointer hover:scale-110 transition-transform" />
                <Linkedin className="cursor-pointer hover:scale-110 transition-transform" />
                <Instagram className="cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-24 px-6 md:px-12 bg-zinc-50 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-condensed text-5xl font-black uppercase mb-16 text-center underline underline-offset-[16px] decoration-4">
            <span className="section-header" style={{display: 'inline-block'}}>
              <span className={`section-header-text ${faqVisible ? 'visible' : ''}`}>FAQS</span>
            </span>
          </h2>
          <div className={`border-2 border-black divide-y-2 divide-black scroll-fade ${faqVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
            {sections.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white">
                <button
                  className="w-full p-8 flex justify-between items-center text-left hover:bg-black hover:text-white transition-colors group"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="font-condensed text-2xl font-black uppercase tracking-tight">
                    {faq.q}
                  </span>
                  {activeFaq === idx ? <Minus /> : <Plus />}
                </button>
                {activeFaq === idx && (
                  <div className="p-8 pt-0 border-t-2 border-black bg-white text-black">
                    <p className="text-lg leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Footer */}
      <footer
        id="contact"
        className="bg-black text-white pt-24 pb-12 px-6 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5 space-y-8">
            <h2 className="font-condensed text-7xl font-black uppercase leading-none tracking-tighter">
              ADSYUG
            </h2>
            <p className="text-xl font-light opacity-60 uppercase tracking-widest leading-snug">
              The premium street-level <br /> advertising partner for <br />{" "}
              brands that demand to be seen.
            </p>
            <div className="flex gap-4 border-t border-white/20 pt-8">
              <Instagram className="w-8 h-8 hover:text-zinc-400 transition-colors cursor-pointer" />
              <Twitter className="w-8 h-8 hover:text-zinc-400 transition-colors cursor-pointer" />
              <Linkedin className="w-8 h-8 hover:text-zinc-400 transition-colors cursor-pointer" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="font-condensed text-2xl font-bold uppercase border-b border-white/20 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 uppercase text-sm font-bold opacity-60">
              <li className="hover:opacity-100 transition-opacity">
                <a href="#">Home</a>
              </li>
              <li className="hover:opacity-100 transition-opacity">
                <a href="#about">About</a>
              </li>
              <li className="hover:opacity-100 transition-opacity">
                <a href="#unique">Services</a>
              </li>
              <li className="hover:opacity-100 transition-opacity">
                <a href="#rolling">Insights</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="font-condensed text-2xl font-bold uppercase border-b border-white/20 pb-2">
              Support
            </h4>
            <ul className="space-y-2 uppercase text-sm font-bold opacity-60">
              <li className="hover:opacity-100 transition-opacity">
                <a href="#">Client Portal</a>
              </li>
              <li className="hover:opacity-100 transition-opacity">
                <a href="#">Help Center</a>
              </li>
              <li className="hover:opacity-100 transition-opacity">
                <a href="#">Pricing</a>
              </li>
              <li className="hover:opacity-100 transition-opacity">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-condensed text-2xl font-bold uppercase border-b border-white/20 pb-2">
              Newsletter
            </h4>
            <p className="text-sm uppercase font-bold opacity-60 mb-4 tracking-tighter">
              Get the latest urban insights.
            </p>
            <div className="flex border-2 border-white">
              <input
                type="text"
                placeholder="EMAIL@DOMAIN.COM"
                className="bg-transparent px-4 py-2 w-full focus:outline-none font-condensed uppercase font-bold text-sm"
              />
              <button className="bg-white text-black px-4 py-2 hover:bg-zinc-200 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-bold uppercase opacity-40 tracking-[0.2em]">
            © 2024 ADSYUG ADVERTISING. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase opacity-40 tracking-[0.2em]">
            <span className="cursor-pointer hover:opacity-100 transition-opacity">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:opacity-100 transition-opacity">
              Terms of Service
            </span>
            <span className="cursor-pointer hover:opacity-100 transition-opacity">
              Cookies
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col p-12">
          <div className="flex justify-between items-center mb-24">
            <div className="font-condensed text-3xl font-black">ADSYUG</div>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={40} />
            </button>
          </div>
          <div className="flex flex-col gap-8 font-condensed text-6xl font-black uppercase">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#unique" onClick={() => setIsMenuOpen(false)}>
              Unique
            </a>
            <a href="#rolling" onClick={() => setIsMenuOpen(false)}>
              Rolling
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
