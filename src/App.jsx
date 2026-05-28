import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';

const packages = [
  {
    name: 'Mini',
    price: '600–1000 zł',
    tag: 'Najprostszy start',
    description: 'Szybka strona startowa dla osoby lub małej firmy, która chce mieć profesjonalną obecność online bez rozbudowanych funkcji.',
    features: [
      'Prosta strona one-page',
      'Do 3 sekcji',
      'Gotowy układ premium',
      'Responsywność mobile / desktop',
      'Przycisk kontaktu lub prosty formularz',
      'Publikacja online',
      '1 mała poprawka',
    ],
    notIncluded: ['CMS', 'Custom design', 'Copywriting', 'Blog', 'Zaawansowane SEO'],
  },
  {
    name: 'Starter',
    price: '1200–2200 zł',
    tag: 'Dla prostych startów',
    description: 'Estetyczny landing page dla usługi, freelancera lub lokalnej firmy. Dobry wybór na start działań sprzedażowych.',
    features: [
      'Landing page / one-page',
      'Do 5 sekcji na stronie',
      'Indywidualne dopasowanie kolorów',
      'Responsywność mobile / tablet / desktop',
      'Formularz kontaktowy',
      'Podstawowe SEO techniczne',
      'Podpięcie domeny i publikacja',
      '1 tura poprawek',
    ],
    notIncluded: ['CMS', 'Copywriting premium', 'Zaawansowane animacje'],
  },
  {
    name: 'Business',
    price: '2500–4500 zł',
    tag: 'Najczęściej wybierany',
    description: 'Profesjonalna strona firmowa dla biznesu, który chce wyglądać wiarygodnie, zbierać zapytania i skalować marketing.',
    features: [
      'Strona firmowa do 5 podstron',
      'Indywidualny układ sekcji',
      'CMS Sanity do edycji treści',
      'Blog lub aktualności',
      'Optymalizacja szybkości',
      'Podstawowa konfiguracja SEO',
      'Integracja Google Maps / social media',
      '2 tury poprawek',
    ],
    notIncluded: ['Sklep internetowy', 'System rezerwacji', 'Teksty premium'],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '5000–9000 zł',
    tag: 'Dla mocnej marki',
    description: 'Customowa strona premium z mocnym designem, lepszym UX, animacjami, CMS-em i integracjami pod konkretny proces sprzedaży.',
    features: [
      'Custom landing / strona firmowa',
      'Zaawansowany design i animacje',
      'CMS Sanity lub inny headless CMS',
      'Rozbudowane formularze i integracje',
      'Zaawansowana optymalizacja SEO',
      'Audyt UX i struktury strony',
      'Wsparcie po wdrożeniu',
      '3 tury poprawek',
    ],
    notIncluded: ['Aplikacja webowa', 'Pełna strategia marketingowa'],
  },
]

const addOns = [
  ['Dodatkowa podstrona', '300–800 zł'],
  ['Copywriting jednej podstrony', '300–700 zł'],
  ['Blog / aktualności', '500–1500 zł'],
  ['CMS Sanity', '800–2500 zł'],
  ['Animacje premium', '500–2000 zł'],
  ['Formularz wyceny', '400–1200 zł'],
  ['Integracja z newsletterem', '400–1000 zł'],
  ['Opieka techniczna', '200–1000 zł / mies.'],
]

const services = [
  ['Landing pages', 'Strony sprzedażowe pod kampanie reklamowe, usługi i szybkie pozyskiwanie leadów.'],
  ['Strony firmowe', 'Nowoczesne strony dla firm z ofertą, realizacjami, opiniami i kontaktem.'],
  ['CMS Sanity', 'Panel do edycji treści, dzięki któremu klient może sam zmieniać teksty, zdjęcia i wpisy.'],
  ['Optymalizacja', 'Szybkość, responsywność, SEO techniczne i przygotowanie strony pod Google.'],
]

const process = [
  ['01', 'Strategia', 'Ustalamy cel strony, grupę odbiorców, ofertę, strukturę i najważniejsze sekcje.'],
  ['02', 'Design', 'Projektuję nowoczesny układ strony z naciskiem na czytelność, zaufanie i konwersję.'],
  ['03', 'Development', 'Koduję stronę w React / Next.js, dbając o szybkość, responsywność i czysty kod.'],
  ['04', 'Wdrożenie', 'Publikuję stronę, podpinam domenę, testuję formularze i przekazuję instrukcję obsługi.'],
]

  const portfolio = [
  {
    title: 'Sharp Barber',
    package: 'Mini',
    category: 'Prosta strona dla barbera',
    description: 'Szybka strona one-page z ofertą, godzinami otwarcia i przyciskiem kontaktu.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop',
    tags: ['Mini', 'One-page', 'Kontakt'],
    caseStudy: {
  goal: 'Pozyskiwanie nowych klientów i szybki kontakt.',
  scope: 'Projekt one-page, oferta, godziny otwarcia, mapa i CTA.',
  tech: 'React, Tailwind CSS',
  result: 'Nowoczesna wizytówka online zwiększająca liczbę rezerwacji.',
},
  },
  {
    title: 'Glow Studio',
    package: 'Starter',
    category: 'Landing page dla studia kosmetycznego',
    description: 'Elegancki landing page beauty z ofertą usług, opiniami i CTA do rezerwacji.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    tags: ['Starter', 'Beauty', 'Landing'],
    caseStudy: {
  goal: 'Prezentacja usług beauty i zwiększenie liczby zapisów.',
  scope: 'Landing page, opinie klientek, oferta zabiegów i CTA.',
  tech: 'React, Tailwind CSS',
  result: 'Elegancka strona budująca zaufanie i zachęcająca do kontaktu.',
},
  },
  {
    title: 'AutoFix Garage',
    package: 'Business',
    category: 'Strona dla warsztatu mechanicznego',
    description: 'Strona usługowa z ofertą napraw, zaufaniem, lokalizacją i formularzem kontaktowym.',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200&auto=format&fit=crop',
    tags: ['Business', 'Usługi', 'Mobile'],
    caseStudy: {
  goal: 'Pozyskiwanie klientów lokalnie i prezentacja usług.',
  scope: 'Oferta napraw, formularz kontaktowy, mapa i sekcja zaufania.',
  tech: 'React, Tailwind CSS, Formspree',
  result: 'Profesjonalna strona usługowa zwiększająca liczbę zapytań.',
},
  },
  {
    title: 'BuildPro',
    package: 'Premium',
    category: 'Strona dla firmy budowlanej',
    description: 'Rozbudowana strona premium z portfolio realizacji, procesem, formularzem wyceny i mocnym designem.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    tags: ['Premium', 'Firma', 'SEO'],
    caseStudy: {
  goal: 'Budowa silnego wizerunku firmy budowlanej.',
  scope: 'Strona premium, realizacje, proces współpracy, formularz wyceny.',
  tech: 'React, Tailwind CSS, CMS',
  result: 'Nowoczesna prezentacja marki zwiększająca wiarygodność firmy.',
},
  },
]

function DemoPage({ title, industry, description, caseStudy, onBack }) {
  const [isLoading, setIsLoading] = useState(title === 'BuildPro')
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const [statsNumbers, setStatsNumbers] = useState({
  projects: 0,
  years: 0,
  rating: 0,
})

  useEffect(() => {
    if (title === 'BuildPro') {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1400)

      return () => clearTimeout(timer)
    }
  }, [title])

  useEffect(() => {
  if (title !== 'BuildPro' || isLoading) return

  const timer = setTimeout(() => {
    setStatsVisible(true)
  }, 600)

  return () => clearTimeout(timer)
}, [title, isLoading])

useEffect(() => {
  if (!statsVisible) return

  let frame = 0
  const totalFrames = 80

  const interval = setInterval(() => {
    frame += 1
    const progress = Math.min(frame / totalFrames, 1)

    setStatsNumbers({
      projects: Math.round(120 * progress),
      years: Math.round(18 * progress),
      rating: Number((4.9 * progress).toFixed(1)),
    })

    if (progress === 1) {
      clearInterval(interval)
    }
  }, 20)

  return () => clearInterval(interval)
}, [statsVisible])

if (title === 'BuildPro' && isLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <div className="text-center">
        <div className="mx-auto mb-8 h-20 w-20 animate-spin rounded-full border border-white/10 border-t-yellow-400" />

        <div className="text-5xl font-black tracking-[-0.06em]">
          BuildPro<span className="text-yellow-400">.</span>
        </div>

        <p className="mt-4 text-sm font-black uppercase tracking-[0.3em] text-zinc-500">
          Loading premium experience
        </p>
      </div>
    </div>
  )
}
  const isBeauty = title === 'Glow Studio'
  const isGarage = title === 'AutoFix Garage'

  const image = isBeauty
    ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1400&auto=format&fit=crop'
    : isGarage
    ? 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1400&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop'

