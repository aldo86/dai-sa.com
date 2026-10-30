"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Pause, Play } from "lucide-react";
import type { Locale } from "../lib/content";
import { copy } from "../content/copy";

type Slide = { id: string; title: string; url: string; src: string; alt: string };

export function HeroCarousel({ slides, locale }: { slides: Slide[]; locale: Locale }) {
  const text = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  const [autoplay] = useState(() => Autoplay({ delay: 6500, playOnInit: false, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }));
  const [fade] = useState(() => Fade());
  const [viewport, api] = useEmblaCarousel({ loop: slides.length > 1, duration: 35 }, [fade, autoplay]);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const manuallyPaused = useRef(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!api) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const select = () => setSelected(api.selectedScrollSnap());
    const play = () => {
      if (preference.matches || manuallyPaused.current) { autoplay.stop(); return; }
      setPlaying(true);
    };
    const stop = () => setPlaying(false);
    const applyPreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches || manuallyPaused.current || slides.length < 2) autoplay.stop();
      else autoplay.play();
    };
    api.on("select", select).on("autoplay:play", play).on("autoplay:stop", stop);
    preference.addEventListener("change", applyPreference);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) autoplay.stop();
      else applyPreference();
    }, { threshold: 0.3 });
    if (root.current) observer.observe(root.current);
    applyPreference();
    return () => {
      api.off("select", select).off("autoplay:play", play).off("autoplay:stop", stop);
      preference.removeEventListener("change", applyPreference);
      observer.disconnect();
      autoplay.stop();
    };
  }, [api, autoplay, slides.length]);

  function choose(index: number) {
    manuallyPaused.current = true;
    setPaused(true);
    autoplay.stop();
    api?.scrollTo(index, reducedMotion);
  }

  return <section ref={root} className="hero hero-carousel" aria-label={text.sliderName} aria-roledescription="carousel" data-playing={playing}>
    <div className="hero-viewport" ref={viewport}>
      <div className="hero-track">
        {slides.map((slide, index) => <div className="hero-slide" key={slide.id} data-active={index === selected} aria-hidden={index !== selected} inert={index !== selected} role="group" aria-roledescription={text.slide} aria-label={`${index + 1} / ${slides.length}: ${slide.title}`}>
          <div className="hero-slide-image"><Image src={slide.src} alt={slide.alt} fill sizes="106vw" quality={90} priority={index === 0} loading={index === 0 ? undefined : "eager"} className="image-cover" /></div>
        </div>)}
      </div>
    </div>
    <div className="container hero-content">
      <p className="hero-origin"><span />{text.since}</p>
      <h1>DAISA</h1>
      <p className="hero-description">{text.engineering}</p>
      <p className="hero-intro">{text.intro}</p>
      <div className="hero-actions"><Link className="button" href={`${prefix}/contact`}>{text.discuss}<ArrowUpRight size={20} /></Link><Link className="hero-secondary" href={`${prefix}/services`}>{text.explore}<ArrowUpRight size={18} /></Link></div>
    </div>
    <div className="container hero-bottom">
      <div className="hero-location"><MapPin size={16} aria-hidden="true" />{text.location}</div>
      {slides[selected] && <Link className="slide-caption" href={slides[selected].url} key={slides[selected].id}><span>{slides[selected].title}</span><ArrowUpRight size={22} aria-hidden="true" /></Link>}
      {slides.length > 1 && <div className="carousel-controls">
        <div className="slide-dots" role="group" aria-label={text.chooseSlide}>{slides.map((slide, index) => <button key={slide.id} type="button" className="slide-dot" disabled={!api} aria-label={`${text.showSlide}: ${slide.title}`} title={slide.title} aria-current={index === selected ? "true" : undefined} onClick={() => choose(index)}><span /></button>)}</div>
        <span className="slide-counter" aria-live={playing ? "off" : "polite"}>{String(selected + 1).padStart(2, "0")}<span> / {String(slides.length).padStart(2, "0")}</span></span>
        <button className="carousel-button" type="button" disabled={!api} aria-label={text.previousSlide} title={text.previousSlide} onClick={() => choose((selected - 1 + slides.length) % slides.length)}><ChevronLeft size={21} /></button>
        <button className="carousel-button" type="button" disabled={!api} aria-label={text.nextSlide} title={text.nextSlide} onClick={() => choose((selected + 1) % slides.length)}><ChevronRight size={21} /></button>
        <button className="carousel-button" type="button" disabled={reducedMotion || !api} aria-label={paused ? text.playSlides : text.pauseSlides} title={reducedMotion ? text.reducedMotion : paused ? text.playSlides : text.pauseSlides} onClick={() => {
          manuallyPaused.current = !paused;
          setPaused(!paused);
          if (!paused) autoplay.stop(); else autoplay.play();
        }}>{paused || reducedMotion ? <Play size={17} /> : <Pause size={17} />}</button>
      </div>}
    </div>
    <div className="hero-progress" aria-hidden="true"><span key={selected} style={{ animationPlayState: playing ? "running" : "paused" }} /></div>
    <a className="hero-scroll" href="#capabilities" aria-label={text.explore} title={text.explore}><ArrowDown size={18} /></a>
  </section>;
}