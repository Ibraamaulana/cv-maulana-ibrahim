import { useEffect, useState, type ReactNode } from "react"

const navItems = [
  ["Tentang", "tentang"],
  ["Pendidikan", "pendidikan"],
  ["Keterampilan", "keterampilan"],
  ["Prestasi", "prestasi"],
  ["Sertifikat", "sertifikat"],
  ["Kontak", "kontak"],
]

const hardSkills = ["Java", "Python", "SQL", "MySQL", "Oracle", "Linux Basics"]
const softSkills = [
  "Pemecahan Masalah",
  "Berpikir Analitis & Logis",
  "Belajar Mandiri",
  "Etika Digital & Keamanan Informasi",
]

const certificates = [
  {
    number: "01",
    title: "Coding & Programming Stage 2",
    detail: "Design Thinking & Basic Python",
    issuer: "Samsung Innovation Campus Batch 3",
    year: "2022",
    score: "nilai A- (79,6)",
  },
  {
    number: "02",
    title: "Partisipasi Culminating Event SIC Batch 3",
    detail: "",
    issuer: "Samsung Indonesia & Skilvul",
    year: "2022",
    score: "",
  },
  {
    number: "03",
    title: "Foreign Languages for Specific Purposes (FLSP)",
    detail: "",
    issuer: "Language Center UMM",
    year: "2026",
    score: "",
  },
]

type IconName = "arrow" | "award" | "certificate" | "chevron" | "code" | "download" | "email" | "location" | "menu" | "moon" | "phone" | "spark" | "sun" | "x"

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12 7 22l5-3 5 3-1.5-10" />
      </>
    ),
    certificate: (
      <>
        <path d="M6 3h12v12H6z" />
        <path d="m9 21 3-2 3 2v-6H9zM9 7h6M9 11h4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    code: (
      <>
        <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5M5 21h14" />
      </>
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />,
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 12.8 12.8 0 0 0 2.8.7A2 2 0 0 1 22 16.9Z" />
    ),
    spark: (
      <>
        <path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z" />
        <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    x: <path d="M6 6l12 12M18 6 6 18" />,
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="section-heading reveal">
      <div className="eyebrow">
        <span />
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)
        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id)
      },
      { rootMargin: "-20% 0px -65% 0px" },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="portfolio-shell min-h-screen overflow-x-hidden bg-[#0b0d0f] text-[#f2f3f4]"
      data-theme={darkMode ? "dark" : "light"}
    >
      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#0b0d0f]/85 backdrop-blur-xl">
        <nav className="site-nav mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#beranda"
            className="brand-link group flex items-center gap-3"
            aria-label="Kembali ke beranda"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#5B7C99] text-sm font-bold text-white transition-transform group-hover:rotate-6">
              MI
            </span>
            <span className="text-sm font-semibold tracking-[-0.01em] text-white">
              Maulana Ibrahim
            </span>
          </a>
          <div className="site-nav-links" aria-label="Navigasi utama">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="nav-link"
                aria-current={activeSection === id ? "page" : undefined}
                onClick={() => {
                  setActiveSection(id)
                  setMenuOpen(false)
                }}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
              aria-pressed={darkMode}
            >
              <Icon name={darkMode ? "sun" : "moon"} />
            </button>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Icon name={menuOpen ? "x" : "menu"} />
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div id="mobile-navigation" className="mobile-navigation">
            <div className="mobile-navigation-list">
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => {
                    setActiveSection(id)
                    setMenuOpen(false)
                  }}
                  className="nav-link"
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="beranda"
          className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
        >
          <div className="hero-glow" />
          <div className="hero-grid" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
              <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#5B7C99]/35 bg-[#5B7C99]/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9bb2c5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7fa0bc] shadow-[0_0_10px_#5B7C99]" />
                Terbuka untuk kesempatan magang
              </div>
              <h1 className="fade-up-delay text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.91] tracking-[-0.065em] text-white">
                Maulana
                <br />
                <span className="text-[#89939b]">Ibrahim.</span>
              </h1>
              <p className="fade-up-delay-2 mt-7 text-lg font-medium text-[#d7dadd] sm:text-xl">
                Calon Magang{" "}
                <span className="text-[#86a3bc]">Data Specialist</span>
              </p>
              <p className="fade-up-delay-2 mx-auto mt-3 max-w-xl text-sm leading-7 text-[#8d949a] sm:text-base lg:mx-0">
                Mahasiswa Informatika UMM yang tertarik pada pengolahan dan
                analisis data.
              </p>
              <div className="fade-up-delay-3 mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <a href="#kontak" className="button-primary">
                  Hubungi Saya
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
               <a
  href="https://drive.google.com/uc?export=download&id=1vg1NzMUYDNerl3p0nj1B6A00vib6fofZ"
  target="_blank"
  rel="noreferrer"
  className="button-secondary"