if (title === 'Sharp Barber') {
  return (
    <div className="min-h-screen bg-[#15110f] text-white">
      <header className="border-b border-white/10 bg-[#15110f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <button onClick={onBack} className="cursor-pointer text-sm font-bold text-zinc-400 hover:text-white">
            ← Wróć
          </button>
          <div className="text-2xl font-black">Sharp Barber</div>
          <button
  type="button"
  onClick={() => {
    document
      .getElementById('kontakt-barber')
      ?.scrollIntoView({ behavior: 'smooth' })
  }}
  className="cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-black text-black"
>
  Rezerwuj
</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-amber-400">
            Pakiet Mini
          </p>
          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Prosta strona dla lokalnej usługi.
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Demo pokazuje podstawowy one-page: krótka oferta, zdjęcie, cennik, godziny otwarcia i szybki kontakt.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="rounded-full bg-amber-400 px-7 py-4 font-black text-black">
              Zadzwoń
            </button>
            <button className="rounded-full border border-white/10 px-7 py-4 font-black">
              Cennik
            </button>
          </div>
        </div>

        

        <img
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1400&auto=format&fit=crop"
          className="h-[560px] w-full rounded-[2rem] object-cover shadow-2xl"
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-12 md:grid-cols-3">
        {['Strzyżenie', 'Broda', 'Combo'].map((item) => (
          <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h3 className="text-2xl font-black">{item}</h3>
            <p className="mt-3 text-zinc-400">Krótki opis usługi i cena od 80 zł.</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
  <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10">
    <h2 className="text-3xl font-black">
      Case Study
    </h2>

    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
          Cel projektu
        </div>

        <p className="mt-3 text-zinc-400">
          {caseStudy.goal}
        </p>
      </div>

      <div>
        <div className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
          Zakres prac
        </div>

        <p className="mt-3 text-zinc-400">
          {caseStudy.scope}
        </p>
      </div>

      <div>
        <div className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
          Technologie
        </div>

        <p className="mt-3 text-zinc-400">
          {caseStudy.tech}
        </p>
      </div>

      <div>
        <div className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
          Efekt
        </div>

        <p className="mt-3 text-zinc-400">
          {caseStudy.result}
        </p>
      </div>
    </div>
  </div>
</section>

      <section id="kontakt-barber" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2rem] bg-white p-8 text-black md:p-12">
          <h2 className="text-4xl font-black">Godziny i kontakt</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>Pon–Pt: 9:00–18:00</div>
            <div>Sobota: 10:00–14:00</div>
            <div>Tel: 123 456 789</div>
          </div>
        </div>
      </section>
    </div>
  )
}

    if (title === 'Glow Studio') {
  return (
    <div className="min-h-screen bg-[#f8f1ec] text-[#2a211d]">
      <header className="sticky top-0 z-50 border-b border-[#2a211d]/10 bg-[#f8f1ec]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-sm font-medium tracking-wide text-[#7c6d66] transition hover:text-[#2a211d]"
          >
            ← Wróć
          </button>

          <div className="text-[22px] font-semibold tracking-[-0.03em]">
            Glow Studio
          </div>

         <nav className="hidden items-center gap-8 text-sm font-medium text-[#7c6d66] md:flex">
  <button
    type="button"
    onClick={() =>
      document.getElementById('oferta-glow')?.scrollIntoView({ behavior: 'smooth' })
    }
    className="cursor-pointer transition hover:text-[#2a211d]"
  >
    Oferta
  </button>

  <button
    type="button"
    onClick={() =>
      document.getElementById('opinie-glow')?.scrollIntoView({ behavior: 'smooth' })
    }
    className="cursor-pointer transition hover:text-[#2a211d]"
  >
    Opinie
  </button>

  <button
    type="button"
    onClick={() =>
      document.getElementById('rezerwacja')?.scrollIntoView({ behavior: 'smooth' })
    }
    className="cursor-pointer transition hover:text-[#2a211d]"
  >
    Rezerwacja
  </button>
</nav>

          <button
  type="button"
  onClick={() => {
    document
      .getElementById('rezerwacja')
      ?.scrollIntoView({ behavior: 'smooth' })
  }}
  className="rounded-full bg-[#2a211d] px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:opacity-90"
>
  Umów wizytę
</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-[#c89ca5]">
            Pakiet Starter
          </p>

          <h1 className="max-w-3xl text-6xl font-semibold leading-[0.92] tracking-[-0.06em] md:text-8xl">
            Beauty landing z eleganckim brandingiem.
          </h1>

          <p className="mt-8 max-w-xl text-[20px] font-light leading-10 text-[#7c6d66]">
            Nowoczesny landing page dla branży beauty z naciskiem na estetykę,
            zaufanie i prostą ścieżkę do rezerwacji.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
  type="button"
  onClick={() =>
    document.getElementById('rezerwacja')?.scrollIntoView({ behavior: 'smooth' })
  }
  className="cursor-pointer rounded-full bg-[#2a211d] px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:opacity-90"
>
  Umów wizytę
</button>

            <button
  type="button"
  onClick={() =>
    document.getElementById('oferta-glow')?.scrollIntoView({ behavior: 'smooth' })
  }
  className="cursor-pointer rounded-full border border-[#2a211d]/15 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em]"
>
  Oferta
</button>
          </div>
        </div>

        <div className="grid gap-5">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1400&auto=format&fit=crop"
            alt=""
            className="h-[620px] w-full rounded-[3rem] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
          />

          <div className="grid grid-cols-2 gap-5">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop"
              alt=""
              className="h-48 rounded-[2rem] object-cover"
            />

            <div className="rounded-[2rem] bg-white p-7 shadow-sm">
              <div className="text-4xl font-semibold tracking-[-0.05em]">
                4.9★
              </div>

              <p className="mt-4 text-sm leading-7 text-[#7c6d66]">
                Subtelny blok zaufania typowy dla landingów beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="oferta-glow" className="mx-auto max-w-7xl px-6 py-16 scroll-mt-28">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#c89ca5]">
            Oferta
          </p>

          <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
            Zabiegi przedstawione w estetyczny sposób.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Facial care', 'Oczyszczanie, regeneracja i pielęgnacja skóry.', '180 zł'],
            ['Brow styling', 'Stylizacja brwi i laminacja premium.', '120 zł'],
            ['Glow ritual', 'Kompleksowy zabieg dla pełnego efektu glow.', '320 zł'],
          ].map(([name, text, price]) => (
            <div key={name} className="rounded-[2.5rem] bg-white p-9 shadow-sm">
              <div className="mb-8 h-16 w-16 rounded-3xl bg-[#ecd0d5]" />
              <h3 className="text-3xl font-semibold tracking-[-0.03em]">
                {name}
              </h3>
              <p className="mt-5 leading-8 text-[#7c6d66]">{text}</p>
              <div className="mt-8 text-lg font-medium tracking-wide">
                od {price}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="opinie-glow" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 scroll-mt-28 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[3rem]">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
            alt=""
            className="h-full min-h-[560px] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center rounded-[3rem] bg-white p-10 shadow-sm md:p-14">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#c89ca5]">
            Opinie
          </p>

          <h2 className="mt-6 text-5xl font-semibold leading-[1] tracking-[-0.05em]">
            Landing, który buduje zaufanie.
          </h2>

          <p className="mt-8 text-[18px] font-light leading-9 text-[#7c6d66]">
            “Minimalistyczny, elegancki i bardzo kobiecy design.
            Strona od razu wygląda profesjonalnie.”
          </p>

          <div className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-[#7c6d66]">
            Anna Kowalska
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
  <div className="rounded-[3rem] bg-white p-10 shadow-sm md:p-14">
    <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#c89ca5]">
      Case Study
    </p>

    <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
      Co pokazuje ten projekt?
    </h2>

    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {[
        ['Cel projektu', caseStudy.goal],
        ['Zakres prac', caseStudy.scope],
        ['Technologie', caseStudy.tech],
        ['Efekt', caseStudy.result],
      ].map(([label, text]) => (
        <div key={label} className="rounded-[2rem] bg-[#f8f1ec] p-7">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-[#c89ca5]">
            {label}
          </div>

          <p className="mt-4 leading-8 text-[#7c6d66]">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      <section id="rezerwacja" className="mx-auto max-w-7xl px-6 py-20 scroll-mt-28">
        <div className="grid overflow-hidden rounded-[3rem] bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-10 md:p-16">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#c89ca5]">
              Rezerwacja
            </p>

            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
              Umów swoją wizytę.
            </h2>

            <p className="mt-7 max-w-md text-[18px] font-light leading-9 text-[#7c6d66]">
              Prosty formularz kontaktowy typowy dla pakietu Starter.
            </p>

            <div className="mt-10 grid gap-4">
              <input
                className="rounded-2xl border border-[#2a211d]/10 bg-[#f8f1ec] px-5 py-4 outline-none"
                placeholder="Imię"
              />

              <input
                className="rounded-2xl border border-[#2a211d]/10 bg-[#f8f1ec] px-5 py-4 outline-none"
                placeholder="Telefon / email"
              />

              <button className="rounded-2xl bg-[#2a211d] px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white">
                Wyślij
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200&auto=format&fit=crop"
            alt=""
            className="h-full min-h-[620px] w-full object-cover"
          />
        </div>
      </section>
    </div>
  )
}

if (title === 'AutoFix Garage') {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101214]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3f4f6]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-sm font-bold text-zinc-500 transition hover:text-black"
          >
            ← Wróć
          </button>

          <div className="text-2xl font-black tracking-tight">
            AutoFix Garage
          </div>

          <nav className="hidden items-center gap-7 text-sm font-bold text-zinc-600 md:flex">
            <button
  type="button"
  onClick={() => document.getElementById('uslugi-auto')?.scrollIntoView({ behavior: 'smooth' })}
  className="cursor-pointer transition hover:text-black"
>
  Usługi
</button>

<button
  type="button"
  onClick={() => document.getElementById('dlaczego-auto')?.scrollIntoView({ behavior: 'smooth' })}
  className="cursor-pointer transition hover:text-black"
>
  Dlaczego my?
</button>

<button
  type="button"
  onClick={() => document.getElementById('opinie-auto')?.scrollIntoView({ behavior: 'smooth' })}
  className="cursor-pointer transition hover:text-black"
>
  Opinie
</button>

<button
  type="button"
  onClick={() => document.getElementById('kontakt-auto')?.scrollIntoView({ behavior: 'smooth' })}
  className="cursor-pointer transition hover:text-black"
>
  Kontakt
</button>
          </nav>

          <button
  type="button"
  onClick={() => {
    document
      .getElementById('kontakt-auto')
      ?.scrollIntoView({ behavior: 'smooth' })
  }}
  className="rounded-full bg-[#101214] px-5 py-3 text-sm font-black text-white transition hover:bg-zinc-800"
>
  Umów naprawę
</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-orange-500">
            Pakiet Business / Strona firmowa
          </p>

          <h1 className="max-w-4xl text-6xl font-black leading-[0.92] tracking-[-0.06em] md:text-8xl">
            Strona usługowa dla warsztatu, która buduje zaufanie.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-600">
            Demo pakietu Business pokazuje pełniejszą stronę firmową:
            kilka sekcji, ofertę usług, elementy zaufania, opinie,
            lokalizację i formularz kontaktowy.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
  type="button"
  onClick={() => document.getElementById('kontakt-auto')?.scrollIntoView({ behavior: 'smooth' })}
  className="cursor-pointer rounded-full bg-orange-500 px-8 py-4 font-black text-white transition hover:bg-orange-600"
>
  Umów naprawę
</button>

            <button
  type="button"
  onClick={() => document.getElementById('uslugi-auto')?.scrollIntoView({ behavior: 'smooth' })}
  className="cursor-pointer rounded-full border border-black/15 px-8 py-4 font-black transition hover:bg-white"
>
  Zobacz usługi
</button>
          </div>

          <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
  {[
    ['15+', 'lat doświadczenia'],
    ['4.8★', 'średnia opinii'],
    ['24h', 'szybka wycena'],
  ].map(([number, label]) => (
    <div key={number} className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="text-3xl font-black">{number}</div>
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </div>
  ))}
</div>
        </div>

        <div className="grid gap-5">
          <img
            src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1400&auto=format&fit=crop"
            alt="AutoFix Garage"
            className="h-[520px] w-full rounded-[2.5rem] object-cover shadow-2xl"
          />

          <div className="grid gap-5 md:grid-cols-2">
  <div className="rounded-[2rem] bg-[#101214] p-7 text-white">
    <div className="text-4xl font-black text-orange-500">
      Business
    </div>

    <p className="mt-4 leading-7 text-zinc-400">
      Więcej sekcji, lepsza struktura i strona gotowa pod lokalne usługi.
    </p>
  </div>

  <img
    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop"
    alt=""
    className="h-48 w-full rounded-[2rem] object-cover"
  />
</div>
        </div>
      </section>

      <section id="uslugi-auto" className="mx-auto max-w-7xl px-6 py-16 scroll-mt-28">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
            Usługi
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] md:text-6xl">
            Oferta warsztatu pokazana jasno i konkretnie.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-600">
            W pakiecie Business strona może mieć więcej sekcji niż landing:
            usługi, korzyści, opinie, lokalizację i formularz.
          </p>
        </div>
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {[
    [
      '🖥️',
      'Diagnostyka komputerowa',
      'Szybkie wykrywanie usterek i jasna informacja o kosztach.',
    ],
    [
      '🛢️',
      'Serwis olejowy',
      'Wymiana oleju, filtrów i podstawowa kontrola auta.',
    ],
    [
      '🛑',
      'Układ hamulcowy',
      'Klocki, tarcze, płyny i kompleksowy przegląd hamulców.',
    ],
    [
      '❄️',
      'Klimatyzacja',
      'Nabijanie, odgrzybianie i kontrola szczelności.',
    ],
    [
      '⚙️',
      'Zawieszenie',
      'Diagnostyka stuków, amortyzatory, wahacze i geometria.',
    ],
    [
      '🚗',
      'Przegląd przed zakupem',
      'Ocena auta przed zakupem i raport dla klienta.',
    ],
  ].map(([icon, name, text]) => (
    <div
      key={name}
      className="rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1"
    >
      <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-3xl text-white shadow-lg shadow-orange-500/20">
        {icon}
      </div>

      <h3 className="text-2xl font-black">
        {name}
      </h3>

      <p className="mt-4 leading-7 text-zinc-600">
        {text}
      </p>
    </div>
  ))}
</div>
      </section>

      <section id="dlaczego-auto" className="mx-auto max-w-7xl px-6 py-16 scroll-mt-28">
        <div className="grid overflow-hidden rounded-[3rem] bg-[#101214] text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-10 md:p-14">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
              Dlaczego AutoFix
            </p>

            <h2 className="mt-6 text-5xl font-black tracking-[-0.05em]">
              Sekcja zaufania dla lokalnej firmy.
            </h2>

            <p className="mt-8 text-lg leading-8 text-zinc-400">
              Business powinien lepiej tłumaczyć, dlaczego klient ma wybrać
              właśnie tę firmę — dlatego pojawiają się korzyści, liczby,
              opinie i konkretne argumenty.
            </p>

            <div className="mt-10 grid gap-4">
              {[
                'Jasna wycena przed naprawą',
                'Szybki kontakt telefoniczny',
                'Lokalizacja i godziny otwarcia',
                'Opinie oraz elementy wiarygodności',
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="h-3 w-3 rounded-full bg-orange-500" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop"
            alt=""
            className="h-full min-h-[560px] w-full object-cover opacity-85"
          />
        </div>
      </section>

      <section id="opinie-auto" className="mx-auto max-w-7xl px-6 py-16 scroll-mt-28">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
            Opinie
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] md:text-6xl">
            Wiarygodność jest kluczowa w usługach lokalnych.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Marek P.', 'Szybka diagnoza, jasna wycena i dobry kontakt.'],
            ['Katarzyna L.', 'Strona od razu pokazuje, gdzie zadzwonić i jakie usługi są dostępne.'],
            ['Tomasz W.', 'Wygląda profesjonalnie i budzi zaufanie do warsztatu.'],
          ].map(([name, text]) => (
            <div key={name} className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="text-2xl font-black text-orange-500">★★★★★</div>
              <p className="mt-6 leading-8 text-zinc-600">
                “{text}”
              </p>
              <div className="mt-6 font-black">
                {name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
  <div className="rounded-[3rem] bg-[#101214] p-10 text-white md:p-14">
    <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
      Case Study
    </p>

    <h2 className="mt-5 text-5xl font-black tracking-[-0.05em]">
      Co pokazuje ten projekt?
    </h2>

    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {[
        ['Cel projektu', caseStudy.goal],
        ['Zakres prac', caseStudy.scope],
        ['Technologie', caseStudy.tech],
        ['Efekt', caseStudy.result],
      ].map(([label, text]) => (
        <div key={label} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7">
          <div className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
            {label}
          </div>

          <p className="mt-4 leading-8 text-zinc-400">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

   <section id="kontakt-auto" className="mx-auto max-w-7xl px-5 py-20 scroll-mt-28 md:px-6">
  <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
    <div className="rounded-[3rem] bg-white p-10 shadow-sm md:p-14">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
        Kontakt i integracje
      </p>

      <h2 className="mt-5 text-5xl font-black tracking-[-0.05em]">
        Klient od razu wie, gdzie jesteś i jak się skontaktować.
      </h2>

      <div className="mt-8 space-y-4 text-zinc-600">
        <p>AutoFix Garage</p>
        <p>ul. Mechaników 8, 00-001 Warszawa</p>
        <p>tel. 123 456 789</p>
        <p>kontakt@autofix.pl</p>
        <p>Pon–Pt: 8:00–18:00 / Sob: 9:00–14:00</p>
      </div>

      <div className="mt-8 grid gap-3 xl:grid-cols-3">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center gap-3 rounded-[1.4rem] border border-orange-200 bg-orange-50 px-4 py-4 text-sm font-black text-black shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <span className="text-xl">📍</span>
          Google Maps
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center gap-3 rounded-[1.4rem] bg-[#1877f2] px-4 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
        >
          <span className="text-xl">f</span>
          Facebook
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center gap-3 rounded-[1.4rem] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-4 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/30"
        >
          <span className="text-xl">✦</span>
          Instagram
        </a>
      </div>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-black/10">
        <iframe
          title="AutoFix Garage mapa"
          src="https://www.google.com/maps?q=Warszawa&output=embed"
          className="h-80 w-full border-0"
          loading="lazy"
        />
      </div>

      <div className="mt-10 rounded-[2rem] bg-[#f3f4f6] p-6">
        <p className="font-black">Co pokazuje pakiet Business?</p>

        <p className="mt-3 leading-7 text-zinc-600">
          Stronę firmową z większą strukturą, większą liczbą sekcji,
          lokalnym SEO, zaufaniem, integracją Google Maps,
          social media i miejscem na CMS / aktualności.
        </p>
      </div>
    </div>

    <div className="mx-auto w-full max-w-[340px] rounded-[2rem] bg-[#101214] p-8 text-white md:max-w-none md:rounded-[3rem] md:p-12">
      <h3 className="text-3xl font-black">
        Formularz kontaktowy
      </h3>

      <div className="mt-8 grid gap-4">
        <input
          className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-zinc-500"
          placeholder="Imię"
        />

        <input
          className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-zinc-500"
          placeholder="Telefon / email"
        />

        <select className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none text-zinc-400">
          <option>Wybierz usługę</option>
          <option>Diagnostyka komputerowa</option>
          <option>Serwis olejowy</option>
          <option>Klimatyzacja</option>
        </select>

        <textarea
          className="min-h-32 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-zinc-500"
          placeholder="Opisz problem"
        />

        <button
  type="button"
  className="cursor-pointer rounded-2xl bg-orange-500 px-6 py-4 font-black text-white transition hover:bg-orange-600"
>
          Wyślij zapytanie
        </button>
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="font-black text-orange-500">
          Integracje w pakiecie Business
        </p>

        <ul className="mt-4 space-y-3 text-zinc-400">
          <li>• Google Maps na stronie kontaktu</li>
          <li>• Linki do Facebooka i Instagrama</li>
          <li>• Formularz kontaktowy</li>
          <li>• Dane firmy i godziny otwarcia</li>
        </ul>
      </div>
    </div>
  </div>

  <div className="mt-10 text-center">
    <button
      type="button"
      onClick={onBack}
      className="cursor-pointer rounded-full bg-[#101214] px-8 py-4 font-black text-white"
    >
      Wróć do Polnex.dev
    </button>
  </div>
</section>
    </div>
  )
}

if (title === 'BuildPro') {
  return (
    <div className="min-h-screen animate-[fadeIn_0.7s_ease-out] bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            ← Wróć
          </button>

          <div className="text-2xl font-black tracking-[-0.04em]">
            BuildPro<span className="text-yellow-400">.</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-zinc-400 md:flex">
  <button
    type="button"
    onClick={() => document.getElementById('premium-oferta')?.scrollIntoView({ behavior: 'smooth' })}
    className="cursor-pointer transition hover:text-yellow-400"
  >
    Oferta
  </button>

  <button
    type="button"
    onClick={() => document.getElementById('premium-realizacje')?.scrollIntoView({ behavior: 'smooth' })}
    className="cursor-pointer transition hover:text-yellow-400"
  >
    Realizacje
  </button>

  <button
    type="button"
    onClick={() => document.getElementById('premium-proces')?.scrollIntoView({ behavior: 'smooth' })}
    className="cursor-pointer transition hover:text-yellow-400"
  >
    Proces
  </button>

  <button
    type="button"
    onClick={() => document.getElementById('premium-cms')?.scrollIntoView({ behavior: 'smooth' })}
    className="cursor-pointer transition hover:text-yellow-400"
  >
    CMS
  </button>

  <button
    type="button"
    onClick={() => document.getElementById('premium-wycena')?.scrollIntoView({ behavior: 'smooth' })}
    className="cursor-pointer transition hover:text-yellow-400"
  >
    Wycena
  </button>
</nav>

         <button
  type="button"
  onClick={(e) => {
    e.preventDefault()
    e.stopPropagation()

    document
      .getElementById('premium-wycena')
      ?.scrollIntoView({ behavior: 'smooth' })
  }}
  className="cursor-pointer rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_40px_rgba(250,204,21,0.25)] transition hover:scale-[1.03]"
>
  Zapytaj o wycenę
</button>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20 lg:py-36">
        <div className="absolute left-1/2 top-0 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[170px]" />
        <div className="absolute right-0 top-48 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
              Pakiet Premium / Custom Website
            </p>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.86] tracking-[-0.075em] md:text-8xl">
            </h1>

            <p className="mt-9 max-w-2xl text-xl leading-9 text-zinc-400">
              Demo pakietu Premium pokazuje customowy design, sekcje zaufania,
              realizacje, blog, FAQ, social media, Google Maps, CMS-ready strukturę,
              SEO i rozbudowany formularz wyceny.
            </p>

            <div className="mt-11 flex flex-wrap gap-4">
              <button
  type="button"
  onClick={() => {
    document
      .getElementById('premium-wycena')
      ?.scrollIntoView({ behavior: 'smooth' })
  }}
  className="cursor-pointer rounded-full bg-yellow-400 px-8 py-4 font-black text-black shadow-[0_0_60px_rgba(250,204,21,0.25)] transition hover:scale-[1.02]"
>
  Poproś o wycenę
</button>

<button
  type="button"
  onClick={() => {
    document
      .getElementById('premium-realizacje')
      ?.scrollIntoView({ behavior: 'smooth' })
  }}
  className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-8 py-4 font-black text-white transition hover:bg-white/10"
>
  Zobacz realizacje
</button>
            </div>
            <div ref={statsRef} className="mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">
  {[
    ['120+', 'zrealizowanych inwestycji'],
    ['18 lat', 'doświadczenia'],
    ['4.9★', 'średnia ocen'],
  ].map(([number, label], index) => (
    <div
  key={number}
  className={`rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-1000 hover:-translate-y-2 hover:bg-white/[0.07] hover:shadow-[0_0_45px_rgba(250,204,21,0.12)] ${
    statsVisible
      ? 'translate-y-0 scale-100 opacity-100 blur-0'
      : 'translate-y-16 scale-90 opacity-0 blur-sm'
  }`}
  style={{
    transitionDelay: `${index * 150}ms`,
  }}
>
      <div className="text-4xl font-black tracking-[-0.05em] text-yellow-400">
        {number === '120+' && `${statsNumbers.projects}+`}
        {number === '18 lat' && `${statsNumbers.years} lat`}
        {number === '4.9★' && `${statsNumbers.rating}★`}
      </div>

      <div className="mt-2 text-sm leading-6 text-zinc-500">
        {label}
      </div>
    </div>
  ))}
</div>


          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3.5rem] bg-gradient-to-br from-yellow-400/20 via-white/5 to-orange-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[3.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop"
                alt="BuildPro premium construction"
                className="h-[680px] w-full rounded-[3rem] object-cover"
              />

              <div className="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/10 bg-black/65 p-6 backdrop-blur-xl">
                <div className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">
                  Premium experience
                </div>
                <div className="mt-3 text-3xl font-black">
                  Custom design + CMS + SEO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="premium-oferta" className="mx-auto max-w-7xl px-6 py-24 scroll-mt-28">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
              Oferta
            </p>

            <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Rozbudowana prezentacja usług i specjalizacji.
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-zinc-400">
            W Premium strona prowadzi klienta przez ofertę, realizacje,
            proces, technologię, zaufanie i formularz wyceny.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['🏗️', 'Budowa domów', 'Kompleksowa realizacja od fundamentów po stan deweloperski.'],
            ['🧱', 'Remonty premium', 'Modernizacje mieszkań, domów i lokali usługowych.'],
            ['📐', 'Nadzór i projekt', 'Koordynacja etapów, harmonogram i kontrola jakości.'],
            ['⚡', 'Instalacje', 'Elektryka, hydraulika i prace wykończeniowe.'],
          ].map(([icon, name, text]) => (
            <div
              key={name}
              className="group rounded-[2.4rem] border border-white/10 bg-white/[0.04] p-8 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.075]"
            >
              <div className="mb-9 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-3xl shadow-lg shadow-yellow-400/20">
                {icon}
              </div>

              <h3 className="text-2xl font-black">{name}</h3>

              <p className="mt-4 leading-7 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="premium-realizacje" className="mx-auto max-w-7xl px-6 py-24 scroll-mt-28">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
              Realizacje
            </p>

            <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Case studies zamiast zwykłej galerii.
            </h2>
          </div>

          <p className="max-w-xl leading-8 text-zinc-400">
            Premium pokazuje projekty jako konkretne realizacje z typem inwestycji,
            zakresem prac i mocnym zdjęciem.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            [
              'Rezydencja pod Warszawą',
              'Budowa domu',
              'Kompleksowa realizacja od fundamentów po wykończenie.',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
            ],
            [
              'Apartament premium',
              'Wykończenie wnętrz',
              'Nowoczesne wnętrze z wysokim standardem wykończenia.',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
            ],
            [
              'Lokal usługowy',
              'Remont komercyjny',
              'Pełna modernizacja przestrzeni dla biznesu lokalnego.',
              'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
            ],
          ].map(([name, type, text, image]) => (
            <div
              key={name}
              className="group overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.04]"
            >
              <div className="overflow-hidden">
                <img
                  src={image}
                  alt=""
                  className="h-96 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-8">
                <div className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">
                  {type}
                </div>

                <h3 className="mt-4 text-3xl font-black tracking-[-0.04em]">
                  {name}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="premium-proces" className="mx-auto max-w-7xl px-6 py-24 scroll-mt-28">
        <div className="grid overflow-hidden rounded-[3.5rem] bg-white text-black lg:grid-cols-[0.85fr_1.15fr]">
          <div className="p-10 md:p-16">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-600">
              Proces
            </p>

            <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em]">
              Pełny proces premium od strategii do wdrożenia.
            </h2>

            <p className="mt-8 text-lg leading-8 text-zinc-600">
              Ten poziom pokazuje klientowi, że Premium to nie tylko ładna strona,
              ale też przemyślana struktura, UX, CMS, SEO i wsparcie po publikacji.
            </p>
          </div>

          <div className="grid gap-4 bg-[#f3f4f6] p-8 md:p-10">
            {[
              ['01', 'Audyt i architektura strony', 'Ustalenie celu, struktury sekcji i ścieżki użytkownika.'],
              ['02', 'Custom design i UX', 'Indywidualny wygląd dopasowany do marki i branży.'],
              ['03', 'CMS i treści edytowalne', 'Miejsce na Sanity CMS, realizacje, usługi i aktualności.'],
              ['04', 'Wdrożenie i wsparcie', 'Publikacja, testy, optymalizacja oraz wsparcie po starcie.'],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-[2rem] bg-white p-6 shadow-sm">
               <div className="text-sm font-black text-yellow-600">
  {number}
</div>
                <h3 className="mt-2 text-2xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="premium-cms" className="mx-auto max-w-7xl px-6 py-24 scroll-mt-28">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
            CMS / SEO / Performance
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Premium zawiera więcej niż sam wygląd.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ['CMS Sanity', 'Klient może samodzielnie edytować realizacje, usługi, teksty i sekcje strony.'],
            ['SEO-ready', 'Przygotowana struktura nagłówków, treści, sekcji i podstawowa optymalizacja techniczna.'],
            ['Wsparcie po wdrożeniu', 'Pomoc po publikacji, poprawki, testy formularzy i dopięcie szczegółów.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-9 transition hover:-translate-y-1 hover:bg-white/[0.07]">
              <div className="mb-8 h-16 w-16 rounded-2xl bg-yellow-400" />
              <h3 className="text-3xl font-black tracking-[-0.04em]">{title}</h3>
              <p className="mt-5 leading-8 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
            Social / Lokalizacja
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Premium obecność firmy online.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-[2rem] bg-[#1877f2] p-6 text-white transition hover:-translate-y-1"
              >
                <div className="text-3xl font-black">f</div>
                <div className="mt-6 text-xl font-black">Facebook</div>
                <p className="mt-2 text-sm text-blue-100">
                  Opinie klientów i aktualności.
                </p>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-[2rem] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 p-6 text-white transition hover:-translate-y-1"
              >
                <div className="text-3xl font-black">✦</div>
                <div className="mt-6 text-xl font-black">Instagram</div>
                <p className="mt-2 text-sm text-pink-100">
                  Zdjęcia realizacji i branding.
                </p>
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-[2rem] border border-yellow-400/30 bg-yellow-400/10 p-6 text-white transition hover:-translate-y-1"
              >
                <div className="text-3xl">📍</div>
                <div className="mt-6 text-xl font-black">Google Maps</div>
                <p className="mt-2 text-sm text-zinc-400">
                  Lokalizacja i widoczność lokalna.
                </p>
              </a>
            </div>

            <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-white/10">
              <iframe
                title="BuildPro mapa"
                src="https://www.google.com/maps?q=Warszawa&output=embed"
                className="h-[420px] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-10">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">
              Premium branding
            </p>

            <h3 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em]">
              Strona wygląda jak marka premium.
            </h3>

            <p className="mt-8 text-lg leading-8 text-zinc-400">
              Premium to branding, zaufanie, pozycjonowanie firmy
              i mocniejsze doświadczenie użytkownika.
            </p>

            <div className="mt-10 grid gap-4">
              {[
                'Mocny custom design',
                'Więcej sekcji sprzedażowych',
                'Case studies i realizacje',
                'Lepszy UX i SEO',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
              Blog / Aktualności
            </p>

            <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Content marketing i SEO.
            </h2>
          </div>

          <p className="max-w-xl leading-8 text-zinc-400">
            W Premium można dodać blog, aktualności,
            poradniki lub realizacje pod SEO i większy ruch organiczny.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ['Jak przygotować dom do remontu?', 'Poradnik dla klientów planujących większą inwestycję.'],
            ['5 błędów przy wyborze wykonawcy', 'Treści budujące zaufanie i pozycjonowanie lokalne.'],
            ['Nowoczesne wykończenia premium', 'Sekcja contentowa pokazująca doświadczenie firmy.'],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="mb-6 h-52 rounded-[2rem] bg-gradient-to-br from-yellow-400/25 to-orange-500/10" />

              <h3 className="text-3xl font-black tracking-[-0.04em]">
                {title}
              </h3>

              <p className="mt-5 leading-8 text-zinc-400">
                {text}
              </p>

              <button className="mt-8 font-black text-yellow-400">
                Czytaj więcej →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
            FAQ
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Najczęstsze pytania klientów.
          </h2>
        </div>

        <div className="grid gap-5">
          {[
            ['Jak długo trwa realizacja strony Premium?', 'Zależnie od projektu zwykle od 2 do 6 tygodni.'],
            ['Czy mogę sam edytować treści?', 'Tak — Premium może zawierać CMS Sanity lub inne rozwiązanie.'],
            ['Czy strona będzie zoptymalizowana pod SEO?', 'Tak, struktura i techniczne podstawy SEO są częścią pakietu.'],
           [
  'Czy pomagacie po wdrożeniu?',
  'Tak — pakiet Premium zawiera 30 dni wsparcia po publikacji projektu, pomoc techniczną i poprawki startowe.',
],
          ].map(([question, answer]) => (
            <div
              key={question}
              className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8"
            >
              <h3 className="text-2xl font-black">{question}</h3>
              <p className="mt-4 leading-8 text-zinc-400">{answer}</p>
            </div>
          ))}
        </div>
      </section>

          <section className="mx-auto max-w-7xl px-6 py-20">
  <div className="overflow-hidden rounded-[3rem] border border-yellow-400/15 bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-10 md:p-14">
    <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
      Case Study
    </p>

    <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] text-white md:text-6xl">
      Jak wygląda projekt Premium?
    </h2>

    <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
      Pakiet Premium jest przeznaczony dla firm, które chcą wyróżnić się na tle konkurencji,
      budować zaufanie i generować więcej wartościowych zapytań.
    </p>

    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {[
        ['Cel projektu', caseStudy.goal],
        ['Zakres prac', caseStudy.scope],
        ['Technologie', caseStudy.tech],
        ['Efekt', caseStudy.result],
      ].map(([label, text]) => (
        <div
          key={label}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
            {label}
          </div>

          <p className="mt-4 leading-8 text-zinc-300">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      <section id="premium-wycena" className="mx-auto max-w-7xl px-6 py-24 scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[3.5rem] border border-white/10 bg-white/[0.04] p-10 md:p-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
              Formularz wyceny
            </p>

            <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em]">
              Rozbudowane zapytanie ofertowe.
            </h2>

            <p className="mt-8 text-lg leading-8 text-zinc-400">
              W Premium formularz może być bardziej rozbudowany: typ inwestycji,
              zakres prac, budżet, termin i opis projektu. To daje firmie lepsze leady.
            </p>

            <div className="mt-10 rounded-[2.5rem] bg-yellow-400 p-7 text-black">
              <p className="text-xl font-black">
                Co pokazuje ten pakiet?
              </p>

              <ul className="mt-5 space-y-3 text-black/75">
                <li>• Custom design i mocniejszy branding</li>
                <li>• Sekcje realizacji / case studies</li>
                <li>• Rozbudowany formularz wyceny</li>
                <li>• CMS Sanity lub inny headless CMS</li>
                <li>• SEO-ready struktura i optymalizacja</li>
                <li>• Wsparcie po wdrożeniu</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[3.5rem] bg-white p-8 text-black md:p-10">
            <h3 className="text-3xl font-black tracking-[-0.04em]">
              Zapytanie o inwestycję
            </h3>

            <div className="mt-8 grid gap-4">
              <input
                className="rounded-2xl border border-black/10 bg-[#f3f4f6] px-5 py-4 outline-none"
                placeholder="Imię i nazwisko"
              />

              <input
                className="rounded-2xl border border-black/10 bg-[#f3f4f6] px-5 py-4 outline-none"
                placeholder="Email / telefon"
              />

              <select className="rounded-2xl border border-black/10 bg-[#f3f4f6] px-5 py-4 text-zinc-500 outline-none">
                <option>Typ inwestycji</option>
                <option>Budowa domu</option>
                <option>Remont mieszkania</option>
                <option>Lokal usługowy</option>
              </select>

              <select className="rounded-2xl border border-black/10 bg-[#f3f4f6] px-5 py-4 text-zinc-500 outline-none">
                <option>Planowany budżet</option>
                <option>do 50 000 zł</option>
                <option>50 000–150 000 zł</option>
                <option>150 000 zł+</option>
              </select>

              <textarea
                className="min-h-36 rounded-2xl border border-black/10 bg-[#f3f4f6] px-5 py-4 outline-none"
                placeholder="Opisz zakres prac"
              />

              <button className="rounded-2xl bg-yellow-400 px-6 py-4 font-black text-black">
                Wyślij zapytanie
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-8 py-4 font-black text-white transition hover:bg-white/10"
          >
            Wróć do Polnex.dev
          </button>
        </div>
      </section>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-sm font-black text-stone-600 hover:text-stone-950"
          >
            ← Wróć
          </button>

          <div className="text-xl font-black">{title}</div>

          <button className="cursor-pointer rounded-full bg-stone-950 px-5 py-3 text-sm font-black text-white">
            Kontakt
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-stone-500">
            Demo strony
          </p>

          <h1 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
            {industry}
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-9 text-stone-600">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="cursor-pointer rounded-full bg-stone-950 px-8 py-4 font-black text-white">
              Umów konsultację
            </button>

            <button className="cursor-pointer rounded-full border border-stone-300 px-8 py-4 font-black">
              Zobacz ofertę
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] shadow-2xl">
          <img src={image} alt={title} className="h-[520px] w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        {['Nowoczesny design', 'Mobile first', 'Szybki kontakt'].map((item) => (
          <div key={item} className="rounded-[2rem] bg-white p-8 shadow-sm">
            <div className="mb-8 h-14 w-14 rounded-2xl bg-stone-950" />
            <h3 className="text-2xl font-black">{item}</h3>
            <p className="mt-4 leading-7 text-stone-600">
              Przykładowa sekcja pokazująca korzyść dla klienta i cel strony.
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-stone-950 text-white lg:grid-cols-2">
          <div className="p-10 md:p-16">
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">
              Oferta dopasowana do branży
            </h2>

            <div className="mt-10 space-y-5">
              {['Usługa podstawowa', 'Pakiet rozszerzony', 'Konsultacja / wycena'].map((item) => (
                <div key={item} className="flex justify-between border-b border-white/10 pb-5">
                  <span>{item}</span>
                  <span className="font-black">od 150 zł</span>
                </div>
              ))}
            </div>
          </div>

          <img src={image} alt="" className="h-full min-h-[420px] w-full object-cover opacity-80" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2.5rem] bg-white p-10 text-center shadow-sm md:p-16">
          <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Chcesz podobną stronę?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            To demo pokazuje przykładowy styl strony dla tej branży. Każdy projekt można dopasować pod konkretną firmę.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 cursor-pointer rounded-full bg-stone-950 px-8 py-4 font-black text-white"
          >
            Wróć do oferty
          </button>
        </div>
      </section>
    </div>
  )
}

export default function FreelancerLandingPage() {

const [selectedProject, setSelectedProject] = useState(null)
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const footerLink =
  "group relative block w-fit text-zinc-400 transition duration-300 hover:text-[#d7ff70]"
const [scrollPosition, setScrollPosition] = useState(0)
const formRef = useRef();
const [formStatus, setFormStatus] = useState('')

useEffect(() => {
  const handlePopState = () => {
    if (!selectedProject) return

    setSelectedProject(null)

    window.history.replaceState(null, '', '/')

    setTimeout(() => {
      window.scrollTo(0, scrollPosition)
    }, 50)
  }

  window.addEventListener('popstate', handlePopState)

  return () => {
    window.removeEventListener('popstate', handlePopState)
  }
}, [selectedProject, scrollPosition])


const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      'service_aiw5sqx',
      'template_7dme2ou',
      formRef.current,
      'JYeqnRXIvSM541Xwz'
    )
    .then(() => {
  setFormStatus('success')
  formRef.current.reset()
})
    .catch((error) => {
  console.error(error)
  setFormStatus('error')
});
};

if (selectedProject) {
  return (
    <DemoPage
  title={selectedProject.title}
  industry={selectedProject.category}
  description={selectedProject.description}
  caseStudy={selectedProject.caseStudy}
  onBack={() => {
    window.history.back()
  }}
/>
  )
}

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-3xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="text-2xl font-black tracking-[-0.04em]">
            Polnex<span className="text-[#d7ff70]">.dev</span>
          </a>

         <nav className="hidden items-center gap-8 text-[15px] font-semibold tracking-wide text-zinc-300 lg:flex">
  <a
    href="#oferta"
    className="group relative transition duration-300 hover:text-[#d7ff70]"
  >
    Oferta
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a
    href="#proces"
    className="group relative transition duration-300 hover:text-[#d7ff70]"
  >
    Proces
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a
    href="#portfolio"
    className="group relative transition duration-300 hover:text-[#d7ff70]"
  >
    Co mogę stworzyć
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a
    href="#cennik"
    className="group relative transition duration-300 hover:text-[#d7ff70]"
  >
    Cennik
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a
  href="#faq"
  className="group relative transition duration-300 hover:text-[#d7ff70]"
>
  FAQ
  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
</a>

  <a
    href="#kontakt"
    className="group relative transition duration-300 hover:text-[#d7ff70]"
  >
    Kontakt
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>
</nav>

<button
  type="button"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 transition-all duration-300 hover:border-[#d7ff70]/30 lg:hidden"
>
  <span
    className={`absolute h-0.5 w-5 ${mobileMenuOpen ? 'bg-[#d7ff70]' : 'bg-white'} transition-all duration-300 ${
      mobileMenuOpen
        ? 'rotate-45'
        : '-translate-y-1.5'
    }`}
  />

  <span
    className={`absolute h-0.5 w-5 ${mobileMenuOpen ? 'bg-[#d7ff70]' : 'bg-white'} transition-all duration-300 ${
      mobileMenuOpen
        ? 'opacity-0'
        : 'opacity-100'
    }`}
  />

  <span
    className={`absolute h-0.5 w-5 ${mobileMenuOpen ? 'bg-[#d7ff70]' : 'bg-white'} transition-all duration-300 ${
      mobileMenuOpen
        ? '-rotate-45'
        : 'translate-y-1.5'
    }`}
  />
</button>

          <a href="#kontakt" className="hidden rounded-full bg-[#d7ff70] px-6 py-3 text-sm font-black text-black shadow-[0_0_30px_rgba(215,255,112,0.25)] transition hover:scale-[1.03] lg:flex">
            Darmowa wycena
          </a>
        </div>
      </header>

   <div
  className={`fixed left-0 right-0 top-[82px] z-40 border-b border-white/10 bg-[#080808]/95 px-6 py-5 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
    mobileMenuOpen
      ? 'pointer-events-auto translate-y-0 opacity-100'
      : 'pointer-events-none -translate-y-4 opacity-0'
  }`}
>
  <div className="flex flex-col gap-4 text-sm font-bold text-zinc-300">
    <a href="#oferta" onClick={() => setMobileMenuOpen(false)}>Oferta</a>
    <a href="#proces" onClick={() => setMobileMenuOpen(false)}>Proces</a>
    <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
    <a href="#cennik" onClick={() => setMobileMenuOpen(false)}>Cennik</a>
    <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
    <a href="#kontakt" onClick={() => setMobileMenuOpen(false)}>Kontakt</a>
    <a
  href="#kontakt"
  onClick={() => setMobileMenuOpen(false)}
  className="mt-3 rounded-2xl bg-[#d7ff70] px-5 py-4 text-center font-black text-black"
>
  Darmowa wycena
</a>
  </div>
</div>

      <main className="overflow-hidden pt-24">
        <section className="relative px-6 py-24 lg:py-32">
          <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d7ff70]/20 blur-[140px]" />
          <div className="absolute right-0 top-40 h-[350px] w-[350px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 shadow-2xl shadow-black/20">
                <span className="h-2 w-2 rounded-full bg-[#d7ff70]" />
                Web Design & Development
              </div>

              <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
                Strony internetowe, które wyglądają jak marka premium.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
                Projektuję i wdrażam nowoczesne landing page, strony firmowe oraz strony z CMS Sanity — dla firm, które chcą wyglądać profesjonalnie i skutecznie zdobywać klientów.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#cennik" className="rounded-2xl bg-[#d7ff70] px-8 py-4 text-lg font-black text-black shadow-[0_0_60px_rgba(215,255,112,0.25)] transition hover:scale-[1.02]">
                  Zobacz pakiety
                </a>
                <a href="#proces" className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10">
                  Jak wygląda współpraca
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#d7ff70]/20 via-white/5 to-blue-500/20 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[2rem] border border-white/10 bg-[#111] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="rounded-full bg-[#d7ff70] px-3 py-1 text-xs font-black text-black">LIVE</div>
                  </div>

                  <div className="rounded-[1.5rem] bg-white p-6 text-black">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="h-4 w-28 rounded-full bg-black" />
                      <div className="flex gap-2">
                        <div className="h-3 w-10 rounded-full bg-zinc-200" />
                        <div className="h-3 w-10 rounded-full bg-zinc-200" />
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] bg-zinc-950 p-6 text-white">
                      <div className="h-5 w-1/2 rounded-full bg-[#d7ff70]" />
                      <div className="mt-5 h-12 w-4/5 rounded-full bg-white" />
                      <div className="mt-4 h-3 w-full rounded-full bg-white/20" />
                      <div className="mt-3 h-3 w-2/3 rounded-full bg-white/20" />
                      <div className="mt-8 grid grid-cols-2 gap-3">
                        <div className="h-24 rounded-2xl bg-white/10" />
                        <div className="h-24 rounded-2xl bg-[#d7ff70]" />
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="h-20 rounded-2xl bg-zinc-100" />
                      <div className="h-20 rounded-2xl bg-zinc-100" />
                      <div className="h-20 rounded-2xl bg-zinc-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-6 py-8">
          <div className="mx-auto grid max-w-7xl gap-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-zinc-500 md:grid-cols-4">
            <div>Design</div>
            <div>Development</div>
            <div>CMS Sanity</div>
            <div>SEO Ready</div>
          </div>
        </section>

        <section id="oferta" className="px-6 py-24 lg:py-32 scroll-mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">Oferta</p>
                <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">Strona dopasowana do etapu Twojego biznesu.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400">
                Nie sprzedaję przypadkowych szablonów. Buduję stronę wokół celu: zapytania, sprzedaży, wiarygodności albo prezentacji marki.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map(([title, text]) => (
                <div key={title} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                  <div className="mb-8 h-12 w-12 rounded-2xl bg-[#d7ff70] transition group-hover:rotate-6" />
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-4 leading-7 text-zinc-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proces" className="border-y border-white/10 bg-[#0f0f0f] px-6 py-24 text-white lg:py-32 scroll-mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">Proces</p>
              <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">Jasny proces, konkretne etapy, zero zgadywania.</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {process.map(([number, title, text]) => (
                <div key={number} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
                  <div className="text-6xl font-black tracking-[-0.08em] text-[#d7ff70]">{number}</div>
                  <h3 className="mt-8 text-2xl font-black">{title}</h3>
                  <p className="mt-4 leading-7 text-zinc-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="px-6 py-24 lg:py-32 scroll-mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">Co mogę stworzyć</p>
                <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">Przykładowe projekty pokazujące możliwości wykonania strony internetowej.</h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-zinc-400">
                Przykładowe koncepty pokazujące styl projektowania, układ sekcji oraz sposób budowania nowoczesnych stron internetowych.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {portfolio.map((project) => (
    <button
    
      type="button"
      key={project.title}
      onClick={() => {
  setScrollPosition(window.scrollY)
  setSelectedProject(project)

  window.history.pushState(
    { demoOpen: true },
    '',
    `#demo-${project.title.toLowerCase().replaceAll(' ', '-')}`
  )

  window.scrollTo(0, 0)
}}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left transition duration-500 hover:-translate-y-2 hover:border-[#d7ff70]/40 hover:bg-white/[0.06] hover:shadow-[0_0_60px_rgba(215,255,112,0.08)]"
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d7ff70]/10 blur-3xl" />
</div>
      <div className="relative h-72 overflow-hidden border-b border-white/10">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3">
  <div
    className={`h-2.5 w-2.5 rounded-full ${
      project.package === 'Mini'
        ? 'bg-zinc-400'
        : project.package === 'Starter'
        ? 'bg-pink-400'
        : project.package === 'Business'
        ? 'bg-orange-400'
        : 'bg-[#d7ff70]'
    }`}
  />

  <p
    className={`inline-flex w-fit rounded-full border px-4 py-2 text-[12px] font-black uppercase tracking-[0.24em] ${
      project.package === 'Mini'
        ? 'border-zinc-500/20 bg-zinc-500/10 text-zinc-300'
        : project.package === 'Starter'
        ? 'border-pink-500/20 bg-pink-500/10 text-pink-300'
        : project.package === 'Business'
        ? 'border-orange-500/20 bg-orange-500/10 text-orange-300'
        : 'border-[#d7ff70]/20 bg-[#d7ff70]/10 text-[#d7ff70]'
    }`}
  >
    {project.package}
  </p>
</div>

        <h3 className="mt-4 text-3xl font-black tracking-tight text-white">
          {project.title}
        </h3>

        <p className="mt-4 leading-7 text-zinc-400">
          {project.description}
        </p>

        <p className="mt-auto pt-8 text-sm font-bold text-zinc-500 transition group-hover:text-[#d7ff70]">
          Zobacz demo →
        </p>
      </div>
    </button>
    
  ))}
</div>
          </div>
        </section>

           <section id="cennik" className="px-6 py-24 lg:py-32 scroll-mt-28">
  <div className="mx-auto max-w-7xl">
    <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">
          Cennik
        </p>

        <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
          Pakiety, które jasno pokazują zakres.
        </h2>
      </div>

      <p className="max-w-xl text-lg leading-8 text-zinc-400">
        Finalna cena zależy od liczby podstron, CMS-a, animacji, tekstów,
        integracji i terminu. Dzięki pakietom klient od razu widzi, co realnie dostaje.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {packages.map((plan) => (
        <div
  id={plan.name.toLowerCase()}
  key={plan.name}
          className={`relative flex flex-col rounded-[2rem] border p-7 ${
            plan.highlighted
              ? 'border-[#d7ff70]/40 bg-[#d7ff70]/10 shadow-[0_0_60px_rgba(215,255,112,0.08)]'
              : 'border-white/10 bg-white/[0.04]'
          }`}
        >
          {plan.highlighted && (
  <div className="mb-5 w-fit rounded-full bg-[#d7ff70] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black">
    Popularny
  </div>
)}

          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d7ff70]">
            {plan.tag}
          </p>

          <h3 className="mt-5 text-3xl font-black">
            {plan.name}
          </h3>

          <div className="mt-4 text-2xl font-black text-white">
            {plan.price}
          </div>

          <p className="mt-5 leading-7 text-zinc-400">
            {plan.description}
          </p>

          <div className="mt-8">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
              W pakiecie
            </p>

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <span className="mt-1 text-[#d7ff70]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
              Nie zawiera
            </p>

            <ul className="space-y-2">
              {plan.notIncluded.map((item) => (
                <li key={item} className="text-sm text-zinc-500">
                  — {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
      <h3 className="text-3xl font-black">
        Dodatki i rozszerzenia
      </h3>

      <p className="mt-3 text-zinc-400">
        Elementy, które można dobrać do pakietu zależnie od potrzeb projektu.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {addOns.map(([name, price]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="text-zinc-400">{name}</div>
            <div className="mt-2 text-xl font-black text-white">{price}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<section id="faq" className="px-6 py-24 scroll-mt-28">
  <div className="mx-auto max-w-5xl">
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">
        FAQ
      </p>

      <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
        Najczęściej zadawane pytania
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Odpowiedzi na pytania, które najczęściej pojawiają się przed rozpoczęciem współpracy.
      </p>
    </div>

    <div className="mt-14 space-y-4">
      {[
        [
          'Ile trwa realizacja strony?',
          'Pakiet Mini zwykle 3–7 dni, Starter około 1–2 tygodnie, Business i Premium od 2 do 6 tygodni zależnie od zakresu projektu.',
        ],
        [
          'Czy pomagasz po wdrożeniu?',
          'Tak. Każdy projekt obejmuje wsparcie startowe po publikacji. Pakiet Premium zawiera dodatkowo 30 dni wsparcia technicznego.',
        ],
        [
          'Czy mogę samodzielnie edytować treści?',
          'Tak. W pakietach Business i Premium można wdrożyć CMS, dzięki któremu samodzielnie zmienisz teksty, zdjęcia i wpisy.',
        ],
        [
          'Czy pomagasz z domeną i hostingiem?',
          'Tak. Mogę pomóc w wyborze hostingu, konfiguracji domeny oraz publikacji gotowej strony.',
        ],
        [
          'Czy strony są przygotowane pod SEO?',
          'Tak. Każda strona zawiera podstawy SEO technicznego, a pakiety Business i Premium mają rozszerzoną optymalizację.',
        ],
      ].map(([question, answer]) => (
        <div
          key={question}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:border-[#d7ff70]/20 hover:bg-white/[0.06]"
        >
          <h3 className="text-xl font-black">
            {question}
          </h3>

          <p className="mt-4 leading-7 text-zinc-400">
            {answer}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="px-6 py-24">
  <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-10 text-center md:p-16">

    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d7ff70]/10 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#d7ff70]/5 blur-3xl" />

    <div className="relative z-10">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">
        Gotowy na nową stronę?
      </p>

      <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] md:text-6xl">
        Opowiedz mi o swoim projekcie.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Niezależnie czy potrzebujesz prostego landing page'a,
        strony firmowej czy projektu premium — przygotuję zakres prac,
        wycenę i zaproponuję najlepsze rozwiązanie.
      </p>

      <a
        href="#kontakt"
        className="mt-10 inline-flex rounded-full bg-[#d7ff70] px-8 py-4 font-black text-black shadow-[0_0_40px_rgba(215,255,112,0.2)] transition hover:scale-[1.03]"
      >
        Poproś o wycenę
      </a>
    </div>
  </div>
</section>

<section className="px-6 py-24">
  <div className="mx-auto max-w-7xl">
    <div className="mb-16 text-center">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">
        Dlaczego Polnex.dev
      </p>

      <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
        Strony, które wyglądają dobrze i sprzedają.
      </h2>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        [
          '⚡',
          'Szybka realizacja',
          'Jasny proces i sprawna komunikacja od początku projektu.',
        ],
        [
          '📱',
          'Mobile First',
          'Strony dopracowane przede wszystkim pod telefony.',
        ],
        [
          '🎯',
          'Skupienie na konwersji',
          'Projektowanie pod zapytania i klientów, nie tylko wygląd.',
        ],
        [
          '🚀',
          'Nowoczesne technologie',
          'React, Next.js, CMS i szybkie wdrożenia.',
        ],
      ].map(([icon, title, text]) => (
        <div
          key={title}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition hover:-translate-y-1 hover:border-[#d7ff70]/20 hover:bg-white/[0.06]"
        >
          <div className="mb-6 text-4xl">{icon}</div>

          <h3 className="text-2xl font-black">
            {title}
          </h3>

          <p className="mt-4 leading-7 text-zinc-400">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>



        <section id="kontakt" className="px-6 pb-24 lg:pb-32 scroll-mt-28">
  <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
    <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-10 md:p-14">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#d7ff70]">
        Kontakt
      </p>

      <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
        Zróbmy stronę, która wygląda drożej niż kosztuje.
      </h2>

      <p className="mt-6 text-lg leading-8 text-zinc-400">
        Napisz, czego potrzebujesz: landing page, strona firmowa, CMS,
        redesign albo opieka techniczna. Przygotuję jasny zakres i wycenę.
      </p>

      <div className="mt-10 grid gap-4">
        <a
          href="tel:+48785321206"
          className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-[#d7ff70]/30"
        >
          <div>
            <div className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
              Telefon
            </div>
            <div className="mt-2 text-lg font-black text-white transition group-hover:text-[#d7ff70]">
              +48 785 321 206
            </div>
          </div>

          <span className="text-zinc-500 transition group-hover:text-[#d7ff70]">
            Zadzwoń →
          </span>
        </a>

        <a
          href="mailto:polnex.dev@gmail.com"
          className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-[#d7ff70]/30"
        >
          <div>
            <div className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
              Email
            </div>
            <div className="mt-2 text-lg font-black text-white transition group-hover:text-[#d7ff70]">
              polnex.dev@gmail.com
            </div>
          </div>

          <span className="text-zinc-500 transition group-hover:text-[#d7ff70]">
            Napisz →
          </span>
        </a>
      </div>

      <p className="mt-6 text-sm leading-7 text-zinc-500">
        Odpowiadam zwykle tego samego dnia. Jeśli projekt jest pilny,
        najlepiej napisz od razu krótko: typ strony, branża i termin.
      </p>
    </div>

    <form
  ref={formRef}
  onSubmit={sendEmail}
  className="flex h-full flex-col rounded-[2.5rem] bg-white p-8 text-black shadow-2xl md:p-10"
>
  <div>
    <p className="text-sm font-black uppercase tracking-[0.22em] text-zinc-400">
      Bezpłatna wycena
    </p>

    <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
      Opisz projekt w kilku zdaniach.
    </h3>

    <p className="mt-3 leading-7 text-zinc-500">
      Im więcej konkretów podasz, tym szybciej przygotuję sensowną propozycję.
    </p>
  </div>

  <div className="mt-8 grid gap-5 md:grid-cols-2">
    <input
      name="user_name"
      required
      className="rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 text-black caret-black outline-none focus:border-black"
      placeholder="Imię"
    />

    <input
      name="user_email"
      type="email"
      required
      className="rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 text-black caret-black outline-none focus:border-black"
      placeholder="Email"
    />
  </div>

  <select
    name="project_type"
    required
    className="mt-5 w-full rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 text-black outline-none focus:border-black"
    defaultValue=""
  >
    <option value="" disabled>
      Wybierz typ projektu
    </option>
    <option>Landing Page</option>
    <option>Strona firmowa</option>
    <option>CMS / Blog</option>
    <option>Redesign strony</option>
    <option>Inny projekt</option>
  </select>

  <select
    name="budget"
    required
    className="mt-5 w-full rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 text-black outline-none focus:border-black"
    defaultValue=""
  >
    <option value="" disabled>
      Szacowany budżet
    </option>
    <option>600 - 1000 zł</option>
    <option>1200 - 1200 zł</option>
    <option>2500 - 4500 zł</option>
    <option>5000 - 9000 zł</option>
    <option>10000+ zł</option>
  </select>

  <textarea
    name="message"
    required
    className="mt-5 min-h-40 w-full rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 text-black caret-black outline-none focus:border-black"
    placeholder="Opisz krótko projekt, branżę, termin i najważniejsze funkcje"
  />

  <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-zinc-500">
    <span>✓ Darmowa wycena</span>
    <span>✓ Odpowiedź zwykle tego samego dnia</span>
    <span>✓ Bez zobowiązań</span>
  </div>

  <button
    type="submit"
    className="mt-6 w-full cursor-pointer rounded-2xl bg-black px-8 py-4 text-lg font-black text-white transition hover:bg-zinc-800"
  >
    Wyślij zapytanie
  </button>

  {formStatus === 'success' && (
  <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-center text-sm font-semibold text-green-700">
    ✓ Dziękuję! Wiadomość została wysłana. Odpowiem najszybciej jak to możliwe.
  </div>
)}

{formStatus === 'error' && (
  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
    Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub napisz bezpośrednio na email.
  </div>
)}

  <p className="mt-4 text-center text-sm text-zinc-500">
    Po wysłaniu wrócę z odpowiedzią i wstępną wyceną.
  </p>
</form>
  </div>
</section>

        <footer className="border-t border-white/10 px-6 py-16">
  <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
    <div>
      <div className="text-3xl font-black tracking-[-0.05em]">
        Polnex<span className="text-[#d7ff70]">.</span>dev
      </div>

      <p className="mt-4 max-w-xs leading-7 text-zinc-400">
        Nowoczesne strony internetowe dla firm, usług lokalnych i marek,
        które chcą wyglądać profesjonalnie online.
      </p>
    </div>

    <div>
      <h3 className="mb-4 font-black text-white">Nawigacja</h3>

      <div className="space-y-3">
  <a href="#oferta" className={footerLink}>
    Oferta
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#portfolio" className={footerLink}>
    Portfolio
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#cennik" className={footerLink}>
    Cennik
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#faq" className={footerLink}>
    FAQ
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>
</div>
    </div>

    <div>
  <h3 className="mb-4 font-black text-white">Pakiety</h3>

 <div className="space-y-3">
  <a href="#mini" className={footerLink}>
    Mini — szybki start
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#starter" className={footerLink}>
    Starter — landing page
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#business" className={footerLink}>
    Business — strona firmowa
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#premium" className={footerLink}>
    Premium — custom projekt
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>
</div>
</div>

    <div>
      <h3 className="mb-4 font-black text-white">Kontakt</h3>

      <div className="space-y-3">
  <a href="tel:+48785321206" className={footerLink}>
    +48 785 321 206
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="mailto:polnex.dev@gmail.com" className={footerLink}>
    polnex.dev@gmail.com
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d7ff70] transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a
    href="#kontakt"
    className="mt-3 inline-flex rounded-full bg-[#d7ff70] px-5 py-3 text-sm font-black text-black transition hover:scale-[1.03]"
  >
    Napisz wiadomość
  </a>
</div>
    </div>
  </div>

  <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
    <div>
      © {new Date().getFullYear()} Polnex.dev. Wszelkie prawa zastrzeżone.
    </div>

    <div>
      Projektowane i rozwijane w React.
    </div>
  </div>
</footer>

      </main>
      <a
  href="https://wa.me/48785321206?text=Cześć,%20chcę%20wycenę%20strony."
  target="_blank"
  rel="noreferrer"
  className="fixed bottom-6 right-6 z-[999] flex items-center bg-zinc-950 border border-[#25D366]/100 gap-3 rounded-full bg-[#1a7f4b] px-5 py-4 text-white shadow-[0_00px_40px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-110 hover:shadow-[0_02px_45px_rgba(31,157,87,0.35)]"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="h-7 w-7 fill-current"
  >
    <path d="M19.11 17.39c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.31.21-.59.07-.28-.14-1.17-.43-2.22-1.38-.82-.73-1.37-1.64-1.53-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.34.41-.5.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.3s.98 2.68 1.12 2.87c.14.18 1.93 2.95 4.68 4.13.66.28 1.18.45 1.58.58.66.21 1.27.18 1.75.11.53-.08 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.53-.33z"/>
    <path d="M16.02 3C8.83 3 3 8.83 3 16c0 2.3.6 4.54 1.74 6.51L3 29l6.67-1.69A12.94 12.94 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3zm0 23.64c-2.01 0-3.97-.54-5.69-1.56l-.41-.24-3.96 1 1.06-3.86-.27-.4a10.61 10.61 0 1 1 9.27 5.06z"/>
  </svg>

  <span className="hidden lg:block font-black">
    WhatsApp
  </span>
</a>
    </div>
  )
}
