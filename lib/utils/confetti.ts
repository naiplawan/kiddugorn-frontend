/**
 * Confetti celebration utility
 * Uses canvas-based confetti for smooth performance
 */

interface ConfettiOptions {
  particleCount?: number
  spread?: number
  origin?: { x: number; y: number }
  colors?: string[]
  scalar?: number
  gravity?: number
  drift?: number
  ticks?: number
}

// Confetti palette — Thai flag (red/white/blue) + brand warm accents
const DEFAULT_COLORS = [
  '#E11D48', // Red (Thai flag)
  '#1E40AF', // Blue (Thai flag)
  '#FFFFFF', // White (Thai flag)
  '#DA811B', // Ochre (brand primary)
  '#C54828', // Chili (brand accent)
  '#F59E0B', // Gold/Saffron
]

// Simple canvas confetti implementation
function createCanvas(): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  document.body.appendChild(canvas)
  return canvas
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  shape: 'square' | 'circle'
}

/**
 * Fire confetti celebration
 */
export function fireConfetti(options: ConfettiOptions = {}) {
  if (typeof window === 'undefined') return

  const {
    particleCount = 100,
    spread = 70,
    origin = { x: 0.5, y: 0.7 },
    colors = DEFAULT_COLORS,
    scalar = 1,
    gravity = 1,
    drift = 0,
    ticks = 200,
  } = options

  const canvas = createCanvas()
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Create particles
  const particles: Particle[] = []

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180)
    const velocity = 10 + Math.random() * 15
    const color = colors[Math.floor(Math.random() * colors.length)]

    particles.push({
      x: canvas.width * origin.x,
      y: canvas.height * origin.y,
      vx: Math.sin(angle) * velocity * scalar,
      vy: Math.cos(angle) * velocity * scalar - 5,
      color,
      size: (5 + Math.random() * 5) * scalar,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
      shape: Math.random() > 0.5 ? 'square' : 'circle',
    })
  }

  let frame = 0

  function animate() {
    if (frame >= ticks) {
      canvas!.remove()
      return
    }

    ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

    particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx + drift
      particle.y += particle.vy
      particle.vy += gravity * 0.3
      particle.rotation += particle.rotationSpeed
      particle.opacity = Math.max(0, 1 - frame / ticks)

      // Draw particle
      ctx!.save()
      ctx!.translate(particle.x, particle.y)
      ctx!.rotate((particle.rotation * Math.PI) / 180)
      ctx!.globalAlpha = particle.opacity
      ctx!.fillStyle = particle.color

      if (particle.shape === 'square') {
        ctx!.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
      } else {
        ctx!.beginPath()
        ctx!.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
        ctx!.fill()
      }

      ctx!.restore()
    })

    frame++
    requestAnimationFrame(animate)
  }

  animate()
}

/**
 * Fire confetti from sides (like a celebration)
 */
export function fireSideConfetti() {
  if (typeof window === 'undefined') return

  // Left side
  fireConfetti({
    particleCount: 50,
    spread: 55,
    origin: { x: 0, y: 0.8 },
    colors: DEFAULT_COLORS,
  })

  // Right side
  setTimeout(() => {
    fireConfetti({
      particleCount: 50,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: DEFAULT_COLORS,
    })
  }, 100)
}

/**
 * Fire confetti burst from center (for successful actions)
 */
export function fireSuccessConfetti() {
  fireConfetti({
    particleCount: 150,
    spread: 100,
    origin: { x: 0.5, y: 0.6 },
    colors: DEFAULT_COLORS,
    scalar: 1.2,
  })
}

/**
 * Fire gentle confetti (for smaller celebrations)
 */
export function fireGentleConfetti() {
  fireConfetti({
    particleCount: 30,
    spread: 50,
    origin: { x: 0.5, y: 0.5 },
    colors: DEFAULT_COLORS,
    gravity: 0.5,
    ticks: 100,
  })
}