>
                  <Icon name="download" className="h-4 w-4" />
                  Unduh CV
                </a>
              </div>
            </div>
            <div className="relative z-10 order-1 mx-auto w-full max-w-[380px] lg:order-2 lg:max-w-[480px]">
              <div className="portrait-ring fade-in">
                <div className="portrait-frame">
                  <img
                    src="/maulana-ibrahim.jpg"
                    alt="Potret Maulana Ibrahim"
                    className="h-full w-full object-cover object-[50%_34%] grayscale"
                  />
                </div>
                <div className="absolute bottom-[7%] right-[-3%] rounded-2xl border border-white/10 bg-[#121619]/90 px-4 py-3 shadow-2xl backdrop-blur-md sm:right-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#727b82]">
                    Fokus
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Data & Analitik
                  </p>
                </div>
                <span className="absolute left-3 top-[16%] h-3 w-3 rounded-full border-2 border-[#7393ae] bg-[#0b0d0f]" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="tentang"
          className="section-shell border-t border-white/[0.06]"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <SectionHeading
              eyebrow="01 / Tentang"
              title="Membangun insight dari data."
            />
            <div className="reveal lg:pt-9">
              <p className="max-w-3xl text-2xl font-medium leading-[1.55] tracking-[-0.025em] text-[#d8dcdf] sm:text-3xl">
                Mahasiswa Informatika UMM dengan minat kuat pada pengolahan dan
                analisis data.
                <span className="text-[#757d83]">
                  {" "}
                  Analitis, cepat belajar, siap berkontribusi sebagai Data
                  Specialist magang.
                </span>
              </p>
              <div className="mt-10 flex items-center gap-4 border-t border-white/[0.08] pt-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#5B7C99]/15 text-[#91abc0]">
                  <Icon name="spark" />
                </span>
                <p className="text-sm leading-6 text-[#858d93]">
                  Berorientasi pada ketelitian, pola,
                  <br className="hidden sm:block" /> dan pemecahan masalah
                  terstruktur.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pendidikan" className="section-shell bg-[#0e1113]">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="02 / Pendidikan"
              title="Perjalanan akademik."
              description="Fondasi teknologi dan pengalaman yang membentuk cara berpikir saya."
            />
            <div className="timeline mt-14 md:mt-20">
              <article className="timeline-item reveal">
                <div className="timeline-year">2024 — Sekarang</div>
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <p className="card-kicker">Pendidikan Tinggi</p>
                  <h3>Universitas Muhammadiyah Malang (UMM)</h3>
                  <p>S1 Informatika</p>
                </div>
              </article>
              <article className="timeline-item reveal">
                <div className="timeline-year">2021 — 2023</div>
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <p className="card-kicker">Pendidikan Menengah</p>
                  <h3>MAN 2 Kota Probolinggo</h3>
                  <p>Robotik</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="keterampilan" className="section-shell">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="03 / Keterampilan"
              title="Perangkat untuk bertumbuh."
              description="Kombinasi kemampuan teknis dan pola pikir yang mendukung pekerjaan berbasis data."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
              <article className="skill-card reveal">
                <div className="card-icon">
                  <Icon name="code" />
                </div>
                <p className="card-kicker">Teknis</p>
                <h3>Hard Skills</h3>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {hardSkills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
              <article className="skill-card reveal">
                <div className="card-icon">
                  <Icon name="spark" />
                </div>
                <p className="card-kicker">Interpersonal</p>
                <h3>Soft Skills</h3>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {softSkills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="prestasi" className="section-shell bg-[#0e1113]">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="04 / Prestasi"
              title="Pencapaian terpilih."
            />
            <article className="achievement-card reveal mt-14">
              <div className="achievement-number">III</div>
              <div className="relative z-10">
                <div className="card-icon mb-8">
                  <Icon name="award" />
                </div>
                <p className="card-kicker">Kompetisi Sains Madrasah · 2022</p>
                <h3>Juara Harapan III Fisika Terintegrasi</h3>
                <p className="mt-4 text-sm leading-7 text-[#889198] sm:text-base">
                  KSM Tingkat Kabupaten/Kota, Kementerian Agama RI, 2022.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="sertifikat" className="section-shell">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="05 / Sertifikat"
              title="Terus belajar, terus berkembang."
              description="Pembelajaran tambahan untuk memperluas kemampuan teknis dan komunikasi."
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {certificates.map((item) => (
                <article key={item.number} className="certificate-card reveal">
                  <div className="flex items-start justify-between">
                    <div className="card-icon">
                      <Icon name="certificate" />
                    </div>
                    <span className="font-mono text-xs text-[#50585e]">
                      {item.number}
                    </span>
                  </div>
                  <div className="mt-8">
                    <p className="card-kicker">{item.year}</p>
                    <h3>{item.title}</h3>
                    {item.detail && (
                      <p className="mt-2 text-sm text-[#8f979d]">
                        {item.detail}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto border-t border-white/[0.07] pt-5">
                    <p className="text-sm leading-6 text-[#747d84]">
                      {item.issuer}
                    </p>
                    {item.score && (
                      <p className="mt-1 text-sm font-medium text-[#91abc0]">
                        {item.score}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="kontak"
          className="section-shell border-t border-white/[0.06]"
        >
          <div className="mx-auto max-w-6xl">
            <div className="contact-panel reveal">
              <div className="relative z-10">
                <div className="eyebrow">
                  <span />
                  06 / Kontak
                </div>
                <h2>Mari terhubung.</h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-[#c4c9cd] sm:text-base">
                  Terbuka untuk kesempatan magang Data Specialist dan percakapan
                  seputar data serta teknologi.
                </p>
              </div>
              <div className="relative z-10 grid gap-3">
                <div className="contact-link cursor-default">
                  <span>
                    <Icon name="location" />
                  </span>
                  <div>
                    <small>Lokasi</small>Kota Probolinggo
                  </div>
                </div>
                <a
                  href="https://wa.me/6282257793676"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <span>
                    <Icon name="phone" />
                  </span>
                  <div>
                    <small>WhatsApp</small>082257793676
                  </div>
                  <Icon
                    name="arrow"
                    className="ml-auto h-4 w-4 text-[#5B7C99]"
                  />
                </a>
                <a href="mailto:mi7908368@gmail.com" className="contact-link">
                  <span>
                    <Icon name="email" />
                  </span>
                  <div>
                    <small>Email</small>mi7908368@gmail.com
                  </div>
                  <Icon
                    name="arrow"
                    className="ml-auto h-4 w-4 text-[#5B7C99]"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[#9aa2a8]">
            © {new Date().getFullYear()} Maulana Ibrahim. Dibuat dengan teliti.
          </p>
          <a
            href="#beranda"
            className="flex items-center gap-2 text-xs font-medium text-[#c4c9cd] hover:text-white"
          >
            Kembali ke atas
            <span className="grid h-7 w-7 -rotate-90 place-items-center rounded-full border border-white/10">
              <Icon name="chevron" className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </footer>
    </div>
  )
}
