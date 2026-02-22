import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Thai-friendly fonts
const FONT_URLS = {
  kanit: 'https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&display=swap',
}

async function loadFont() {
  const response = await fetch(FONT_URLS.kanit)
  const css = await response.text()
  const fontUrlMatch = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)
  if (!fontUrlMatch) return null

  const fontResponse = await fetch(fontUrlMatch[1])
  return fontResponse.arrayBuffer()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params
  const searchParams = request.nextUrl.searchParams

  // Get event data from query params or fetch from API
  const title = searchParams.get('title') || 'คิดดูก่อน'
  const dateCount = searchParams.get('dates') || '0'
  const voteCount = searchParams.get('votes') || '0'
  const bestDate = searchParams.get('best') || ''

  // Try to load font, fallback to default if fails
  let fontData: ArrayBuffer | null = null
  try {
    fontData = await loadFont()
  } catch {
    // Font loading failed, use default
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: fontData ? 'Kanit' : 'sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          color: 'white',
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
            }}
          >
            📅
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 600,
            }}
          >
            คิดดูก่อน
          </div>
        </div>

        {/* Main card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            padding: '40px 60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '85%',
            maxWidth: '800px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Event title */}
          <div
            style={{
              fontSize: title.length > 30 ? '36px' : '48px',
              fontWeight: 700,
              color: '#1a1a2e',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#667eea',
                }}
              >
                {dateCount}
              </div>
              <div
                style={{
                  fontSize: '20px',
                  color: '#666',
                }}
              >
                วันที่เลือก
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#667eea',
                }}
              >
                {voteCount}
              </div>
              <div
                style={{
                  fontSize: '20px',
                  color: '#666',
                }}
              >
                คนโหวต
              </div>
            </div>
          </div>

          {/* Best date */}
          {bestDate && (
            <div
              style={{
                background: '#10b981',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '50px',
                fontSize: '20px',
                fontWeight: 500,
              }}
            >
              ✅ {bestDate}
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              marginTop: '30px',
              color: '#888',
              fontSize: '18px',
            }}
          >
            เข้าร่วมโหวตได้เลย!
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '40px',
            fontSize: '20px',
            opacity: 0.8,
          }}
        >
          kiddugorn.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [
            {
              name: 'Kanit',
              data: fontData,
              style: 'normal',
              weight: 400,
            },
            {
              name: 'Kanit',
              data: fontData,
              style: 'normal',
              weight: 700,
            },
          ]
        : undefined,
    }
  )
}
