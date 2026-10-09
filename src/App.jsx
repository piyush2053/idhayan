import { useEffect, useRef, useState } from 'react'
import './App.css'
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
  hero: [
    heroImage1,
    heroImage2,
    heroImage3,
  ],
  about: aboutImage,
  vision: visionImage,
  facility: facilityImage,
  products: [
    facilityImage,
    productImage2,
    heroImage2,
    productImage4,
  ],
}

const COMPANY = {
  name: 'Idhayan Industries',
  legal: 'Idhayan Industries Private Limited',
  gstin: '23ABGCS7544H1Z7',
  since: 2021,
  office: 'Survey No. 5/6/1, 17 Pipliya Kumar, AB Road, Indore, Madhya Pradesh – 452010',
  godown:
    'Godown No. 5-6, Plot No. 79, Near NATRIP, Smart Industrial Area, Pithampur Industrial Area, Dhar, Madhya Pradesh – 454774',
  phone: '+91 00000 00000', // TODO: apna number daalo
  email: 'info@yourdomain.com', // TODO: apna email daalo
}

const NAV = [
  ['About', '#about'],
  ['Products', '#products'],
  ['Facilities', '#facilities'],
  ['Leadership', '#leadership'],
  ['Compliance', '#compliance'],
  ['Contact', '#contact'],
]

const SLIDES = [
  { title: 'Built on Precision,', accent: 'Driven by Trust', text: 'Industrial solutions from the heart of Madhya Pradesh.' },
  { title: 'Engineered for', accent: 'Everyday Strength', text: 'Quality-first operations from Indore and Pithampur.' },
  { title: 'Growing Together', accent: 'With Industry', text: 'Reliable supply, honest service, long-term partnerships.' },
]

// TODO: apni asli product lines yahan likho (abhi placeholder hain)
const PRODUCTS = [
  { name: 'Industrial Materials', text: 'Dependable raw and processed materials for manufacturers and fabricators.' },
  { name: 'Fabricated Components', text: 'Precision components made to your drawings and specifications.' },
  { name: 'Industrial Supplies', text: 'Consistent, on-time supply for plants and workshops across the region.' },
  { name: 'Custom Solutions', text: 'Tailored requirements handled end-to-end with technical support.' },
]

const LEADERS = [
  { name: 'Siddharth Dhanotia', role: 'Managing Director' },
  { name: 'Sharmila Dhanotia', role: 'Director' },
  { name: 'Dhiren Patel', role: 'Director' },
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

function useInView(options = { threshold: 0.3 }) {
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
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, []) // eslint-disable-line
  return [ref, seen]
}

function Counter({ to, suffix = '' }) {
  const [ref, seen] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const dur = 1400
    const t0 = performance.now()
    let raf
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
  const [ref, seen] = useInView({ threshold: 0.15 })
  return <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</div>
}

