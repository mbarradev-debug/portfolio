import { ImageResponse } from 'next/og'

export const alt = 'Miguel Barra — Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative gradient */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'rgba(79,142,247,0.07)',
          }}
        />

        {/* Accent line */}
        <div
          style={{
            width: '56px',
            height: '4px',
            background: '#4F8EF7',
            borderRadius: '2px',
            marginBottom: '40px',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 800,
            color: '#F0EFE8',
            letterSpacing: '-3px',
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          Miguel Barra
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: '36px',
            color: '#A09FA8',
            fontWeight: 400,
            marginBottom: '48px',
          }}
        >
          Full Stack Developer
        </div>

        {/* Stack chips */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['React', 'Next.js', 'TypeScript'].map((tech) => (
            <div
              key={tech}
              style={{
                background: 'rgba(79,142,247,0.1)',
                border: '1px solid rgba(79,142,247,0.2)',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '22px',
                color: '#4F8EF7',
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '64px',
            right: '96px',
            fontSize: '20px',
            color: '#5A5966',
          }}
        >
          miguelbarra.cl
        </div>
      </div>
    ),
    { ...size }
  )
}
