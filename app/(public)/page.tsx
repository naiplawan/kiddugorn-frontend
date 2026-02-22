import { Hero, HowItWorks, Features, Footer, AppPreview, Stats, Testimonials, FAQ, Comparison, CTA } from '@/components/landing'

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <Features />

      {/* App Preview Section */}
      <AppPreview />

      {/* Comparison Section - Kiddugorn vs LINE */}
      <Comparison />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Stats Section */}
      <Stats />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}
