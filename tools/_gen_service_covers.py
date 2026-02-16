from pathlib import Path

base_dir = Path(__file__).resolve().parent
svc_dir = base_dir / 'assets' / 'img' / 'service' / 'covers'
svc_dir.mkdir(parents=True, exist_ok=True)

ACCENT1 = '#28e98c'
ACC2 = {
    'kurumsal': '#2bd9ff',
    'landing': '#ff4fd8',
    'dashboard': '#7c5cff',
    'webapp': '#2bd9ff',
    'entegrasyon': '#ffd166',
    'performans': '#ff4fd8',
}

def icon_svg(kind: str, a1: str, a2: str) -> str:
    s1 = f"stroke='{a1}' stroke-width='18' stroke-linecap='round' stroke-linejoin='round' fill='none'"
    s2 = f"stroke='{a2}' stroke-width='14' stroke-linecap='round' stroke-linejoin='round' fill='none' opacity='0.92'"
    w  = "stroke='rgba(255,255,255,0.92)' stroke-width='11' stroke-linecap='round' stroke-linejoin='round' fill='none' opacity='0.92'"

    if kind == 'building':
        return f"""
        <g transform='translate(820 460)'>
          <g filter='url(#shadow)'>
            <rect x='-260' y='-170' width='520' height='340' rx='54' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='2'/>
          </g>
          <g {s1}>
            <path d='M-150 120v-250l150-70 150 70v250z'/>
            <path d='M-90 120v-150h180v150'/>
          </g>
          <g {s2}>
            <path d='M-110 -20h40'/><path d='M-110 20h40'/><path d='M-110 60h40'/>
            <path d='M70 -20h40'/><path d='M70 20h40'/><path d='M70 60h40'/>
          </g>
          <g {w}>
            <path d='M-240 150h480'/>
          </g>
        </g>
        """

    if kind == 'rocket':
        return f"""
        <g transform='translate(820 458)'>
          <g filter='url(#shadow)'>
            <rect x='-300' y='-180' width='600' height='360' rx='56' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='2'/>
          </g>
          <g {s1}>
            <path d='M0 -120c70 40 110 120 110 210-90 0-170-40-210-110 40-70 120-110 210-100z'/>
            <path d='M-50 40l-100 60 60-100'/>
            <path d='M50 -60l60-100-100 60'/>
            <circle cx='20' cy='-20' r='32'/>
          </g>
          <g {s2}>
            <path d='M-200 120c30-40 70-70 120-90'/>
            <path d='M200 -120c-40 30-70 70-90 120'/>
          </g>
          <g {w}>
            <path d='M-20 140l20 60 20-60'/>
          </g>
        </g>
        """

    if kind == 'chart':
        return f"""
        <g transform='translate(820 460)'>
          <g filter='url(#shadow)'>
            <rect x='-300' y='-180' width='600' height='360' rx='56' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='2'/>
          </g>
          <g {s1}>
            <path d='M-200 120v-240h420'/>
            <path d='M-160 60l100-90 90 60 120-140'/>
            <circle cx='-60' cy='-30' r='12' fill='{a1}' opacity='0.9' stroke='none'/>
            <circle cx='30' cy='30' r='12' fill='{a1}' opacity='0.9' stroke='none'/>
            <circle cx='150' cy='-110' r='12' fill='{a1}' opacity='0.9' stroke='none'/>
          </g>
          <g {s2}>
            <path d='M-200 -60h140'/>
            <path d='M-200 -10h100'/>
            <path d='M-200 40h70'/>
          </g>
          <g {w}>
            <path d='M220 -140l60 0 0 60'/>
          </g>
        </g>
        """

    if kind == 'cubes':
        return f"""
        <g transform='translate(820 460)'>
          <g filter='url(#shadow)'>
            <rect x='-300' y='-180' width='600' height='360' rx='56' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='2'/>
          </g>
          <g {s1} opacity='0.96'>
            <path d='M-160 40l160-90 160 90-160 90z'/>
            <path d='M-160 40v160l160 90v-160z'/>
            <path d='M160 40v160l-160 90v-160z'/>
          </g>
          <g {s2}>
            <path d='M-220 -110l120-70 120 70-120 70z'/>
            <path d='M-220 -110v110l120 70v-110z'/>
            <path d='M20 -110v110l-120 70v-110z'/>
          </g>
          <g {w}>
            <path d='M120 180l80 45v-90z'/>
          </g>
        </g>
        """

    if kind == 'plug':
        return f"""
        <g transform='translate(820 460)'>
          <g filter='url(#shadow)'>
            <rect x='-300' y='-180' width='600' height='360' rx='56' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='2'/>
          </g>
          <g {s1}>
            <path d='M-60 -140v120'/>
            <path d='M60 -140v120'/>
            <path d='M-140 -40h280'/>
            <path d='M0 -40v120c0 70-60 120-130 120h-30'/>
          </g>
          <g {s2}>
            <path d='M-200 140h120'/>
            <path d='M-130 140v-70'/>
          </g>
          <g {w}>
            <path d='M160 20c70 0 120 50 120 120v40'/>
            <path d='M260 200l-40 20'/>
          </g>
        </g>
        """

    if kind == 'shield':
        return f"""
        <g transform='translate(820 460)'>
          <g filter='url(#shadow)'>
            <rect x='-300' y='-180' width='600' height='360' rx='56' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='2'/>
          </g>
          <g {s1}>
            <path d='M0 -150c90 50 170 60 220 70v160c0 120-90 210-220 260-130-50-220-140-220-260V-80c50-10 130-20 220-70z'/>
            <path d='M-70 40l50 50 120-140'/>
          </g>
          <g {s2}>
            <path d='M-240 -40h120'/>
            <path d='M120 -40h120'/>
          </g>
          <g {w}>
            <path d='M0 -150v260'/>
          </g>
        </g>
        """

    return ''


