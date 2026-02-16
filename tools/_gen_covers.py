from pathlib import Path

covers_dir = Path('assets/img/project/covers')

ACCENT1 = '#28e98c'

# Secondary accents per cover
ACC2 = {
  'stok-urun-takip-sistemi.svg': '#2bd9ff',
  'kutuphane-yonetim-sistemi.svg': '#7c5cff',
  'translator-clone.svg': '#ff4fd8',
  'eticaret-analiz-raporlama.svg': '#ffd166',

  'advancedai-analyze-image-azure.svg': '#2bd9ff',
  'advancedai-detailed-image-detection-azure.svg': '#7c5cff',
  'advancedai-code-assistant-openai.svg': '#ffd166',
  'advancedai-create-image-replicate.svg': '#ff4fd8',
  'advancedai-deepgram-voice.svg': '#2bd9ff',
  'advancedai-text-to-image-stability.svg': '#ff4fd8',
  'advancedai-tts-azure-speech.svg': '#2bd9ff',
  'advancedai-claude-chatbot.svg': '#7c5cff',
  'advancedai-summarize-pdf-claude.svg': '#ffd166',
  'advancedai-send-job-application-mail-claude.svg': '#ffd166',
  'advancedai-gemini-chatbot.svg': '#2bd9ff',
  'advancedai-gemini-auto-prompt-chain.svg': '#7c5cff',
  'advancedai-gemini-role-based-simulation.svg': '#ff4fd8',
  'advancedai-hf-detect-toxic.svg': '#ff4fd8',
  'advancedai-hf-ner-entities.svg': '#2bd9ff',
  'advancedai-hf-qna-roberta.svg': '#7c5cff',
  'advancedai-hf-sentiment-analysis.svg': '#ffd166',
  'advancedai-hf-summarize-novels.svg': '#2bd9ff',
}


