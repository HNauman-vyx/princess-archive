import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, BookHeart, Castle, Crown, Gift, Heart, LockKeyhole, Mail, MapPin, Moon, Music2, Sparkles, Star, Sun, WandSparkles } from 'lucide-react'
import { content } from './content'

type HeartParticle = { id: number; x: number; y: number; tone: string }

const rooms = [
  { id: 'letter', label: 'Royal Letter', icon: Mail, eyebrow: 'Room 01', title: 'A letter sealed with starlight', blurb: 'A few words for the girl who makes the whole kingdom brighter.' },
  { id: 'mirror', label: 'Princess Mirror', icon: Sparkles, eyebrow: 'Room 02', title: 'The mirror only tells the truth', blurb: 'Tap the glass whenever you need a gentle reminder.' },
  { id: 'garden', label: 'Garden of Wishes', icon: WandSparkles, eyebrow: 'Room 03', title: 'Where every flower keeps a secret', blurb: 'Pick a bloom, make a wish, and watch the night answer.' },
  { id: 'universe', label: 'Our Universe', icon: Moon, eyebrow: 'Room 04', title: 'Different places, one little universe', blurb: 'Two stars. One glowing line. A story still being written.' },
  { id: 'treasure', label: 'Treasure Chest', icon: Gift, eyebrow: 'Room 05', title: 'A little chest of reminders', blurb: 'Three gifts, each one chosen for the princess herself.' },
]

