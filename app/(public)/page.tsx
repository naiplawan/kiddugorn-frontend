import { Hero, HowItWorks, CTA, Footer } from '@/components/landing'

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}
