import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const NAVY = '#0e1f3d';
const GOLD = '#e8a800';
const CREAM = '#f9f4ea';
const RUST = '#b8451f';

function clean(value, fallback) {
  return String(value || fallback || '').slice(0, 180);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = clean(searchParams.get('title'), 'Million Travel');
  const subtitle = clean(searchParams.get('subtitle'), "You're an explorer, not a tourist");
  const price = clean(searchParams.get('price'), 'From 399 JOD');
  const country = clean(searchParams.get('country'), 'Curated journeys');
  const format = searchParams.get('format') || 'square';

  const size = format === 'story'
    ? { width: 1080, height: 1920 }
    : { width: 1080, height: 1080 };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: NAVY,
          color: CREAM,
          padding: 72,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -180,
            top: -180,
            width: 520,
            height: 520,
            borderRadius: 999,
            border: `40px solid ${GOLD}`,
            opacity: 0.16,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ width: 76, height: 76, borderRadius: 999, background: GOLD, color: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, fontWeight: 800 }}>M</div>
            <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: 4 }}>MILLION</div>
          </div>
          <div style={{ color: GOLD, fontSize: 28 }}>{country}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 850 }}>
          <div style={{ color: GOLD, fontSize: 28, letterSpacing: 8, textTransform: 'uppercase' }}>Travel Offer</div>
          <div style={{ fontSize: format === 'story' ? 112 : 88, lineHeight: 0.92, fontWeight: 700, letterSpacing: -4 }}>{title}</div>
          <div style={{ fontSize: 38, lineHeight: 1.25, color: '#d8deea' }}>{subtitle}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: `2px solid rgba(249,244,234,0.18)`, paddingTop: 38 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: '#aab5cb', fontSize: 24 }}>Starting from</div>
            <div style={{ color: GOLD, fontSize: 64, fontWeight: 800 }}>{price}</div>
          </div>
          <div style={{ background: RUST, color: CREAM, padding: '22px 34px', borderRadius: 999, fontSize: 30, fontWeight: 700 }}>Book now →</div>
        </div>
      </div>
    ),
    size,
  );
}