function App() {
  const [entered, setEntered] = useState(false)
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const [affirmation, setAffirmation] = useState(0)
  const [flower, setFlower] = useState<number | null>(null)
  const [wish, setWish] = useState(false)
  const [chestOpen, setChestOpen] = useState(false)
  const [treasureNote, setTreasureNote] = useState<string | null>(null)
  const [hearts, setHearts] = useState<HeartParticle[]>([])
  const [music, setMusic] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [compliment, setCompliment] = useState(0)

  const burstHeart = (event: React.MouseEvent | React.TouchEvent) => {
    const point = 'touches' in event ? event.touches[0] : event
    const id = Date.now()
    setHearts((items) => [...items.slice(-12), { id, x: point.clientX, y: point.clientY, tone: ['#f5c2d5', '#f8df99', '#d8c6ff'][id % 3] }])
    window.setTimeout(() => setHearts((items) => items.filter((heart) => heart.id !== id)), 1400)
  }

  const scrollToRooms = () => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })

  if (!entered) {
    return (
      <main className="opening" onClick={burstHeart}>
        <div className="stars" />
        <div className="opening-orbit orbit-one" /><div className="opening-orbit orbit-two" />
        <motion.div className="opening-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <div className="crest"><Crown size={24} /><span>THE PRINCESS ARCHIVE</span></div>
          <p className="opening-kicker">A private kingdom, made for one</p>
          <h1>Somewhere in this universe,<br /><em>there is a princess</em><br />who deserves her own kingdom.</h1>
          <p className="opening-subtitle">A little world of letters, wishes, stars, and all the soft things you deserve.</p>
          <button className="primary-button" onClick={() => setEntered(true)}>Enter My Kingdom <ArrowRight size={17} /></button>
          <div className="sound-note"><Music2 size={14} /> Sound is off until you choose it</div>
        </motion.div>
        <div className="castle-silhouette"><Castle size={180} strokeWidth={0.75} /></div>
        <div className="moon moon-opening"><Moon size={58} fill="currentColor" /></div>
        {hearts.map((heart) => <HeartFloat key={heart.id} heart={heart} />)}
      </main>
    )
  }

  return (
    <div className="kingdom" onClick={burstHeart}>
      <AnimatePresence>{hearts.map((heart) => <HeartFloat key={heart.id} heart={heart} />)}</AnimatePresence>
      <header className="topbar">
        <a className="brand" href="#home" onClick={(event) => event.stopPropagation()}><Crown size={18} /><span>Habeeba’s Archive</span></a>
        <nav className="desktop-nav">{rooms.map((room) => <button key={room.id} onClick={(event) => { event.stopPropagation(); setActiveRoom(room.id) }}>{room.label}</button>)}</nav>
        <button className={`icon-button ${music ? 'is-on' : ''}`} aria-label="Toggle music" onClick={(event) => { event.stopPropagation(); setMusic(!music) }}><Music2 size={17} /></button>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> THE ROYAL WELCOME</div>
          <h2>Her Majesty,<br /><em>Princess Habeeba</em></h2>
          <p>Come in, darling. The moon is bright, the flowers are awake, and this little kingdom has been waiting for you.</p>
          <button className="text-button" onClick={(event) => { event.stopPropagation(); scrollToRooms() }}>Explore the kingdom <ArrowDown size={16} /></button>
        </div>
        <div className="hero-art">
          <div className="hero-glow" /><div className="castle-card"><Castle size={205} strokeWidth={0.45} /></div>
          <div className="floating-orb orb-a" /><div className="floating-orb orb-b" />
          <div className="moon"><Moon size={49} fill="currentColor" /></div>
          <div className="cloud cloud-a" /><div className="cloud cloud-b" />
          <motion.div className="tiny-cat" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>🐈</motion.div>
          <motion.div className="tiny-puppy" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: .4 }}>🐶</motion.div>
        </div>
        <div className="scroll-cue"><span>SCROLL TO DISCOVER</span><ArrowDown size={15} /></div>
      </section>

      <section id="rooms" className="rooms-section">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> FIVE LITTLE DESTINATIONS</div><h3>Choose a door,<br /><em>make a memory.</em></h3></div><p>Every corner holds something made only for you. Open them in any order — the kingdom knows the way.</p></div>
        <div className="room-grid">{rooms.map((room, index) => {
          const Icon = room.icon
          return <motion.button className={`room-card room-${index + 1}`} key={room.id} whileHover={{ y: -7 }} whileTap={{ scale: .98 }} onClick={(event) => { event.stopPropagation(); setActiveRoom(room.id) }}>
            <div className="room-number">{room.eyebrow}</div><div className="room-icon"><Icon size={22} /></div><h4>{room.label}</h4><p>{room.blurb}</p><span className="room-open">Open door <ArrowRight size={14} /></span>
          </motion.button>
        })}</div>
      </section>

      <section className="characters-section">
        <div className="characters-image"><div className="image-wash" /><div className="characters-emoji">🐈 <span>♡</span> 🐶</div></div>
        <div className="character-copy"><div className="eyebrow"><span className="eyebrow-line" /> THE KINGDOM’S KEEPERS</div><h3>Even the little ones<br /><em>know your magic.</em></h3><p>Our resident cat and puppy have appointed themselves royal guardians. They may be small, but their loyalty is enormous.</p><div className="character-tags"><span>✦ Tiny paws</span><span>✦ Big feelings</span><span>✦ Excellent snuggles</span></div></div>
      </section>

      <section className="promise-section">
        <div className="promise-stars"><Star size={15} /><Star size={9} /><Star size={12} /></div>
        <div className="eyebrow"><span className="eyebrow-line" /> THE ROYAL PROMISE</div>
        <h3>To my princess,</h3><p>You don’t need a crown to be royalty.<br /><em>You deserve a kingdom simply because you are you.</em></p><strong>Forever your princess, Habeeba. <span>👑🤍</span></strong>
        <button className="outline-button" onClick={(event) => { event.stopPropagation(); setEntered(false); window.scrollTo({ top: 0 }) }}>Replay the experience <Sparkles size={16} /></button>
      </section>

      <footer><span>Made with moonlight for Habeeba</span><span>✦</span><span>THE PRINCESS ARCHIVE · 2026</span></footer>

      <AnimatePresence>{activeRoom && <RoomModal room={activeRoom} close={() => setActiveRoom(null)} letterOpen={letterOpen} setLetterOpen={setLetterOpen} affirmation={affirmation} setAffirmation={setAffirmation} flower={flower} setFlower={setFlower} wish={wish} setWish={setWish} chestOpen={chestOpen} setChestOpen={setChestOpen} compliment={compliment} setCompliment={setCompliment} treasureNote={treasureNote} setTreasureNote={setTreasureNote} />}</AnimatePresence>
    </div>
  )
}

function HeartFloat({ heart }: { heart: HeartParticle }) {
  return <motion.span className="heart-float" style={{ left: heart.x, top: heart.y, color: heart.tone }} initial={{ opacity: 0, scale: .4 }} animate={{ opacity: [0, 1, 0], y: -100, x: (heart.id % 2 ? 18 : -18), rotate: 20 }} transition={{ duration: 1.4 }}>{heart.id % 3 === 0 ? '✦' : '♥'}</motion.span>
}