def make_svg(key: str, icon_kind: str) -> str:
    a2 = ACC2[key]

    v_lines = ''.join([f"<path d='M{120+i*120} 0V900'/>" for i in range(12)])
    h_lines = ''.join([f"<path d='M0 {90+i*90}H1600'/>" for i in range(9)])

    return f"""<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='0.32' y2='0.9'>
      <stop offset='0' stop-color='#06090b'/>
      <stop offset='0.55' stop-color='#0b1b14'/>
      <stop offset='1' stop-color='#071014'/>
    </linearGradient>

    <radialGradient id='glow1' cx='20%' cy='16%' r='70%'>
      <stop offset='0' stop-color='{ACCENT1}' stop-opacity='0.55'/>
      <stop offset='1' stop-color='{ACCENT1}' stop-opacity='0'/>
    </radialGradient>
    <radialGradient id='glow2' cx='86%' cy='80%' r='72%'>
      <stop offset='0' stop-color='{a2}' stop-opacity='0.45'/>
      <stop offset='1' stop-color='{a2}' stop-opacity='0'/>
    </radialGradient>

    <filter id='blur' x='-20%' y='-20%' width='140%' height='140%'>
      <feGaussianBlur stdDeviation='36'/>
    </filter>

    <filter id='shadow' x='-30%' y='-30%' width='160%' height='160%'>
      <feDropShadow dx='0' dy='18' stdDeviation='22' flood-color='#000' flood-opacity='0.45'/>
    </filter>

    <filter id='noise' x='-20%' y='-20%' width='140%' height='140%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' seed='51'/>
      <feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.045 0'/>
    </filter>

    <linearGradient id='glass' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='rgba(255,255,255,0.10)'/>
      <stop offset='0.55' stop-color='rgba(255,255,255,0.06)'/>
      <stop offset='1' stop-color='rgba(255,255,255,0.02)'/>
    </linearGradient>

    <linearGradient id='edge' x1='0' y1='0' x2='1' y2='0'>
      <stop offset='0' stop-color='rgba(255,255,255,0.08)'/>
      <stop offset='0.5' stop-color='rgba(255,255,255,0.18)'/>
      <stop offset='1' stop-color='rgba(255,255,255,0.08)'/>
    </linearGradient>
  </defs>

  <rect width='1600' height='900' fill='url(#bg)'/>
  <circle cx='360' cy='170' r='520' fill='url(#glow1)' filter='url(#blur)' opacity='0.95'/>
  <circle cx='1310' cy='740' r='560' fill='url(#glow2)' filter='url(#blur)' opacity='0.92'/>
  <rect width='1600' height='900' filter='url(#noise)' opacity='1'/>

  <g opacity='0.18' stroke='rgba(255,255,255,0.16)' stroke-width='1'>
    {v_lines}
    {h_lines}
  </g>

  <rect x='70' y='70' width='1460' height='760' rx='52' fill='url(#glass)' stroke='url(#edge)' stroke-width='2' opacity='0.9'/>

  {icon_svg(icon_kind, ACCENT1, a2)}

  <path d='M210 770H1390' stroke='{ACCENT1}' stroke-opacity='0.25' stroke-width='10' stroke-linecap='round'/>
</svg>
"""


mapping = {
    'kurumsal': 'building',
    'landing': 'rocket',
    'dashboard': 'chart',
    'webapp': 'cubes',
    'entegrasyon': 'plug',
    'performans': 'shield',
}

for key, icon_kind in mapping.items():
    out = svc_dir / f'svc-{key}.svg'
    out.write_text(make_svg(key, icon_kind), encoding='utf-8')

print('Generated:', len(list(svc_dir.glob('*.svg'))))
