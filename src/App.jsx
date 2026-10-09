import { useEffect, useRef, useState } from 'react'
import './App.css'
import companyLogo from './assets/hero.png'
import heroImage1 from './assets/images/photo-1565793298595-6a879b1d9492.jpg'
import heroImage2 from './assets/images/photo-1504917595217-d4dc5ebe6122.jpg'
import heroImage3 from './assets/images/photo-1513828583688-c52646db42da.jpg'
import aboutImage from './assets/images/photo-1581091226825-a6a2a5aee158.jpg'
import visionImage from './assets/images/photo-1581092918056-0c4c3acd3789.jpg'
import facilityImage from './assets/images/photo-1518709268805-4e9042af9f23.jpg'
import productImage2 from './assets/images/photo-1567789884554-0b844b597180.jpg'
import productImage4 from './assets/images/photo-1581092160562-40aa08e78837.jpg'

/* ------------------------------------------------------------------ */
/*  EDIT HERE: saari images / text / contact details yahin se badlo   */
/* ------------------------------------------------------------------ */
const IMAGES = {
  hero: [heroImage1, heroImage2, heroImage3],
  about: aboutImage,
  vision: visionImage,
  facility: facilityImage,
  products: [heroImage1, productImage2, facilityImage, productImage4, heroImage2, heroImage3],
}

const COMPANY = {
  name: 'Idhayan Industries',
  legal: 'Idhayan Industries Private Limited',
  gstin: '23ABGCS7544H1Z7',
  office: 'Survey No. 5/6/1, 17 Pipliya Kumar, AB Road, Indore, Madhya Pradesh – 452010',
  godown:
    'Godown No. 5-6, Plot No. 79, Near NATRIP, Smart Industrial Area, Pithampur Industrial Area, Dhar, Madhya Pradesh – 454774',
  phone: '', // TODO: phone number
  email: '', // TODO: email
  hours: '', // TODO: e.g. Monday to Saturday, 10:00 AM – 6:00 PM
  established: '', // TODO: year of incorporation
  team: '', // TODO: optional
  serviceArea: '', // TODO: e.g. Madhya Pradesh and neighbouring states
  cin: '', // TODO: optional
}

const NAV = [
  ['About', '#about'],
  ['Products', '#products'],
  ['Applications', '#applications'],
  ['Locations', '#locations'],
  ['Leadership', '#leadership'],
  ['Contact', '#contact'],
]

const HERO = {
  title: 'Idhayan Industries',
  accent: 'Private Limited',
  tagline: 'Your Trusted Trading Partner for Steel, Wire and Industrial Materials',
  intro:
    'Idhayan Industries Private Limited is a registered private limited company based in Indore, Madhya Pradesh, engaged in the trading and supply of steel wires, TMT bars, prestressed concrete strands, coils, plates, mesh and industrial raw materials. We serve construction, infrastructure and manufacturing customers with reliable supply and dependable service.',
}

const PRODUCTS = [
  {
    name: 'Steel Wires',
    items: [
      { name: 'Shutter Wire', spec: '5.00 mm, 5.3 mm, 5.5 mm, 6.00 mm, 6.3 mm, 7.00 mm, 8.00 mm' },
      { name: 'Binding Wire', spec: '0.91 mm and 1.22 mm' },
      { name: 'Tata Binding Wire', spec: '0.91 mm, 20 SWG, 30 kg' },
      { name: 'G.I. Wire (TW02)', spec: '1.60 mm, 2.00 mm, 2.50 mm, 3.00 mm, 4.00 mm' },
      { name: 'Base Steel Wire' },
      { name: 'Wire PCSR', spec: '4.00 mm' },
    ],
  },
  {
    name: 'Prestressed Concrete (PC) Strands and Wires',
    items: [
      { name: 'PC Strand', spec: '12.90 mm, 1860 MPa, Oiled' },
      { name: 'PC Strand', spec: '15.20 mm, 1860 MPa, Oiled' },
      { name: 'IS 6006 Uncoated Stress Relieved Strand', spec: '(3x3)' },
    ],
  },
  {
    name: 'TMT Bars',
    items: [{ name: 'TMT Bars', spec: '8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm' }],
  },
  {
    name: 'Coils',
    items: [
      { name: 'Galvalume Coils', spec: 'AZ 150 / 550 MPa: 0.9 mm and 1.2 mm' },
      { name: 'GP (Galvanised Plain) Coils', spec: '80 GSM, 250 MPa, 1.5 mm; 2.00 x 1250 mm' },
      { name: 'Tata GP Coil CG45', spec: '1.2 x 1250 mm' },
      { name: 'MS Round in Coil', spec: '5.5 mm (wire rod)' },
    ],
  },
  {
    name: 'Plates and Mesh',
    items: [
      { name: 'HR Plate', spec: '12000 x 2000 x 16 mm' },
      { name: 'Welded Mesh', spec: '7 mm dia' },
    ],
  },
  {
    name: 'Raw Material',
    items: [{ name: 'Zinc Ingots', spec: 'HSN 79011100' }],
  },
]

