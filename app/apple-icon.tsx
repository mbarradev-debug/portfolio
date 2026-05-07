import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0A0F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '80px',
            fontWeight: 800,
            color: '#4F8EF7',
            fontFamily: 'sans-serif',
            letterSpacing: '-2px',
          }}
        >
          MB
        </div>
      </div>
    ),
    { ...size }
  )
}