def icon(icon_type: str, a1: str, a2: str) -> str:
  # Common stroke styles
  s1 = f"stroke='{a1}' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' fill='none'"
  s2 = f"stroke='{a2}' stroke-width='12' stroke-linecap='round' stroke-linejoin='round' fill='none' opacity='0.95'"
  w = "stroke='rgba(255,255,255,0.92)' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none'"

  if icon_type == 'stock':
    return f"""
    <g transform='translate(800 458)'>
      <g filter='url(#shadow)'>
        <path d='M-210 40l170-95 255 30-170 95z' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
        <path d='M-210 40v140l255 30v-140z' fill='rgba(255,255,255,0.04)' stroke='rgba(255,255,255,0.10)' stroke-width='2'/>
        <path d='M215 -25v140l-170 95v-140z' fill='rgba(255,255,255,0.03)' stroke='rgba(255,255,255,0.10)' stroke-width='2'/>
      </g>
      <g {s1} opacity='0.96'>
        <path d='M-160 10l120-70 200 24-120 70z'/>
        <path d='M-160 10v110l200 24v-110z'/>
        <path d='M160 -36v110l-120 70v-110z'/>
        <path d='M-110 92h60'/>
        <path d='M-10 104h60'/>
        <path d='M90 116h60'/>
      </g>
      <g {s2}>
        <path d='M-220 -150h160'/>
        <path d='M-220 -110h160'/>
        <path d='M-220 -70h160'/>
        <path d='M-220 -30h160'/>
      </g>
      <g {w} opacity='0.9'>
        <path d='M60 -150v120'/>
        <path d='M120 -120v90'/>
        <path d='M180 -90v60'/>
      </g>
    </g>
    """

  if icon_type == 'library':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-260' y='-150' width='520' height='320' rx='46' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-170 -40h260'/>
        <path d='M-170 30h260'/>
        <path d='M-170 100h260'/>
        <path d='M-120 -110h170c40 0 70 32 70 72v260'/>
        <path d='M-120 -110v260'/>
      </g>
      <g {s2}>
        <path d='M-150 -70h120'/>
        <path d='M-150 0h200'/>
        <path d='M-150 70h160'/>
        <path d='M120 -20v110'/>
      </g>
      <g {w} opacity='0.9'>
        <path d='M-60 -110v260'/>
        <path d='M-20 -110v260'/>
      </g>
      <path d='M150 -60v150l55-30v-150z' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='2'/>
      <path d='M168 -30v80l18-10v-80z' fill='{a2}' opacity='0.8'/>
    </g>
    """

  if icon_type == 'translator':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-300' y='-170' width='600' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-210 -60h250c36 0 65 29 65 65v40c0 36-29 65-65 65h-120l-70 56v-56h-60c-36 0-65-29-65-65v-40c0-36 29-65 65-65z'/>
        <path d='M-120 18h90'/>
        <path d='M-120 58h140'/>
      </g>
      <g {s2}>
        <path d='M80 -110h180c32 0 58 26 58 58v28c0 32-26 58-58 58h-82l-50 44v-44h-48c-32 0-58-26-58-58v-28c0-32 26-58 58-58z'/>
        <path d='M120 -58h92'/>
        <path d='M120 -22h132'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-10 150h110'/>
        <path d='M60 120l40 30-40 30'/>
        <path d='M10 -140h110'/>
        <path d='M80 -170l40 30-40 30'/>
      </g>
    </g>
    """

  if icon_type == 'ecommerce':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-290' y='-165' width='580' height='330' rx='46' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-210 40h250l36-140h-250z'/>
        <path d='M-160 40v-90'/>
        <path d='M-80 40v-110'/>
        <path d='M0 40v-70'/>
        <path d='M80 40v-130'/>
      </g>
      <g {s2}>
        <path d='M120 -40h130l20-70h-150z'/>
        <path d='M132 -40l12 50h122l12-50z'/>
        <circle cx='152' cy='40' r='16' fill='none' stroke='{a2}' stroke-width='12'/>
        <circle cx='244' cy='40' r='16' fill='none' stroke='{a2}' stroke-width='12'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-210 -120h220'/>
        <path d='M-210 -80h170'/>
        <path d='M-210 -40h190'/>
      </g>
    </g>
    """

  if icon_type == 'image_analyze':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-300' y='-170' width='600' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <rect x='-210' y='-110' width='360' height='220' rx='26'/>
        <path d='M-150 60l70-70 60 60 60-70 70 80'/>
        <circle cx='95' cy='-35' r='22'/>
      </g>
      <g {s2}>
        <circle cx='190' cy='90' r='58'/>
        <path d='M230 130l58 58'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-250 -140h120'/>
        <path d='M130 -140h120'/>
      </g>
    </g>
    """

  if icon_type == 'image_detect':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-300' y='-170' width='600' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <rect x='-220' y='-120' width='440' height='240' rx='28'/>
        <path d='M-120 56l80-80 70 70 80-90 90 100'/>
      </g>
      <g {s2}>
        <rect x='-150' y='-80' width='120' height='110' rx='14'/>
        <rect x='20' y='-40' width='140' height='130' rx='14'/>
        <path d='M-150 -80h40M-150 -80v40'/>
        <path d='M160 90h-40M160 90v-40'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 150h520'/>
      </g>
    </g>
    """

  if icon_type == 'code_assistant':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-310' y='-170' width='620' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-120 -70l-120 110 120 110'/>
        <path d='M120 -70l120 110-120 110'/>
        <path d='M-10 -100l-70 280'/>
      </g>
      <g {s2}>
        <path d='M-240 -130h120'/>
        <path d='M120 -130h120'/>
        <path d='M-240 150h210'/>
      </g>
      <g {w} opacity='0.92'>
        <circle cx='250' cy='-40' r='26'/>
        <path d='M250 -86v-34M250 40v34M296 -40h34M170 -40h-34'/>
      </g>
    </g>
    """

  if icon_type == 'create_image':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-300' y='-170' width='600' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <rect x='-220' y='-120' width='440' height='240' rx='28'/>
        <path d='M-150 50l70-70 60 60 60-70 80 90'/>
      </g>
      <g {s2}>
        <path d='M170 -40l80 80'/>
        <path d='M210 -80l40 40'/>
        <path d='M190 0l60 60'/>
        <path d='M120 -90l40 40'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 150h520'/>
      </g>
    </g>
    """

  if icon_type == 'text_to_image':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s2}>
        <path d='M-240 -70h220c34 0 62 28 62 62v24c0 34-28 62-62 62h-90l-60 50v-50h-70c-34 0-62-28-62-62v-24c0-34 28-62 62-62z'/>
        <path d='M-190 -20h140'/>
        <path d='M-190 20h190'/>
      </g>
      <g {s1}>
        <rect x='40' y='-110' width='280' height='220' rx='26'/>
        <path d='M80 60l60-70 60 60 50-60 70 80'/>
        <circle cx='260' cy='-30' r='20'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-10 0h60'/>
        <path d='M30 -30l40 30-40 30'/>
      </g>
    </g>
    """

  if icon_type == 'voice_stt':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-310' y='-170' width='620' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-40 -120h80'/>
        <path d='M-90 -30v-40c0-60 40-110 90-110s90 50 90 110v40c0 60-40 110-90 110s-90-50-90-110z'/>
        <path d='M-140 -10v40c0 86 56 150 140 150s140-64 140-150v-40'/>
        <path d='M-40 200h80'/>
      </g>
      <g {s2}>
        <path d='M-260 40h80'/>
        <path d='M-260 10h60'/>
        <path d='M-260 70h120'/>
        <path d='M180 40h80'/>
        <path d='M180 10h60'/>
        <path d='M180 70h120'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-220 -120h120'/>
        <path d='M100 -120h120'/>
      </g>
    </g>
    """

  if icon_type == 'tts':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-310' y='-170' width='620' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-210 20h90l90 80v-200l-90 80h-90z'/>
        <path d='M30 -70c40 40 40 100 0 140'/>
        <path d='M100 -110c70 70 70 170 0 240'/>
      </g>
      <g {s2}>
        <path d='M-240 -120h120'/>
        <path d='M-240 -80h180'/>
        <path d='M-240 -40h150'/>
        <path d='M-240 0h210'/>
      </g>
      <g {w} opacity='0.92'>
        <circle cx='220' cy='40' r='24'/>
        <path d='M220 10v-40M220 70v40'/>
      </g>
    </g>
    """

  if icon_type == 'chatbot':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-220 -70h300c36 0 65 29 65 65v50c0 36-29 65-65 65h-130l-70 56v-56h-100c-36 0-65-29-65-65v-50c0-36 29-65 65-65z'/>
        <circle cx='-120' cy='20' r='16'/>
        <circle cx='-40' cy='20' r='16'/>
        <circle cx='40' cy='20' r='16'/>
      </g>
      <g {s2}>
        <path d='M170 -120l20 40 40 20-40 20-20 40-20-40-40-20 40-20z'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 150h520'/>
      </g>
    </g>
    """

  if icon_type == 'pdf_summary':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-310' y='-170' width='620' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-180 -120h220l80 80v240h-300z'/>
        <path d='M40 -120v80h80'/>
        <path d='M-140 10h240'/>
        <path d='M-140 60h210'/>
        <path d='M-140 110h180'/>
      </g>
      <g {s2}>
        <path d='M160 -10l40 40 90-90'/>
        <path d='M160 60l40 40 90-90'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 150h520'/>
      </g>
    </g>
    """

  if icon_type == 'mail_apply':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-310' y='-170' width='620' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-220 -60h440v260h-440z'/>
        <path d='M-220 -60l220 160 220-160'/>
        <path d='M-220 200l170-120'/>
        <path d='M220 200l-170-120'/>
      </g>
      <g {s2}>
        <path d='M70 20l50 50 120-130'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 -120h160'/>
        <path d='M100 -120h160'/>
      </g>
    </g>
    """

  if icon_type == 'prompt_chain':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <circle cx='-200' cy='0' r='36'/>
        <circle cx='-40' cy='-80' r='36'/>
        <circle cx='120' cy='0' r='36'/>
        <circle cx='280' cy='80' r='36'/>
        <path d='M-164 -18l96-42'/>
        <path d='M-4 -62l96 42'/>
        <path d='M156 18l96 42'/>
      </g>
      <g {s2}>
        <path d='M-220 110h440'/>
        <path d='M-100 140h200'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-210 -140h420'/>
      </g>
    </g>
    """

  if icon_type == 'simulation':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <circle cx='-140' cy='-30' r='56'/>
        <path d='M-240 140c30-70 210-70 240 0'/>
        <circle cx='140' cy='-30' r='56'/>
        <path d='M40 140c30-70 210-70 240 0'/>
      </g>
      <g {s2}>
        <path d='M-10 -30h20'/>
        <path d='M-20 -60l-60 30 60 30'/>
        <path d='M20 0l60-30-60-30'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 -120h520'/>
      </g>
    </g>
    """

  if icon_type == 'toxic':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M0 -140c110 60 220 10 220 10v160c0 140-110 220-220 260-110-40-220-120-220-260v-160s110 50 220-10z'/>
        <path d='M0 -40v140'/>
        <circle cx='0' cy='140' r='12'/>
      </g>
      <g {s2}>
        <path d='M-220 150h440'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-240 -120h180'/>
        <path d='M60 -120h180'/>
      </g>
    </g>
    """

  if icon_type == 'ner':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <rect x='-240' y='-80' width='180' height='90' rx='22'/>
        <rect x='-10' y='-140' width='220' height='90' rx='22'/>
        <rect x='40' y='20' width='220' height='90' rx='22'/>
        <path d='M-60 -35l50-60'/>
        <path d='M150 -50l-20 70'/>
      </g>
      <g {s2}>
        <circle cx='-150' cy='120' r='34'/>
        <circle cx='-50' cy='140' r='18'/>
        <path d='M-120 130l52 10'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 150h520'/>
      </g>
    </g>
    """

  if icon_type == 'qna':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-200 -120h240l80 80v240h-320z'/>
        <path d='M40 -120v80h80'/>
      </g>
      <g {s2}>
        <path d='M140 0c0-90-120-60-120-130 0-40 36-70 90-70 50 0 86 22 86 70 0 62-56 66-56 104'/>
        <circle cx='84' cy='110' r='12'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-160 10h160'/>
        <path d='M-160 60h200'/>
        <path d='M-160 110h130'/>
      </g>
    </g>
    """

  if icon_type == 'sentiment':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <circle cx='-160' cy='-10' r='70'/>
        <circle cx='160' cy='-10' r='70'/>
        <path d='M-190 -30h0'/>
        <path d='M-190 -30' />
        <circle cx='-185' cy='-30' r='10' fill='{a1}'/>
        <circle cx='-135' cy='-30' r='10' fill='{a1}'/>
        <path d='M-190 20c18 18 62 18 80 0'/>
        <circle cx='135' cy='-30' r='10' fill='{a1}'/>
        <circle cx='185' cy='-30' r='10' fill='{a1}'/>
        <path d='M130 40c18-18 62-18 80 0'/>
      </g>
      <g {s2}>
        <path d='M-260 150h520'/>
        <path d='M-220 120l120-60 110 20 130-90 80 40'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 -120h520'/>
      </g>
    </g>
    """

  if icon_type == 'long_summary':
    return f"""
    <g transform='translate(800 455)'>
      <g filter='url(#shadow)'>
        <rect x='-320' y='-170' width='640' height='340' rx='48' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      </g>
      <g {s1}>
        <path d='M-200 -120h240l80 80v240h-320z'/>
        <path d='M40 -120v80h80'/>
        <path d='M-150 20h220'/>
        <path d='M-150 70h190'/>
        <path d='M-150 120h160'/>
      </g>
      <g {s2}>
        <path d='M220 -40c0 70-90 70-90 140 0 64 70 90 70 140'/>
        <path d='M250 -40c0 90-110 90-110 180 0 86 90 110 90 180'/>
      </g>
      <g {w} opacity='0.92'>
        <path d='M-260 150h520'/>
      </g>
    </g>
    """

  # fallback simple
  return f"""<g transform='translate(800 450)'><circle r='120' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/><g {s1}><path d='M-60 0h120'/><path d='M0 -60v120'/></g></g>"""


TYPE_BY_FILE = {
  'stok-urun-takip-sistemi.svg': 'stock',
  'kutuphane-yonetim-sistemi.svg': 'library',
  'translator-clone.svg': 'translator',
  'eticaret-analiz-raporlama.svg': 'ecommerce',

  'advancedai-analyze-image-azure.svg': 'image_analyze',
  'advancedai-detailed-image-detection-azure.svg': 'image_detect',
  'advancedai-code-assistant-openai.svg': 'code_assistant',
  'advancedai-create-image-replicate.svg': 'create_image',
  'advancedai-deepgram-voice.svg': 'voice_stt',
  'advancedai-text-to-image-stability.svg': 'text_to_image',
  'advancedai-tts-azure-speech.svg': 'tts',
  'advancedai-claude-chatbot.svg': 'chatbot',
  'advancedai-summarize-pdf-claude.svg': 'pdf_summary',
  'advancedai-send-job-application-mail-claude.svg': 'mail_apply',
  'advancedai-gemini-chatbot.svg': 'chatbot',
  'advancedai-gemini-auto-prompt-chain.svg': 'prompt_chain',
  'advancedai-gemini-role-based-simulation.svg': 'simulation',
  'advancedai-hf-detect-toxic.svg': 'toxic',
  'advancedai-hf-ner-entities.svg': 'ner',
  'advancedai-hf-qna-roberta.svg': 'qna',
  'advancedai-hf-sentiment-analysis.svg': 'sentiment',
  'advancedai-hf-summarize-novels.svg': 'long_summary',

  # Remaining advancedai (claude pdf/mail already, azure vision) + any others will map to defaults
  'advancedai-gemini-role-based-simulation.svg': 'simulation',
}


def svg_template(fname: str, icon_type: str, a1: str, a2: str) -> str:
  # Vary background angle slightly by filename hash
  h = sum(ord(c) for c in fname) % 360
  x2 = (h % 100) / 100
  y2 = ((h // 3) % 100) / 100
  # Keep not too low
  x2 = 0.75 if x2 < 0.25 else x2
  y2 = 0.85 if y2 < 0.25 else y2

  return f"""<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='{x2:.2f}' y2='{y2:.2f}'>
      <stop offset='0' stop-color='#06090b'/>
      <stop offset='0.55' stop-color='#0b1b14'/>
      <stop offset='1' stop-color='#071014'/>
    </linearGradient>

    <radialGradient id='glow1' cx='22%' cy='18%' r='68%'>
      <stop offset='0' stop-color='{a1}' stop-opacity='0.55'/>
      <stop offset='1' stop-color='{a1}' stop-opacity='0'/>
    </radialGradient>
    <radialGradient id='glow2' cx='86%' cy='76%' r='70%'>
      <stop offset='0' stop-color='{a2}' stop-opacity='0.45'/>
      <stop offset='1' stop-color='{a2}' stop-opacity='0'/>
    </radialGradient>

    <filter id='blur' x='-20%' y='-20%' width='140%' height='140%'>
      <feGaussianBlur stdDeviation='34'/>
    </filter>

    <filter id='shadow' x='-30%' y='-30%' width='160%' height='160%'>
      <feDropShadow dx='0' dy='18' stdDeviation='22' flood-color='#000' flood-opacity='0.45'/>
    </filter>

    <filter id='noise' x='-20%' y='-20%' width='140%' height='140%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' seed='{(h%97)+1}'/>
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

  <circle cx='330' cy='160' r='420' fill='url(#glow1)' filter='url(#blur)'/>
  <circle cx='1320' cy='700' r='460' fill='url(#glow2)' filter='url(#blur)'/>

  <!-- ambient streaks -->
  <g opacity='0.18'>
    <path d='M-80 620 C 260 520, 520 520, 860 420 S 1460 180, 1720 140' fill='none' stroke='{a2}' stroke-width='10' stroke-linecap='round'/>
    <path d='M-80 680 C 260 580, 520 580, 860 480 S 1460 240, 1720 200' fill='none' stroke='{a1}' stroke-width='6' stroke-linecap='round'/>
  </g>

  <!-- subtle grid -->
  <g opacity='0.10' stroke='rgba(255,255,255,0.9)' stroke-width='1'>
    <path d='M0 120H1600M0 300H1600M0 480H1600M0 660H1600M0 840H1600'/>
    <path d='M160 0V900M360 0V900M560 0V900M760 0V900M960 0V900M1160 0V900M1360 0V900'/>
  </g>

  <!-- noise overlay -->
  <rect width='1600' height='900' filter='url(#noise)' opacity='0.75'/>

  <!-- floating glass panels -->
  <g filter='url(#shadow)'>
    <g transform='translate(0 0) rotate(-6 800 450)'>
      <rect x='260' y='220' width='1080' height='520' rx='60' fill='url(#glass)' stroke='rgba(255,255,255,0.12)' stroke-width='2'/>
      <rect x='300' y='260' width='1000' height='440' rx='52' fill='rgba(0,0,0,0.10)' stroke='url(#edge)' stroke-width='1.2'/>
      <g opacity='0.9'>
        <rect x='340' y='300' width='240' height='12' rx='8' fill='rgba(255,255,255,0.18)'/>
        <rect x='340' y='328' width='170' height='10' rx='8' fill='rgba(255,255,255,0.12)'/>
        <rect x='340' y='354' width='210' height='10' rx='8' fill='rgba(255,255,255,0.10)'/>
        <rect x='1060' y='300' width='80' height='10' rx='8' fill='{a1}' opacity='0.65'/>
        <rect x='1150' y='300' width='80' height='10' rx='8' fill='{a2}' opacity='0.55'/>
      </g>
      <g opacity='0.55'>
        <rect x='340' y='628' width='360' height='12' rx='8' fill='rgba(255,255,255,0.10)'/>
        <rect x='340' y='654' width='300' height='10' rx='8' fill='rgba(255,255,255,0.08)'/>
        <rect x='340' y='678' width='240' height='10' rx='8' fill='rgba(255,255,255,0.06)'/>
      </g>
    </g>
  </g>

  <!-- main icon scene -->
  {icon(icon_type, a1, a2)}

  <!-- vignette -->
  <rect width='1600' height='900' fill='rgba(0,0,0,0.22)'/>
</svg>
"""


def main():
  if not covers_dir.exists():
    raise SystemExit(f"covers dir not found: {covers_dir}")

  files = sorted([p for p in covers_dir.iterdir() if p.suffix.lower() == '.svg'])
  updated = 0
  for p in files:
    a2 = ACC2.get(p.name, '#2bd9ff')
    icon_type = TYPE_BY_FILE.get(p.name, 'chatbot' if 'chat' in p.name else 'code_assistant')
    svg = svg_template(p.name, icon_type, ACCENT1, a2)
    p.write_text(svg, encoding='utf-8')
    updated += 1

  print(f"Updated {updated} SVG covers in {covers_dir}")


if __name__ == '__main__':
  main()
