"use client";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
        } else {
          setIsVisible(false);

          if (entry.boundingClientRect.top < 0) {
            setHasBeenVisible(false);
          }
        }
      },
      { threshold: 0.5, ...options }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [elementRef, isVisible || hasBeenVisible];
};

export default function Home() {
  const [section1Ref, section1Visible] = useIntersectionObserver();
  const [section2Ref, section2Visible] = useIntersectionObserver();
  const [section3Ref, section3Visible] = useIntersectionObserver();
  const [ctaSectionRef, ctaSectionVisible] = useIntersectionObserver({
    rootMargin: "0px 0px -100% 0px",
  });
  const [leChatSectionRef, leChatSectionVisible] = useIntersectionObserver();
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [hasScrolledPastLeChat, setHasScrolledPastLeChat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (leChatSectionRef.current && ctaSectionRef.current) {
        const leChatRect = leChatSectionRef.current.getBoundingClientRect();
        const ctaRect = ctaSectionRef.current.getBoundingClientRect();

        const triggerHeight = leChatRect.height * 0.05;
        const isPartiallyOutOfView = leChatRect.top < -triggerHeight;

        const ctaComingIntoView = ctaRect.top < window.innerHeight + 100;

        if (isPartiallyOutOfView && !ctaComingIntoView) {
          setShowFloatingChat(true);
        } else {
          setShowFloatingChat(false);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <Image
          alt="Hero background"
          className="absolute inset-0 w-full h-full bg-gradient-to-bl from-[#9F521A] via-[#D3812F] to-[#B35D20] object-cover backdrop-blur-2xl transition-opacity dark:opacity-75"
          sizes="100vw"
          src="https://cms.mistral.ai/assets/e022b58b-d71f-4a7f-a1a5-ba106052ad36"
          fill
          priority
          quality={75}
        />

        {/* Navigation */}
        <header className="relative z-10 w-full">
          <div className="container mx-auto flex items-center justify-between px-4 py-6">
            <Link href="/" className="flex items-center">
              <Image
                src="mistrallogo.svg"
                alt="Le Chat"
                width={40}
                height={40}
                className="h-10 w-10 filter invert"
              />
            </Link>

            <nav className="hidden items-center space-x-8 md:flex">
              <Link href="#" className="text-white hover:text-white/80">
                Products
              </Link>
              <Link href="#" className="text-white hover:text-white/80">
                Solutions
              </Link>
              <Link href="#" className="text-white hover:text-white/80">
                Research
              </Link>
              <Link href="#" className="text-white hover:text-white/80">
                Resources
              </Link>
              <Link href="#" className="text-white hover:text-white/80">
                Company
              </Link>

              <Link
                href="#"
                className="rounded-md bg-amber-100/20 px-4 py-2 text-white backdrop-blur-sm transition hover:bg-amber-100/30"
              >
                Try the API <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>

              <Link
                href="#"
                className="rounded-md bg-amber-100/20 px-4 py-2 text-white backdrop-blur-sm transition hover:bg-amber-100/30"
              >
                Talk to sales <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </nav>

            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="block text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              
              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-gradient-to-bl from-[#9F521A] via-[#D3812F] to-[#B35D20] p-4 shadow-lg z-50">
                  <div className="flex flex-col space-y-4">
                    <Link href="#" className="text-white hover:text-white/80">
                      Products
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      Solutions
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      Research
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      Resources
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      Company
                    </Link>
                    <Link
                      href="#"
                      className="rounded-md bg-amber-100/20 px-4 py-2 text-white backdrop-blur-sm transition hover:bg-amber-100/30 inline-block"
                    >
                      Try the API <ArrowRight className="ml-1 inline h-4 w-4" />
                    </Link>
                    <Link
                      href="#"
                      className="rounded-md bg-amber-100/20 px-4 py-2 text-white backdrop-blur-sm transition hover:bg-amber-100/30 inline-block"
                    >
                      Talk to sales <ArrowRight className="ml-1 inline h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl leading-tight">
            Frontier AI. In Your Hands.
          </h1>
          <p className="mb-8 text-lg sm:text-xl md:text-2xl">
            Configurable AI for all builders.
          </p>

          <div className="mx-auto mb-8 w-full max-w-xl px-4 sm:px-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Talk to le Chat"
                className="w-full rounded-md border border-white/20 bg-white px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-amber-600 p-2 text-white hover:bg-amber-700">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
            <Link
              href="#"
              className="flex items-center border-b border-white/40 pb-1 text-white hover:border-white"
            >
              Enterprise deployments <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="flex items-center border-b border-white/40 pb-1 text-white hover:border-white"
            >
              APIs on la Plateforme <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Le Chat Section */}
      <div className="flex justify-center mt-12">
        <div 
          ref={leChatSectionRef} 
          className="w-full max-w-[1000px] bg-[#fff4c4]"
        >
          <div className="relative h-auto py-2 md:h-32 md:py-0">
            <div className="flex flex-col md:flex-row md:items-center px-4 md:px-8 pt-4 md:pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 max-w-full md:max-w-[800px]">
                <div className="mx-auto md:mx-0 mb-4 md:mb-0 md:mr-4 h-20 w-20 md:h-24 md:w-24 relative">
                  <div className="absolute inset-0 flex flex-col">
                    <div className=" h-[20%] bg-[#ffd900]"></div>
                    <div className=" h-[20%] bg-[#ffaf01]"></div>
                    <div className=" h-[20%] bg-[#ff8204]"></div>
                    <div className=" h-[20%] bg-[#fa5111]"></div>
                    <div className=" h-[20%] bg-[#e10500]"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/M-beige.svg"
                      alt="Le Chat Logo"
                      width={80}
                      height={80}
                      className="relative z-10"
                    />
                  </div>
                </div>
                <h2 className="text-lg md:text-xl text-gray-800 text-center md:text-left md:mr-8">
                  Le Chat: Your AI assistant for life and work.
                </h2>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3 mt-4 md:mt-0">
                <Link
                  href="#"
                  className="block transition-opacity hover:opacity-80"
                  aria-label="Download on App Store"
                >
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on App Store"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
                <Link
                  href="#"
                  className="block transition-opacity hover:opacity-80"
                  aria-label="Get it on Google Play"
                >
                  <Image
                    src="/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
              </div>
            </div>

            <div className="absolute -bottom-4 right-4 hidden md:block">
              <Image
                src="/cat.gif"
                alt="Pixel Cat Animation"
                width={80}
                height={80}
                className="h-20 w-auto"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="flex justify-center mb-6 md:mt-24">
        <div className="w-full max-w-[1000px] relative overflow-hidden py-8 border-t border-amber-200/30 bg-amber-50">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-amber-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-amber-50 to-transparent z-10"></div>

          <div className="relative overflow-hidden">
            <div className="animate-scroll">
              <div className="flex shrink-0 items-center [&>*]:px-4 md:[&>*]:px-6">
                <Image
                  src="/axa.webp"
                  alt="AXA"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/belfius.webp"
                  alt="Belfius"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/bnpparibas.webp"
                  alt="BNP Paribas"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/brave.webp"
                  alt="Brave"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/cloudflare.webp"
                  alt="Cloudflare"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/cmacgm.webp"
                  alt="CMA CGM"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/harvey.webp"
                  alt="Harvey"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/huggingface.webp"
                  alt="Hugging Face"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
              </div>
              <div className="flex shrink-0 items-center [&>*]:px-4 md:[&>*]:px-6">
                <Image
                  src="/axa.webp"
                  alt="AXA"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/belfius.webp"
                  alt="Belfius"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/bnpparibas.webp"
                  alt="BNP Paribas"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/brave.webp"
                  alt="Brave"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/cloudflare.webp"
                  alt="Cloudflare"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/cmacgm.webp"
                  alt="CMA CGM"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/harvey.webp"
                  alt="Harvey"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
                <Image
                  src="/huggingface.webp"
                  alt="Hugging Face"
                  width={120}
                  height={40}
                  className="object-contain h-6 md:h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-[#fffaea] relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-64 bg-[#fff4c4]"></div>
          <div className="absolute top-0 left-[30%] w-24 h-24 bg-[#fff4c4] md:block hidden"></div>
          <div className="absolute top-[225px] left-[300px] w-32 h-32 bg-[#fff4c4] lg:block hidden"></div>
          <div className="absolute top-[450px] left-[100px] w-48 h-48 bg-[#fff4c4] md:block hidden"></div>
          
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative">
              <div className="h-auto md:h-[calc(40vh+1000px)]">
                <div className="md:sticky md:top-[32px] pt-16 md:pt-32 pb-12 md:pb-0">
                  <h2 className="text-4xl md:text-6xl leading-[0.9]">
                    Your AI future
                    <br />
                    belongs in
                    <br />
                    your hands.
                  </h2>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 py-8 md:py-32 space-y-16 md:space-y-32">
              <div>
                <h3 className="text-3xl md:text-4xl mb-6">
                  Customizable, from pre-training to the real world.
                </h3>
                <div className="flex gap-4 mb-4">
                  <div className="text-orange-500 mt-1 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="text-gray-800">
                    World class, benchmark-setting open models to customize,
                    distill, fine-tune, iterate, and build on.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl mb-6">Private and portable.</h3>
                <div className="flex gap-4 mb-4">
                  <div className="text-orange-500 mt-1 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="text-gray-800">
                    A comprehensive, enterprise-grade AI platform that can be
                    deployed anywhere—on-premises, cloud, edge, devices, data
                    centers, and more.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl mb-6">Transparent and trustworthy.</h3>
                <div className="flex gap-4 mb-4">
                  <div className="text-orange-500 mt-1 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="text-gray-800">
                    Strongest global contributor to open source AI and AI
                    policy. Mistral AI is the world's greenest and leading
                    independent AI lab.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl mb-6">
                  Deeply engaged solutioning and value delivery.
                </h3>
                <div className="flex gap-4 mb-4">
                  <div className="text-orange-500 mt-1 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="text-gray-800">
                    Hands-on assistance from the world's best AI engineers and
                    scientists across deployment, solutioning, safety, and
                    beyond.
                  </p>
                </div>
              </div>

              <div className="pb-0">
                <h3 className="text-3xl md:text-4xl mb-6">Delightful interfaces.</h3>
                <div className="flex gap-4 mb-4">
                  <div className="text-orange-500 mt-1 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="text-gray-800">
                    Bringing frontier intelligence to life with intuitive user
                    experiences across life and work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-opacity duration-500 ${
            showFloatingChat ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-lg shadow-xl px-6 py-4 flex items-center gap-4 border border-amber-200 max-w-[95vw] mx-auto">
            <input
              type="text"
              placeholder="Talk to Le Chat"
              className="bg-transparent text-gray-800 placeholder-gray-500 outline-none w-full min-w-0 md:min-w-[500px]"
            />
            <button className="bg-orange-500 p-2 rounded-md flex-shrink-0">
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* One Platform Section */}
      <section className="bg-amber-50/80 py-8 md:py-16 border-t border-amber-100">
        <div className="relative overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <div className="animate-scroll">
              <div className="flex shrink-0 items-center [&>*]:px-6 md:[&>*]:px-12">
                <Image
                  src="/mistrallogo.svg"
                  alt="Mistral AI"
                  width={56}
                  height={40}
                  className="h-8 md:h-12 w-auto"
                  priority
                />
                <h2 className="text-3xl md:text-6xl text-gray-800">
                  One platform. Many uses. For all humans.
                </h2>
              </div>
              <div className="flex shrink-0 items-center [&>*]:px-6 md:[&>*]:px-12">
                <Image
                  src="/mistrallogo.svg"
                  alt="Mistral AI"
                  width={56}
                  height={40}
                  className="h-8 md:h-12 w-auto"
                  priority
                />
                <h2 className="text-3xl md:text-6xl text-gray-800">
                  One platform. Many uses. For all humans.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Work Done Section */}
      <div className="w-full bg-amber-50/80 relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(#ffefc2 1px, transparent 1px), linear-gradient(90deg, #ffefc2 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="flex justify-center relative z-10">
          <div className="w-full max-w-[1000px] relative py-16 md:py-32">
            <div
              ref={section1Ref}
              className={`px-4 relative transition-all duration-1000 ${
                section1Visible
                  ? "opacity-100 scale-100"
                  : "opacity-50 scale-90"
              }`}
            >
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="max-w-full md:max-w-[400px]">
                  <h2 className="text-3xl md:text-5xl mb-6">Get work done.</h2>
                  <p className="text-lg md:text-xl mb-8 max-w-full md:max-w-[250px]">
                    Your personalized multilingual AI assistant, with web
                    search, uploads, and data connectors.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center bg-gray-900 text-white px-6 py-3 mt-7"
                  >
                    Discover le Chat{" "}
                    <ArrowRight className="ml-2 h-4 w-4 text-orange-500" />
                  </Link>
                </div>
                <div>
                  <Image
                    src="/getworkdoneimage.png"
                    alt="Le Chat interface showing a Gantt chart"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Faster Section */}
      <div className="w-full bg-amber-50/80 border-t border-amber-100 relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(#ffefc2 1px, transparent 1px), linear-gradient(90deg, #ffefc2 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="flex justify-center relative z-10">
          <div className="w-full max-w-[1000px] relative py-16 md:py-32">
            <div
              ref={section2Ref}
              className={`px-4 relative transition-all duration-1000 ${
                section2Visible
                  ? "opacity-100 scale-100"
                  : "opacity-50 scale-90"
              }`}
            >
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl md:text-5xl mb-6">Code faster.</h2>
                  <p className="text-lg md:text-xl mb-8 max-w-full md:max-w-[250px]">
                    Build faster with coding assistance across 80+ languages.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center bg-gray-900 text-white px-6 py-3 mt-7"
                  >
                    Code with le Chat{" "}
                    <ArrowRight className="ml-2 h-4 w-4 text-orange-500" />
                  </Link>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/codefasterimage.png"
                    alt="Code editor interface"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Build AI-powered Apps Section */}
      <div className="w-full bg-amber-50/80 border-t border-amber-100 relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(#ffefc2 1px, transparent 1px), linear-gradient(90deg, #ffefc2 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="flex justify-center relative z-10">
          <div className="w-full max-w-[1000px] relative py-16 md:py-32">
            <div
              ref={section3Ref}
              className={`px-4 relative transition-all duration-1000 ${
                section3Visible
                  ? "opacity-100 scale-100"
                  : "opacity-50 scale-90"
              }`}
            >
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl mb-6">Build AI-powered apps.</h2>
                  <p className="text-lg md:text-xl mb-8 max-w-full md:max-w-[250px]">
                    Build and deploy custom AI solutions with frontier models.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center bg-gray-900 text-white px-6 py-3 mt-7"
                  >
                    Discover la Plateforme{" "}
                    <ArrowRight className="ml-2 h-4 w-4 text-orange-500" />
                  </Link>
                </div>
                <div>
                  <Image
                    src="/buildaipoweredappsimage.png"
                    alt="React code for a Todo app"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <section className="bg-[#fff4c4] py-12 md:py-16 mb-8 md:mb-16 mt-6 md:mt-10">
        <div className="container mx-auto px-4 max-w-[1000px]">
          <div className="text-sm text-gray-600 mb-6 md:mb-8">Announcements</div>
          <div>
            <h2 className="text-3xl md:text-4xl max-w-full md:max-w-[600px] leading-tight">
              Announcing the all new le Chat:
              <br className="hidden md:block" />
              Your AI assistant for life and
              <br className="hidden md:block" />
              <div className="flex items-center">
                <span className="inline-flex items-center">
                  work.
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center bg-orange-500 text-white p-2 rounded-md w-8 h-8 ml-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </span>
              </div>
            </h2>
            <div className="mt-8 flex justify-end">
              <span className="text-sm text-gray-600">Feb 6, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Banner Section */}
      <section className="relative">
        <Image
          alt="Team working in office"
          className="w-full h-[300px] md:h-[500px] object-cover brightness-[0.85]"
          src="/futureofai.png"
          width={2000}
          height={500}
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-12">
          <div className="container mx-auto px-4 max-w-[1000px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="max-w-full md:max-w-[430px] mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl text-white mb-3 pb-4">
                  Build the future of secure, private AI.
                </h2>
                <p className="text-base md:text-l text-white/90 max-w-full md:max-w-[350px]">
                  Now seeking: Insatiably curious AI enthusiasts with an
                  entrepreneurial spirit.
                </p>
              </div>
              <Link
                href="#"
                className="inline-flex items-center text-white hover:text-white/90"
              >
                <span className="border-b border-white pb-1">
                  View open roles
                </span>
                <ArrowRight className="ml-2 h-4 w-4 text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-50 py-12 md:py-16 text-center" ref={ctaSectionRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl mb-8 md:mb-12">The next chapter of AI is yours.</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mb-8 md:mb-16">
            <Link
              href="#"
              className="flex items-center justify-center md:justify-start border-b border-gray-800 pb-1 text-gray-800 hover:border-gray-600"
            >
              Start building with Mistral AI{" "}
              <ArrowRight className="ml-2 h-4 w-4 text-orange-500" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center md:justify-start border-b border-gray-800 pb-1 text-gray-800 hover:border-gray-600 mt-4 md:mt-0"
            >
              Talk to an expert{" "}
              <ArrowRight className="ml-2 h-4 w-4 text-orange-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Color Stripes */}
      <div className="h-32 md:h-64 grid grid-rows-6 relative">
        <div className="bg-[#ffefc2]"></div>
        <div className="bg-[#ffd900] relative">
          <Image
            src="/cat.gif"
            alt="Pixel Cat Animation"
            width={200}
            height={200}
            className="h-24 md:h-48 w-auto absolute -top-16 md:-top-32 left-1/2 -translate-x-1/2 z-10"
            unoptimized
          />
        </div>
        <div className="bg-[#ffaf01]"></div>
        <div className="bg-[#ff8204]"></div>
        <div className="bg-[#fa5111]"></div>
        <div className="bg-[#e10500]"></div>
      </div>

      {/* Footer */}
      <footer className="bg-[#ffefc2] py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16">
            <div className="md:col-span-1">
              <Link href="/" className="block mb-6">
                <Image
                  src="/mistrallogo.svg"
                  alt="Mistral AI"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </Link>
              <div className="flex gap-2 mb-8">
                <Link href="#" className="block">
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on App Store"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    style={{ width: '120px', height: 'auto' }}
                  />
                </Link>
                <Link href="#" className="block">
                  <Image
                    src="/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    style={{ width: '120px', height: 'auto' }}
                  />
                </Link>
              </div>
              <p className="text-gray-600">Mistral AI © 2025</p>
            </div>

            <div className="md:pl-8">
              <h3 className="text-orange-500 font-medium mb-4">Why Mistral</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Our customers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Contact us
                  </Link>
                </li>
              </ul>
              <div className="mt-6">
                <button className="flex items-center border border-gray-300 rounded px-3 py-1">
                  EN{" "}
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="md:pl-8">
              <h3 className="text-orange-500 font-medium mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    AI solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:pl-8">
              <h3 className="text-orange-500 font-medium mb-4">Build</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    La Plateforme
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Le Chat
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Try the API
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:pl-8">
              <h3 className="text-orange-500 font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Data processing agreement
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    Legal notice
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-4 mb-6 md:mb-0 md:ml-auto">
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                <Image
                  src="/discord.svg"
                  alt="Discord"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