/* -------------------------------- app ------------------------------ */
function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [slide, setSlide] = useState(0)
  const track = useRef(null)
  const years = new Date().getFullYear() - COMPANY.since

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500)
    return () => clearInterval(id)
  }, [])

  const scrollTrack = (dir) =>
    track.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })

  return (
    <div className="site">
      {/* ---------- header ---------- */}
      <header className={`header ${scrolled ? 'solid' : ''}`}>
        <a href="#top" className="brand" aria-label={COMPANY.name}>
          <span className="brand-mark">I</span>
          <span className="brand-text">IDHAYAN<small>INDUSTRIES</small></span>
        </a>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="btn btn-sm" href="#contact" onClick={() => setOpen(false)}>Get In Touch</a>
        </nav>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </header>

      {/* ---------- hero ---------- */}
      <section id="top" className="hero">
        {IMAGES.hero.map((src, i) => (
          <div key={src} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <Img src={src} alt="" className="hero-img" />
          </div>
        ))}
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="kicker">Indore · Pithampur · Madhya Pradesh</p>
          <h1 key={slide}>
            {SLIDES[slide].title}<br /><span>{SLIDES[slide].accent}</span>
          </h1>
          <p className="hero-text">{SLIDES[slide].text}</p>
          <div className="hero-actions">
            <a className="btn" href="#products">Our Products</a>
            <a className="btn btn-ghost" href="#contact">Get In Touch</a>
          </div>
        </div>
        <div className="dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ---------- trust strip ---------- */}
      <section className="strip">
        <span>GST Registered</span>
        <i />
        <span>Private Limited Company</span>
        <i />
        <span>Indore Head Office</span>
        <i />
        <span>Pithampur Godown</span>
      </section>

      {/* ---------- about ---------- */}
      <section id="about" className="section split">
        <Reveal className="split-media">
          <Img src={IMAGES.about} alt="Industrial engineer at work" />
          <div className="badge"><b>{years}+</b><span>Years of<br />Operations</span></div>
        </Reveal>
        <Reveal className="split-body">
          <p className="eyebrow">About Idhayan</p>
          <h2>Leading with Vision &amp; Dedication</h2>
          <p>
            {COMPANY.legal} is a Madhya Pradesh based company registered in {COMPANY.since},
            operating from Indore with an additional facility in the Pithampur industrial belt.
            We focus on consistent quality, transparent dealings and dependable delivery for
            every customer we serve.
          </p>
          <p>
            Guided by an experienced leadership team, we invest in people, processes and
            infrastructure so our partners can count on us — order after order.
          </p>
          <a className="link-arrow" href="#leadership">Meet our leadership <span>→</span></a>
        </Reveal>
      </section>

      {/* ---------- vision (reverse) ---------- */}
      <section className="section split reverse tint">
        <Reveal className="split-media">
          <Img src={IMAGES.vision} alt="Modern industrial workshop" />
        </Reveal>
        <Reveal className="split-body">
          <p className="eyebrow">Our Approach</p>
          <h2>Pioneering Better Ways of Working</h2>
          <p>
            We work closely with engineers, buyers and technical teams to understand the
            requirement first, then deliver with precision and speed. Responsible,
            efficient operations are part of how we grow.
          </p>
          <ul className="ticks">
            <li>Quality-first sourcing and processing</li>
            <li>Strategic locations in Indore &amp; Pithampur</li>
            <li>Clear communication, fair pricing</li>
          </ul>
        </Reveal>
      </section>

      {/* ---------- stats ---------- */}
      <section className="stats">
        <div><b><Counter to={years} suffix="+" /></b><span>Years Since<br />Registration</span></div>
        <div><b><Counter to={2} /></b><span>Operating<br />Locations</span></div>
        <div><b><Counter to={3} /></b><span>Directors &amp;<br />Leaders</span></div>
        <div><b><Counter to={PRODUCTS.length} /></b><span>Core Product<br />Lines</span></div>
      </section>

      {/* ---------- products ---------- */}
      <section id="products" className="section">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">What We Offer</p>
              <h2>Engineered for Strength,<br />Designed for Excellence</h2>
            </div>
            <div className="arrows">
              <button onClick={() => scrollTrack(-1)} aria-label="Previous">←</button>
              <button onClick={() => scrollTrack(1)} aria-label="Next">→</button>
            </div>
          </div>
        </Reveal>
        <div className="track" ref={track}>
          {PRODUCTS.map((p, i) => (
            <article className="card" key={p.name}>
              <div className="card-img"><Img src={IMAGES.products[i % IMAGES.products.length]} alt={p.name} /></div>
              <div className="card-body">
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <a className="link-arrow" href="#contact">Enquire <span>→</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- facilities ---------- */}
      <section id="facilities" className="facility">
        <Img src={IMAGES.facility} alt="Idhayan facility" className="facility-bg" />
        <div className="facility-shade" />
        <Reveal className="facility-inner">
          <p className="eyebrow light">Our Facilities</p>
          <h2>Two Locations. One Standard.</h2>
          <div className="facility-grid">
            <div>
              <h4>Registered Office · Indore</h4>
              <p>{COMPANY.office}</p>
            </div>
            <div>
              <h4>Godown · Pithampur</h4>
              <p>{COMPANY.godown}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- leadership ---------- */}
      <section id="leadership" className="section">
        <Reveal>
          <p className="eyebrow">Leadership</p>
          <h2>The People Behind Idhayan</h2>
        </Reveal>
        <div className="leaders">
          {LEADERS.map((l) => (
            <Reveal key={l.name} className="leader">
              <div className="avatar">{l.name.split(' ').map((w) => w[0]).join('')}</div>
              <h3>{l.name}</h3>
              <p>{l.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- compliance ---------- */}
      <section id="compliance" className="section tint">
        <Reveal>
          <p className="eyebrow">Compliance</p>
          <h2>Registered &amp; Accountable</h2>
        </Reveal>
        <div className="facts">
          <div><span>Legal Name</span><b>{COMPANY.legal}</b></div>
          <div><span>GSTIN</span><b>{COMPANY.gstin}</b></div>
          <div><span>Constitution</span><b>Private Limited Company</b></div>
          <div><span>Registration Type</span><b>Regular (MP GST Act, 2017)</b></div>
          <div><span>Valid From</span><b>08 Oct 2021</b></div>
          <div><span>Jurisdiction</span><b>Indore – 11</b></div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section id="contact" className="contact">
        <Reveal className="contact-inner">
          <p className="eyebrow light">Get In Touch</p>
          <h2>Let’s Build Something Together</h2>
          <p>Tell us what you need — we’ll get back to you quickly.</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you! We will contact you soon.')
              e.target.reset()
            }}
          >
            <input required placeholder="Your name" />
            <input required type="email" placeholder="Email" />
            <input placeholder="Phone" />
            <textarea required rows="4" placeholder="Your requirement" />
            <button className="btn" type="submit">Send Enquiry</button>
          </form>
        </Reveal>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <a href="#top" className="brand light">
              <span className="brand-mark">I</span>
              <span className="brand-text">IDHAYAN<small>INDUSTRIES</small></span>
            </a>
            <p className="muted">Built on precision, driven by trust.</p>
            <p className="muted">{COMPANY.phone}<br />{COMPANY.email}</p>
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
          © {new Date().getFullYear()} {COMPANY.legal}. All rights reserved. · GSTIN {COMPANY.gstin}
        </div>
      </footer>
    </div>
  )
}

export default App