const USES = [
  ['Shutter Wire', 'Rolling shutters and allied fabrication work.'],
  ['Binding Wire and G.I. Wire', 'Reinforcement tying, fencing, binding and general-purpose wire applications.'],
  ['TMT Bars and Welded Mesh', 'Reinforced concrete construction, including buildings, slabs, flooring and infrastructure works.'],
  ['PC Strands and PCSR Wire', 'Prestressed concrete elements such as beams, slabs, poles and precast products.'],
  ['Galvalume and GP Coils', 'Roofing, cladding and sheet manufacturing.'],
  ['HR Plates and MS Round in Coil', 'Fabrication, structural work and wire drawing.'],
  ['Zinc Ingots', 'Galvanising and metal-processing industries.'],
]

const INDUSTRIES = [
  'Construction and real estate',
  'Infrastructure and precast concrete',
  'Roofing and metal sheet manufacturing',
  'Wire drawing and fabrication units',
  'Galvanising and general manufacturing',
  'Retailers, traders and hardware dealers',
]

const STRENGTHS = [
  ['Complete range under one roof', 'Wires, bars, strands, coils, plates and raw materials from a single supplier.'],
  ['Two-location network', 'An office in Indore for dealing and a godown in Pithampur for stocking and dispatch.'],
  ['Transparent dealing', 'Clear quotations, GST-compliant invoicing and honest communication.'],
  ['Reliable supply', 'Planned stock of commonly used sizes, with other sizes on request.'],
  ['Customer-first service', 'Quick response to enquiries and support from quotation to delivery.'],
]

const VALUES = [
  ['Integrity', 'We do business openly and keep our commitments.'],
  ['Quality', 'We supply material that meets the specification the customer asked for.'],
  ['Reliability', 'We aim to deliver on time, every time.'],
  ['Long-term relationships', 'We value repeat customers more than one-time orders.'],
]

const WHY = [
  ['Wide Product Range', 'A single source for wires, bars, strands, coils, plates and raw materials.'],
  ['Strategic Locations', 'Our office in Indore and our godown in Pithampur support efficient stocking and dispatch.'],
  ['Registered and Compliant', 'We operate as a GST-registered private limited company, with complete and proper documentation on every transaction.'],
  ['Customer-Focused Service', 'Prompt response to enquiries and clear communication from quotation to delivery.'],
  ['Experienced Leadership', 'Guided by a Managing Director and Board of Directors who are residents of Madhya Pradesh.'],
]

const LEADERS = [
  { name: 'Siddharth Dhanotia', title: 'Mr.', role: 'Managing Director' },
  { name: 'Sharmila Dhanotia', title: 'Mrs.', role: 'Director' },
  { name: 'Dhiren Patel', title: 'Mr.', role: 'Director' },
]

/* ------------------------------ helpers ---------------------------- */
function Img({ src, alt, className }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className={`img-fallback ${className || ''}`} role="img" aria-label={alt} />
  ) : (
    <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  )
}

function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

function Counter({ to, suffix = '' }) {
  const [ref, seen] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const dur = 1400
    const t0 = performance.now()
    let raf = 0
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{n}{suffix}</span>
}

