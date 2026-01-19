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

// Magnetic Button Component
const MagneticButton = ({ children, className = "", strength = 0.3 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-300 ease-out cursor-pointer ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  );
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
  const [galleryRef, galleryVisible] = useScrollAnimation();
  const [faqRef, faqVisible] = useScrollAnimation();

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Gallery images data - original set
  const galleryImagesBase = [
    { src: "/asset 10.webp", alt: "Street advertising", caption: "Brand on the Move", location: "Mumbai, Maharashtra" },
    { src: "/asset 11.webp", alt: "Street advertising", caption: "Urban Impact", location: "Delhi NCR" },
    { src: "/asset 12.webp", alt: "Street advertising", caption: "Street Presence", location: "Bangalore, Karnataka" },
    { src: "/asset 13.webp", alt: "Street advertising", caption: "Maximum Visibility", location: "Hyderabad, Telangana" },
    { src: "/asset 14.webp", alt: "Street advertising", caption: "Rolling Impressions", location: "Chennai, Tamil Nadu" },
    { src: "/asset 15.webp", alt: "Street advertising", caption: "City Canvas", location: "Pune, Maharashtra" },
    { src: "/asset 16.webp", alt: "Street advertising", caption: "Traffic Stopper", location: "Kolkata, West Bengal" },
    { src: "/asset 17.webp", alt: "Street advertising", caption: "Street Level Branding", location: "Ahmedabad, Gujarat" },
  ];

  // Duplicate images for infinite loop effect
  const galleryImages = [...galleryImagesBase, ...galleryImagesBase.slice(0, 3)];

  // Auto-play carousel with infinite loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    if (carouselIndex >= galleryImagesBase.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCarouselIndex(0);
      }, 700);
      setTimeout(() => {
        setIsTransitioning(true);
      }, 750);
    }
  }, [carouselIndex]);

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
        
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Navigation */}
      <nav role="navigation" aria-label="Main navigation" className="fixed top-0 w-full z-50 bg-white border-b-2 border-black h-20 flex items-center justify-between px-6 md:px-12">
        <a href="#" className="font-condensed text-3xl font-black tracking-tighter cursor-pointer hover:line-through transition-all" aria-label="AdsYug - Go to homepage">
          ADSYUG
        </a>

        <div className="hidden md:flex gap-10 font-condensed text-lg font-bold tracking-wide" role="menubar">
          <a href="#about" className="hover:line-through transition-all" role="menuitem">
            ABOUT
          </a>
          <a href="#unique" className="hover:line-through transition-all" role="menuitem">
            FEATURES
          </a>
          <a href="#rolling" className="hover:line-through transition-all" role="menuitem">
            INSIGHTS
          </a>
          <a href="#contact" className="hover:line-through transition-all" role="menuitem">
            CONTACT
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={32} aria-hidden="true" /> : <Menu size={32} aria-hidden="true" />}
        </button>

        <MagneticButton strength={0.2} className="hidden md:block">
          <button className="boxy-border-heavy px-8 py-2 font-condensed font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
            Book a Fleet
          </button>
        </MagneticButton>
      </nav>

      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="pt-32 md:pt-48 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-center">
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
              <MagneticButton strength={0.15}>
                <button className="bg-black text-white px-8 py-4 font-condensed font-bold text-xl uppercase flex items-center gap-3 group hover:bg-zinc-800 transition-colors">
                  Start Rolling{" "}
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 border-2 border-black hero-fade hero-fade-3">
          <div className="p-10 border-b-2 md:border-b-0 md:border-r-2 border-black group hover:bg-black hover:text-white transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-6 h-6 opacity-40 group-hover:text-[#39FF14] transition-colors" />
              <span className="uppercase text-xs font-bold tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity">
                Monthly Impressions
              </span>
            </div>
            <span className="font-condensed font-black text-6xl md:text-7xl block group-hover:text-[#39FF14] transition-colors">
              12.4M+
            </span>
          </div>
          <div className="p-10 border-b-2 md:border-b-0 md:border-r-2 border-black group hover:bg-black hover:text-white transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-6 h-6 opacity-40 group-hover:text-[#39FF14] transition-colors" />
              <span className="uppercase text-xs font-bold tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity">
                Active Trucks
              </span>
            </div>
            <span className="font-condensed font-black text-6xl md:text-7xl block group-hover:text-[#39FF14] transition-colors">
              450+
            </span>
          </div>
          <div className="p-10 group hover:bg-black hover:text-white transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 opacity-40 group-hover:text-[#39FF14] transition-colors" />
              <span className="uppercase text-xs font-bold tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity">
                Recall Rate
              </span>
            </div>
            <span className="font-condensed font-black text-6xl md:text-7xl block group-hover:text-[#39FF14] transition-colors">
              98%
            </span>
          </div>
        </div>
      </section>

      {/* Diagonal Marquee Strips */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Green Strip - tilted left */}
        <div 
          className="absolute left-0 right-0 bg-[#39FF14] py-6 flex items-center whitespace-nowrap"
          style={{
            transform: 'rotate(-3deg) translateX(-5%)',
            width: '110%',
            top: '15%',
            boxShadow: '0 8px 30px rgba(57, 255, 20, 0.4)'
          }}
        >
          <div className="marquee-green flex items-center gap-12">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="font-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase text-black tracking-tight flex items-center gap-12">
                <span>THAT'S ADSYUG!</span>
                <span className="text-black/50">★</span>
              </span>
            ))}
          </div>
        </div>
        
        {/* Black Strip - tilted right */}
        <div 
          className="absolute left-0 right-0 bg-black py-6 flex items-center whitespace-nowrap"
          style={{
            transform: 'rotate(3deg) translateX(-5%)',
            width: '110%',
            top: '55%',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="marquee-black flex items-center gap-12">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="font-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight flex items-center gap-12">
                <span>#FROM STATIC TO FANTASTIC</span>
                <span className="text-[#39FF14]">★</span>
              </span>
            ))}
          </div>
        </div>

        {/* Spacer to maintain height */}
        <div className="h-48 md:h-56"></div>
        
        <style>{`
          @keyframes marqueeGreen {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeBlack {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-green {
            animation: marqueeGreen 20s linear infinite;
          }
          .marquee-black {
            animation: marqueeBlack 25s linear infinite;
          }
        `}</style>
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
          {/* Enhanced Image Display with truck-pre.jpg */}
          <div className={`relative aspect-[4/5] md:aspect-square overflow-hidden group scroll-fade ${aboutVisible ? 'visible' : ''}`} style={{transitionDelay: '0.4s'}}>
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#39FF14]/50 via-[#39FF14]/20 to-transparent blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Main image container */}
            <div className="relative h-full border-2 border-[#39FF14]/40 overflow-hidden bg-black">
              {/* The truck image */}
              <img 
                src="/truck-pre.jpg" 
                alt="AdsYug Mobile Billboard Truck"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              
              {/* Animated scanlines effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.03) 2px, rgba(57, 255, 20, 0.03) 4px)',
                animation: 'scanlines 8s linear infinite'
              }} />
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#39FF14] opacity-80" aria-hidden="true" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#39FF14] opacity-80" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#39FF14] opacity-80" aria-hidden="true" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#39FF14] opacity-80" aria-hidden="true" />
              
              {/* Floating stat badges */}
              <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm border border-[#39FF14]/50 px-4 py-2 text-right">
                <span className="font-condensed text-3xl md:text-4xl font-black text-[#39FF14]">450+</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60">Active Fleet</span>
              </div>
              
              <div className="absolute top-20 md:top-24 right-6 bg-black/70 backdrop-blur-sm border border-white/20 px-4 py-2 text-right">
                <span className="font-condensed text-xl md:text-2xl font-black text-white">50K+</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60">KM Daily</span>
              </div>
              
              {/* Bottom content area */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-condensed text-4xl md:text-5xl font-black text-white tracking-tight">ADSYUG</span>
                    <span className="block text-xs uppercase tracking-[0.3em] text-[#39FF14] mt-1">Mobile Billboard Network</span>
                  </div>
                  <div className="text-right">
                    <span className="font-condensed text-5xl md:text-6xl font-black text-white/10">98%</span>
                    <span className="block text-[10px] uppercase tracking-wider text-white/50 -mt-2">Recall Rate</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative corner lines */}
              <div className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-b from-[#39FF14]/60 to-transparent" />
              <div className="absolute bottom-0 left-1/2 w-px h-8 bg-gradient-to-t from-[#39FF14]/60 to-transparent" />
              <div className="absolute top-1/2 left-0 h-px w-8 bg-gradient-to-r from-[#39FF14]/60 to-transparent" />
              <div className="absolute top-1/2 right-0 h-px w-8 bg-gradient-to-l from-[#39FF14]/60 to-transparent" />
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
      <section ref={videoSectionRef} aria-label="Company showreel video" className="relative h-[80vh] bg-black overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video-asset.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="AdsYug promotional video showing mobile billboards in action"
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

      {/* Gallery Section - Image Carousel with Dynamic Backdrop */}
      <section ref={galleryRef} className="relative py-24 border-b-2 border-black bg-black overflow-hidden">
        {/* Dynamic Backdrop Blur */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{
            backgroundImage: `url(${galleryImages[(carouselIndex + 1) % galleryImages.length].src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(100px) saturate(2)',
            transform: 'scale(1.2)'
          }}
        />

        <div className="relative z-10 px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className={`uppercase font-bold text-sm tracking-[0.3em] mb-4 text-[#39FF14] scroll-fade ${galleryVisible ? 'visible' : ''}`}>
              [ See How We Roll ]
            </p>
            <h2 className="font-condensed text-5xl md:text-7xl font-black uppercase tracking-tight text-white">
              <span className="section-header" style={{display: 'inline-block'}}>
                <span className={`section-header-text ${galleryVisible ? 'visible' : ''}`}>
                  STRAIGHT FROM THE STREETS
                </span>
              </span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <MagneticButton strength={0.4}>
              <button 
                onClick={() => setCarouselIndex(prev => prev === 0 ? galleryImagesBase.length - 1 : prev - 1)}
                className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#39FF14] hover:text-black hover:border-[#39FF14] transition-all duration-300 group rounded-full"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <button 
                onClick={() => setCarouselIndex(prev => prev + 1)}
                className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#39FF14] hover:text-black hover:border-[#39FF14] transition-all duration-300 group rounded-full"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </MagneticButton>
          </div>
        </div>
        
        {/* 3-Image Carousel with Center Highlight */}
        <div className={`relative px-6 md:px-12 py-12 scroll-fade ${galleryVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
          <div className="overflow-hidden py-8">
            <div 
              className={`flex items-end gap-4 md:gap-6 ${isTransitioning ? 'transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1)' : ''}`}
              style={{ transform: `translateX(calc(-${carouselIndex} * (33.333% + 0.5rem)))` }}
            >
              {galleryImages.map((img, idx) => {
                const isMiddle = idx === (carouselIndex + 1);
                return (
                  <div 
                    key={idx} 
                    className={`min-w-[calc(50%-0.5rem)] md:min-w-[calc(33.333%-1rem)] relative group cursor-pointer transition-all duration-700 ease-out origin-bottom ${
                      isMiddle ? 'scale-110 z-10 opacity-100' : 'scale-90 opacity-100'
                    }`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                      <img 
                        src={img.src} 
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay on hover or if Middle */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-300 ${
                        isMiddle ? 'opacity-90' : 'opacity-40'
                      }`} />
                      
                      {/* Image number */}
                      <div className="absolute top-4 left-4 font-condensed text-white/80 font-bold text-lg">
                        {String((idx % galleryImagesBase.length) + 1).padStart(2, '0')}
                      </div>
                      
                      {/* Center indicator/icon */}
                      {isMiddle && (
                        <div className="absolute top-4 right-4 w-10 h-10 bg-[#39FF14] flex items-center justify-center animate-pulse">
                          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Caption - Always visible for middle, subtle for others */}
                      <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-all duration-500 ${
                        isMiddle ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        <p className="font-condensed text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
                          {img.caption}
                        </p>
                        <p className="text-[#39FF14] uppercase text-xs font-bold tracking-[0.2em] mt-2">
                          {img.location}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-[2px] bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-[#39FF14] transition-all duration-500"
                style={{ width: `${(((carouselIndex % galleryImagesBase.length) + 1) / galleryImagesBase.length) * 100}%` }}
              />
            </div>
            <span className="font-condensed text-white/60 font-bold text-sm">
              {String((carouselIndex % galleryImagesBase.length) + 1).padStart(2, '0')} / {String(galleryImagesBase.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} id="faq" aria-labelledby="faq-heading" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden border-b-2 border-black">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39FF14]/5 opacity-[0.03] rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        
        <div className="relative z-10 w-full">
          <div className="mb-20">
            <p className={`uppercase font-bold text-sm tracking-[0.4em] text-[#39FF14] mb-4 scroll-fade ${faqVisible ? 'visible' : ''}`}>
              [ INTEL & LOGISTICS ]
            </p>
            <h2 className="font-condensed text-6xl md:text-8xl font-black uppercase leading-[0.85]">
              <span className="section-header">
                <span className={`section-header-text ${faqVisible ? 'visible' : ''}`}>
                  FREQUENTLY ASKED
                </span>
              </span>
            </h2>
          </div>

          <div className={`grid grid-cols-1 border-t-2 border-black scroll-fade w-full ${faqVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
            {sections.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`group border-b-2 border-black transition-all duration-300 ${
                  activeFaq === idx ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'
                }`}
              >
                <button
                  className="w-full p-8 md:p-12 flex items-start gap-8 text-left"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className={`font-condensed text-4xl font-black transition-colors duration-300 ${activeFaq === idx ? 'text-[#39FF14]' : 'text-black/20 group-hover:text-white/40'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-center gap-6">
                      <h3 className="font-condensed text-2xl md:text-4xl font-black uppercase tracking-tight">
                        {faq.q}
                      </h3>
                      <div className={`flex-shrink-0 w-12 h-12 border-2 flex items-center justify-center transition-all duration-500 ${activeFaq === idx ? 'bg-[#39FF14] text-black border-[#39FF14] rotate-180' : 'bg-transparent text-black border-black group-hover:bg-white group-hover:text-black group-hover:border-white'}`}>
                        {activeFaq === idx ? <Minus size={24} /> : <Plus size={24} />}
                      </div>
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === idx ? 'max-h-[500px] opacity-100 mt-10' : 'max-h-0 opacity-0'}`}>
                      <div className="max-w-4xl">
                        <p className={`text-xl md:text-2xl font-light leading-relaxed transition-colors ${activeFaq === idx ? 'text-white/80' : 'text-zinc-600 group-hover:text-white/80'}`}>
                          {faq.a}
                        </p>
                        <div className="mt-10 flex items-center gap-4">
                          <div className="w-12 h-1 bg-[#39FF14]" />
                          <span className={`text-[10px] uppercase font-bold tracking-[0.3em] transition-colors ${activeFaq === idx ? 'text-white/40' : 'text-black/40 group-hover:text-white/40'}`}>Technical Documentation v1.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 border-2 border-black flex flex-col md:flex-row items-center justify-between gap-8 group transition-colors w-full">
            <div>
              <h4 className="font-condensed text-3xl md:text-5xl font-black uppercase mb-2">Ready to start rolling?</h4>
              <p className="text-zinc-500 uppercase text-sm font-bold tracking-widest">Connect with our fleet specialists for a custom campaign proposal.</p>
            </div>
            <MagneticButton strength={0.2}>
              <button className="bg-black text-white px-12 py-6 font-condensed font-bold text-2xl uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-all flex items-center gap-4">
                Contact Specialist <ArrowRight size={24} />
              </button>
            </MagneticButton>
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
            <h2 className="font-condensed text-7xl font-black uppercase leading-none tracking-tighter cursor-pointer hover:line-through transition-all">
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
              <MagneticButton strength={0.4}>
                <button className="bg-white text-black px-4 py-2 hover:bg-zinc-200 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </MagneticButton>
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
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation menu" className="fixed inset-0 z-[100] bg-white flex flex-col p-12">
          <div className="flex justify-between items-center mb-24">
            <div className="font-condensed text-3xl font-black">ADSYUG</div>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close navigation menu">
              <X size={40} aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col gap-8 font-condensed text-6xl font-black uppercase" role="navigation" aria-label="Mobile navigation">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#unique" onClick={() => setIsMenuOpen(false)}>
              Features
            </a>
            <a href="#rolling" onClick={() => setIsMenuOpen(false)}>
              Insights
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default App;
