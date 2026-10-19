import { ImageResponse } from 'next/og'

export const alt = 'PractiCode Academy: Learn. Build. Launch. Tech classes in Ibadan and online.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const pill = (bg: string, fg: string, rotate: number) => ({
  display: 'flex',
  padding: '0 18px 6px',
  borderRadius: 18,
  background: bg,
  color: fg,
  transform: `rotate(${rotate}deg)`,
})

/** The share card: the hero headline on the dark Prism page. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 36,
          background: '#07060D',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#DCD9EA', padding: '10px 22px', border: '2px solid #2A2540', borderRadius: 999 }}>
          PractiCode Academy · Ibadan and online
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 120, fontWeight: 800, letterSpacing: -4 }}>
          <div style={pill('#3D5AF5', '#FFFFFF', -2)}>Learn.</div>
          <div style={pill('#2FE6B0', '#07060D', 1.5)}>Build.</div>
          <div style={pill('#D9306F', '#FFFFFF', -1.5)}>Launch.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#A9A6BC' }}>Front-End · Data Analysis · UI/UX Design</div>
      </div>
    ),
    size,
  )
}