type RoomProps = { room: string; close: () => void; letterOpen: boolean; setLetterOpen: (v: boolean) => void; affirmation: number; setAffirmation: (v: number) => void; flower: number | null; setFlower: (v: number | null) => void; wish: boolean; setWish: (v: boolean) => void; chestOpen: boolean; setChestOpen: (v: boolean) => void; compliment: number; setCompliment: (v: number) => void; treasureNote: string | null; setTreasureNote: (v: string | null) => void }

function RoomModal({ room, close, letterOpen, setLetterOpen, affirmation, setAffirmation, flower, setFlower, wish, setWish, chestOpen, setChestOpen, compliment, setCompliment, treasureNote, setTreasureNote }: RoomProps) {
  const meta = rooms.find((item) => item.id === room)!
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}><motion.div className={`room-modal modal-${room}`} initial={{ y: 30, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(event) => event.stopPropagation()}>
    <button className="close-button" onClick={close}>×</button><div className="eyebrow"><span className="eyebrow-line" /> {meta.eyebrow}</div><h3>{meta.title}</h3>
    {room === 'letter' && <div className="letter-room"><button className={`envelope ${letterOpen ? 'opened' : ''}`} onClick={() => setLetterOpen(true)}><Mail size={38} /><span>Tap to open</span><i>♡</i></button><AnimatePresence>{letterOpen && <motion.div className="letter-paper" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><div className="letter-date">For the princess, always</div>{content.letter.map((line, index) => <motion.p key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * .35 }}>{line}</motion.p>)}</motion.div>}</AnimatePresence></div>}
    {room === 'mirror' && <div className="mirror-room"><button className="mirror" onClick={() => setAffirmation((affirmation + 1) % content.affirmations.length)}><div className="mirror-shine" /><Sparkles size={30} /><span>Tap the mirror</span></button><AnimatePresence mode="wait"><motion.p className="affirmation" key={affirmation} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{content.affirmations[affirmation]}</motion.p></AnimatePresence><span className="tiny-hint">{affirmation + 1} / {content.affirmations.length} gentle reminders</span></div>}
    {room === 'garden' && <div className="garden-room"><div className="flower-bed">{content.flowers.map((message, index) => <button key={message} className={`flower flower-${index}`} onClick={() => setFlower(index)} aria-label={`Flower ${index + 1}`}>🌷</button>)}</div><p className="garden-message">{flower === null ? 'Choose a flower and let it tell you something sweet.' : content.flowers[flower]}</p><button className="primary-button" onClick={() => setWish(true)}><WandSparkles size={16} /> Make a wish</button>{wish && <motion.div className="wish-star" initial={{ opacity: 0, x: -80, y: 40 }} animate={{ opacity: [0, 1, 0], x: 180, y: -60 }}>✦</motion.div>} {wish && <p className="wish-text">May the softest, brightest things find you.</p>}</div>}
    {room === 'universe' && <div className="universe-room"><div className="constellation"><div className="constellation-line" /><div className="star-point star-london"><span>London</span></div><div className="star-point star-india"><span>India</span></div><Moon className="universe-moon" size={40} /></div><div className="distance"><span>APPROXIMATE DISTANCE</span><strong>8 <small>km</small></strong></div><p>Different places,<br /><em>one little universe.</em></p><div className="route"><MapPin size={14} /> London <ArrowRight size={14} /> India <MapPin size={14} /></div></div>}
    {room === 'treasure' && <div className="treasure-room"><button className={`chest ${chestOpen ? 'chest-open' : ''}`} onClick={() => setChestOpen(true)}><LockKeyhole size={32} /><span>{chestOpen ? 'Unlocked' : 'Tap to unlock'}</span></button><AnimatePresence>{chestOpen && <motion.div className="treasure-gifts" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}><button onClick={() => setTreasureNote('You are loved more than all the stars in this kingdom.')}>💌<span>A message</span></button><button onClick={() => { setCompliment((compliment + 1) % content.compliments.length); setTreasureNote(`You are ${content.compliments[(compliment + 1) % content.compliments.length].toLowerCase()}.`) }}>✨<span>{content.compliments[compliment]}</span></button><button onClick={() => setTreasureNote('A special surprise is waiting for the right moment…')}>🎁<span>A surprise</span></button></motion.div>}</AnimatePresence>{treasureNote && <motion.p className="treasure-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{treasureNote}</motion.p>}</div>}
  </motion.div></motion.div>
}

export default App
