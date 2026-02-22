'use client'

export function GoogleAds() {
  return (
    <section className="py-8 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-center">
          {/* Google AdSense Placeholder */}
          <div className="w-full max-w-[728px] h-[90px] md:h-[90px] bg-muted/50 border border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-sm text-muted-foreground/60">Advertisement</p>
            {/*
              To enable Google Ads:
              1. Add your AdSense script in the <head> of layout.tsx
              2. Replace this placeholder with your ad unit code:

              <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-YOUR-CLIENT-ID"
                data-ad-slot="YOUR-AD-SLOT"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            */}
          </div>
        </div>
      </div>
    </section>
  )
}
