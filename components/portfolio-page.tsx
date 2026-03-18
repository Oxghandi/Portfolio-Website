'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Link2, Linkedin, Twitter, MapPin } from 'lucide-react';
import type { Project } from '@/lib/types';
import { ProjectCard } from '@/components/project-card';

const skills = [
  'Community Moderation',
  'Community Growth Strategy',
  'Social Media Marketing',
  'Content Strategy',
  'Narrative Positioning',
  'Early-Stage Ecosystem Building',
  'RWA Research & Advocacy'
];

const timeline = [
  {
    year: '2021',
    text: 'Entered crypto as a student with no capital, using content creation to earn visibility and credibility.'
  },
  {
    year: '2022',
    text: 'Expanded into moderator and support roles across communities, learning retention, trust, and conflict handling.'
  },
  {
    year: '2023',
    text: 'Supported 10+ projects across social growth, narrative development, and operational community leadership.'
  },
  {
    year: '2024',
    text: 'Committed to RWA narratives, joined Plume Network early, became an ambassador, grew the regional account from 0 to 4k+, and moved into Plume Africa marketing.'
  }
];

const experience = [
  {
    title: 'Social Media Manager',
    org: 'RealtyX DAO',
    bullets: [
      'Built structured posting systems that improved message consistency across campaigns.',
      'Translated technical updates into audience-ready social narratives for stronger trust.'
    ]
  },
  {
    title: 'Ambassador & Regional Lead',
    org: 'Plume Network',
    bullets: [
      'Scaled the regional X presence from zero to 4,000+ followers through local-first narrative execution.',
      'Coordinated education and awareness efforts around tokenized real-world asset infrastructure.'
    ]
  },
  {
    title: 'Community Moderator',
    org: 'Multiple Web3 Projects',
    bullets: [
      'Managed high-volume community channels while preserving response quality and operational clarity.',
      'Resolved incidents early by combining moderation discipline with calm public communication.'
    ]
  },
  {
    title: 'Community Support Specialist',
    org: 'Beoble',
    bullets: [
      'Delivered multi-timezone support workflows that reduced user friction in onboarding and product usage.',
      'Maintained an operator-level feedback loop between users and internal teams.'
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

export function PortfolioPage({ projects }: { projects: Project[] }) {
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'What I Do', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const visibleProjects = projects.filter(
    (project) => project.id !== 'others' && project.name.trim().toLowerCase() !== 'others'
  );

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const encodedBody = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        encodedBody.append(key, value);
      }
    }
    const body = encodedBody.toString();

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      form.reset();
      setContactStatus('success');
    } catch {
      setContactStatus('error');
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
      <header className="glass sticky top-4 z-20 mb-8 rounded-2xl px-4 py-3 backdrop-blur-xl md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="#" className="inline-flex items-center gap-3 text-lg font-extrabold tracking-[0.16em] text-cream md:text-xl">
            <span className="relative h-9 w-9 overflow-hidden rounded-full border border-accent/40 bg-bg/60">
              <Image
                src="/logo.jpg"
                alt="Gen. Paul logo"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </span>
            <span>GEN. PAUL</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-[0.14em] text-cream/85 md:text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 transition hover:bg-cream/10 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://medium.com/@gen.paul"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-accent/45 px-3 py-1.5 text-accent transition hover:bg-accent/15"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass relative overflow-hidden rounded-3xl p-8 md:p-14"
      >
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-accent/95">GEN. PAUL · 0xGHANDI</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-cream md:text-6xl">
          Building Narratives & Communities in Web3
        </h1>
        <p className="mt-5 max-w-2xl text-sm uppercase tracking-[0.22em] text-cream/70 md:text-base">
          Moderator. Marketer. Social Media Strategist. RWA-Focused Ecosystem Builder.
        </p>
        <p className="section-copy mt-6 max-w-3xl">
          Gen. Paul is a crypto ecosystem operator active since 2021. From starting as a broke student with no capital,
          he evolved from content creation into ambassador roles, community leadership, and regional marketing. Today,
          he specializes in early-stage ecosystem growth and Real World Asset narratives.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#projects" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg shadow-glow transition hover:bg-accent/90">
            View My Work
          </Link>
          <Link href="#contact" className="rounded-full border border-cream/20 px-5 py-2 text-sm font-semibold text-cream transition hover:border-accent/40 hover:text-accent">
            Contact Me
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="https://x.com/0xghandi" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5 text-cream/85 hover:border-accent/35 hover:text-accent" target="_blank" rel="noreferrer"><Twitter className="h-4 w-4" />X</Link>
          <Link href="https://www.linkedin.com/in/oxghandi/" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5 text-cream/85 hover:border-accent/35 hover:text-accent" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" />LinkedIn</Link>
          <Link href="mailto:oxghandi@icloud.com" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5 text-cream/85 hover:border-accent/35 hover:text-accent"><Mail className="h-4 w-4" />Email</Link>
          <Link href="https://linktr.ee/oxghandi" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5 text-cream/85 hover:border-accent/35 hover:text-accent" target="_blank" rel="noreferrer"><Link2 className="h-4 w-4" />LinkTree</Link>
        </div>
      </motion.section>

      <motion.section id="about" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-20">
        <motion.h2 variants={item} className="section-title">My Journey</motion.h2>
        <div className="mt-8 space-y-5 border-l border-cream/15 pl-6">
          {timeline.map((entry) => (
            <motion.div key={entry.year} variants={item} className="relative">
              <span className="absolute -left-[2.02rem] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent/80" />
              <p className="text-xs uppercase tracking-[0.24em] text-accent/85">{entry.year}</p>
              <p className="section-copy mt-2">{entry.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.p variants={item} className="section-copy mt-6">Worked with 10+ crypto projects across community, marketing, and ecosystem strategy roles.</motion.p>
      </motion.section>

      <motion.section id="skills" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-20">
        <motion.h2 variants={item} className="section-title">What I Do</motion.h2>
        <motion.div variants={item} className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill} className="glass rounded-2xl p-4 text-sm tracking-wide text-cream/88 transition hover:-translate-y-1 hover:border-accent/30 hover:text-cream">
              {skill}
            </div>
          ))}
        </motion.div>
      </motion.section>

      <section id="projects" className="mt-20">
        <h2 className="section-title">Projects & Ecosystems</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section id="experience" className="mt-20">
        <h2 className="section-title">Experience</h2>
        <div className="mt-7 space-y-4">
          {experience.map((entry) => (
            <article key={entry.title} className="glass rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-cream">{entry.title} <span className="text-cream/70">– {entry.org}</span></h3>
              <ul className="mt-3 space-y-2 text-sm text-cream/80">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="vision" className="mt-20">
        <h2 className="section-title">Why RWA</h2>
        <p className="glass section-copy mt-7 rounded-2xl p-6 md:p-8">
          Real World Assets represent discipline in a noisy market. The work is not about chasing trend velocity. It is
          about building infrastructure that allows value in the physical world to be represented, accessed, and trusted
          on-chain. The long arc is clear: serious ecosystems are built by operators who prioritize systems, education,
          and durable adoption over memecoin speculation.
        </p>
      </section>

      <section id="contact" className="mt-20">
        <h2 className="section-title">Contact</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleContactSubmit}
            className="glass rounded-2xl p-5"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="subject" value="New portfolio message from oxghandi.netlify.app" />
            <p className="hidden">
              <label>
                Do not fill this out if you are human: <input name="bot-field" />
              </label>
            </p>
            <label className="mb-3 block text-sm text-cream/80">Name
              <input name="name" required className="mt-2 w-full rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none transition focus:border-accent/45" />
            </label>
            <label className="mb-3 block text-sm text-cream/80">Email
              <input type="email" name="email" required className="mt-2 w-full rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none transition focus:border-accent/45" />
            </label>
            <label className="block text-sm text-cream/80">Message
              <textarea name="message" required rows={4} className="mt-2 w-full rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none transition focus:border-accent/45" />
            </label>
            <button
              type="submit"
              disabled={contactStatus === 'sending'}
              className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg shadow-glow transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {contactStatus === 'success' && (
              <p className="mt-3 text-sm text-accent">Message sent successfully.</p>
            )}
            {contactStatus === 'error' && (
              <p className="mt-3 text-sm text-red-300">Unable to send right now. Please email directly.</p>
            )}
          </form>

          <div className="glass rounded-2xl p-6 text-sm text-cream/82">
            <p className="text-xs uppercase tracking-[0.24em] text-accent/85">Direct Details</p>
            <p className="mt-5 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Lagos, Nigeria</p>
            <p className="mt-2 flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> oxghandi@icloud.com</p>
            <p className="section-copy mt-6">
              Open to collaborations focused on ecosystem operations, community-led growth, and RWA narrative strategy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