function Reveal({ children, className = '' }) {
  const [ref, seen] = useInView(0.12)
  return <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</div>
}

function Feat({ items }) {
  return (
    <div className="feat">
      {items.map(([h, p]) => (
        <div key={h}><h3>{h}</h3><p>{p}</p></div>
      ))}
    </div>
  )
}

/* -------------------------------- app ------------------------------ */
function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const track = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTrack = (dir) =>
    track.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })

  const glance = [
    ['Company', COMPANY.legal],
    ['Type', 'Private Limited Company'],
    ['Business', 'Trading of steel, wire and industrial materials'],
    ['Registered Office', 'AB Road, Indore, Madhya Pradesh'],
    ['Godown', 'Pithampur Industrial Area, Dhar, Madhya Pradesh'],
    ['GST Registered Since', 'October 2021'],
    ['Established', COMPANY.established],
    ['Team Size', COMPANY.team],
    ['Service Area', COMPANY.serviceArea],
  ]

  const details = [
    ['Legal Name', COMPANY.legal],
    ['Constitution', 'Private Limited Company'],
    ['GSTIN', COMPANY.gstin],
    ['GST Registration Type', 'Regular'],
    ['CIN', COMPANY.cin],
  ]

  return (
    <div className="site">
      {/* ---------- header ---------- */}
      <header className={`header ${scrolled ? 'solid' : ''}`}>
        <a href="#top" className="brand" aria-label={COMPANY.name}>
          <img className="brand-logo" src={companyLogo} alt="Idhayan Industries Private Limited" />
        </a>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="btn btn-sm" href="#contact" onClick={() => setOpen(false)}>Request a Quote <span>↗</span></a>
        </nav>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </header>

      {/* ---------- home / hero ---------- */}
      <section id="top" className="hero">
        <div className="hero-slide active">
          <Img src={IMAGES.hero[0]} alt="" className="hero-img" />
        </div>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="kicker">Indore · Pithampur · Madhya Pradesh</p>
          <h1>{HERO.title}<br /><span>{HERO.accent}</span></h1>
          <p className="hero-tag">{HERO.tagline}</p>
          <p className="hero-text">{HERO.intro}</p>
          <div className="hero-actions">
            <a className="btn" href="#products">View Our Products <span>→</span></a>
            <a className="btn btn-ghost" href="#contact">Request a Quote <span>↗</span></a>
          </div>
        </div>
      </section>

      {/* ---------- trust strip ---------- */}
      <section className="strip">
        <span>GST Registered</span><i />
        <span>Private Limited Company</span><i />
        <span>Indore Office</span><i />
        <span>Pithampur Godown</span>
      </section>

      {/* ---------- about us ---------- */}
      <section id="about" className="section split">
        <Reveal className="split-media">
          <Img src={IMAGES.about} alt="Steel and industrial materials" />
        </Reveal>
        <Reveal className="split-body">
          <p className="eyebrow">About Us</p>
          <h2>Quality material, transparent dealing, timely delivery</h2>
          <p>
            Idhayan Industries Private Limited is a private limited company registered in Madhya
            Pradesh under the Goods and Services Tax Act, 2017. Our registered office is located
            on AB Road, Indore, and our godown is situated in the Pithampur Industrial Area, Dhar,
            one of the foremost industrial hubs of the state.
          </p>
          <p>
            We trade in a wide range of steel and allied products, including shutter wire, binding
            wire, G.I. wire, TMT bars, PC strands, galvanised and galvalume coils, HR plates,
            welded mesh and zinc ingots. Our business is built on three principles: quality
            material, transparent dealing and timely delivery.
          </p>
        </Reveal>
      </section>

      {/* ---------- mission / vision / who we are ---------- */}
      <section className="section split reverse tint">
        <Reveal className="split-media">
          <Img src={IMAGES.vision} alt="Industrial workshop" />
        </Reveal>
        <Reveal className="split-body">
          <p className="eyebrow">Who We Are</p>
          <h2>A Madhya Pradesh based trading company</h2>
          <p>
            Idhayan Industries Private Limited is a Madhya Pradesh based trading company supplying
            steel and allied industrial materials. We have held a regular GST registration since
            October 2021, and we operate from a registered office in Indore and a dedicated godown
            in the Pithampur Industrial Area. Our Managing Director and Directors are residents of
            Madhya Pradesh and are closely involved in the business.
          </p>
          <div className="mv">
            <div>
              <h4>Our Mission</h4>
              <p>To supply quality steel and industrial materials to our customers at fair prices, with consistency and integrity.</p>
            </div>
            <div>
              <h4>Our Vision</h4>
              <p>To become a preferred and dependable trading partner in the steel and industrial materials sector across Madhya Pradesh and beyond.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- stats ---------- */}
      <section className="stats">
        <div><b><Counter to={PRODUCTS.length} /></b><span>Product<br />Categories</span></div>
        <div><b><Counter to={2} /></b><span>Operating<br />Locations</span></div>
        <div><b><Counter to={INDUSTRIES.length} /></b><span>Industries<br />Served</span></div>
        <div><b><Counter to={LEADERS.length} /></b><span>Directors &amp;<br />Leaders</span></div>
      </section>

      {/* ---------- what we do ---------- */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">What We Do</p>
          <h2>The right material, in the right size, at the right time</h2>
          <p className="lead">
            We source, stock and supply steel wires, TMT bars, prestressed concrete strands, coils,
            plates, welded mesh and zinc ingots to contractors, fabricators, manufacturers and
            dealers. Our role is simple: to make the right material available in the right size, at
            the right time, with proper documentation.
          </p>
        </Reveal>
      </section>

      {/* ---------- products ---------- */}
      <section id="products" className="section tint">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">Our Products</p>
              <h2>Steel, wire and industrial<br />materials from one supplier</h2>
            </div>
            <div className="arrows">
              <button onClick={() => scrollTrack(-1)} aria-label="Previous">←</button>
              <button onClick={() => scrollTrack(1)} aria-label="Next">→</button>
            </div>
          </div>
        </Reveal>
        <div className="track" ref={track}>
          {PRODUCTS.map((c, i) => (
            <article className="card prod" key={c.name}>
              <div className="card-img"><Img src={IMAGES.products[i % IMAGES.products.length]} alt={c.name} /></div>
              <div className="card-body">
                <h3>{i + 1}. {c.name}</h3>
                <ul className="spec">
                  {c.items.map((it, j) => (
                    <li key={it.name + j}>
                      <b>{it.name}</b>
                      {it.spec && <span>{it.spec}</span>}
                    </li>
                  ))}
                </ul>
                <a className="link-arrow" href="#contact">Request a quote <span>→</span></a>
              </div>
            </article>
          ))}
        </div>
        <p className="note">
          Other sizes and specifications are available on request. Please contact us for current rates and availability.
        </p>
      </section>

      {/* ---------- applications ---------- */}
      <section id="applications" className="section">
        <Reveal>
          <p className="eyebrow">Where Our Materials Are Used</p>
          <h2>Applications across construction and industry</h2>
        </Reveal>
        <div className="uses">
          {USES.map(([h, p]) => (
            <div key={h}><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div>
        <Reveal>
          <h3 className="sub">Industries We Serve</h3>
          <div className="chips">
            {INDUSTRIES.map((x) => <span key={x}>{x}</span>)}
          </div>
        </Reveal>
      </section>

      {/* ---------- strengths ---------- */}
      <section className="section tint">
        <Reveal>
          <p className="eyebrow">Our Strengths</p>
          <h2>Why customers rely on us</h2>
        </Reveal>
        <Feat items={STRENGTHS} />
      </section>

      {/* ---------- values ---------- */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">Our Values</p>
          <h2>How we do business</h2>
        </Reveal>
        <Feat items={VALUES} />
      </section>

      {/* ---------- MD message ---------- */}
      <section className="section tint">
        <Reveal className="quote">
          <p className="eyebrow">Message from the Managing Director</p>
          <blockquote>
            “At Idhayan Industries, we believe that trust is the strongest foundation in trading.
            Our aim is to be a dependable partner to every customer, whether the requirement is a
            single size of wire or a large project order.”
          </blockquote>
          <cite>Siddharth Dhanotia, Managing Director</cite>
        </Reveal>
      </section>

      {/* ---------- why choose us ---------- */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">Why Choose Us</p>
          <h2>A dependable trading partner</h2>
        </Reveal>
        <Feat items={WHY} />
      </section>

      {/* ---------- at a glance ---------- */}
      <section className="section tint">
        <Reveal>
          <p className="eyebrow">At a Glance</p>
          <h2>Idhayan Industries in brief</h2>
        </Reveal>
        <div className="facts">
          {glance.filter(([, v]) => v).map(([k, v]) => (
            <div key={k}><span>{k}</span><b>{v}</b></div>
          ))}
        </div>
      </section>

      {/* ---------- locations ---------- */}
      <section id="locations" className="facility">
        <Img src={IMAGES.facility} alt="Idhayan godown" className="facility-bg" />
        <div className="facility-shade" />
        <Reveal className="facility-inner">
          <p className="eyebrow light">Our Locations</p>
          <h2>Indore for dealing. Pithampur for stocking and dispatch.</h2>
          <div className="facility-grid">
            <div>
              <h4>Registered Office</h4>
              <p>{COMPANY.office}</p>
            </div>
            <div>
              <h4>Godown (Warehouse)</h4>
              <p>{COMPANY.godown}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- leadership + company details ---------- */}
      <section id="leadership" className="section">
        <Reveal>
          <p className="eyebrow">Our Leadership and Company Information</p>
          <h2>Leadership rooted in Madhya Pradesh</h2>
        </Reveal>
        <div className="leaders">
          {LEADERS.map((l) => (
            <Reveal key={l.name} className="leader">
              <div className="avatar">{l.name.split(' ').map((w) => w[0]).join('')}</div>
              <h3>{l.title} {l.name}</h3>
              <p>{l.role}</p>
            </Reveal>
          ))}
        </div>
        <Reveal><h3 className="sub">Company Details</h3></Reveal>
        <div className="facts">
          {details.filter(([, v]) => v).map(([k, v]) => (
            <div key={k}><span>{k}</span><b>{v}</b></div>
          ))}
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section id="contact" className="contact">
        <Reveal className="contact-inner">
          <p className="eyebrow light">Contact Us</p>
          <h2>Request a Quote</h2>
          <p>Tell us the product, size and quantity you need. Our team will respond promptly.</p>
          {(COMPANY.phone || COMPANY.email || COMPANY.hours) && (
            <p className="enq">
              {COMPANY.phone}{COMPANY.phone && COMPANY.email && ' | '}{COMPANY.email}
              {COMPANY.hours && <><br />Business Hours: {COMPANY.hours}</>}
            </p>
          )}
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you! We will contact you soon.')
              e.currentTarget.reset()
            }}
          >
            <input required name="name" placeholder="Name" />
            <input name="company" placeholder="Company Name" />
            <input name="phone" placeholder="Phone" />
            <input required name="email" type="email" placeholder="Email" />
            <select name="product" defaultValue="" required>
              <option value="" disabled>Product Required</option>
              {PRODUCTS.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
            <input name="quantity" placeholder="Quantity" />
            <textarea name="message" rows="4" placeholder="Message" />
            <button className="btn" type="submit">Send enquiry <span>→</span></button>
          </form>
        </Reveal>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <a href="#top" className="brand light">
              <img className="brand-logo" src={companyLogo} alt="Idhayan Industries Private Limited" />
            </a>
            <p className="muted">Your Trusted Trading Partner for Steel, Wire and Industrial Materials</p>
            {(COMPANY.phone || COMPANY.email) && (
              <p className="muted">{COMPANY.phone}<br />{COMPANY.email}</p>
            )}
          </div>
          <div>
            <h5>Quick Links</h5>
            {NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
          </div>
          <div>
            <h5>Locations</h5>
            <p className="muted">{COMPANY.office}</p>
            <p className="muted">{COMPANY.godown}</p>
          </div>
        </div>
        <div className="legal">
          © 2026 {COMPANY.legal}. All rights reserved. GSTIN: {COMPANY.gstin} | Indore, Madhya Pradesh
        </div>
      </footer>
    </div>
  )
}

export default App
