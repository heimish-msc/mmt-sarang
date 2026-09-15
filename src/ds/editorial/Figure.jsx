import React, { useState } from 'react';

export function Figure({ src, alt = '', ratio = '3/4', caption, index, frame = false, tone = 'grey', grayscale = false, style, ...rest }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  const placeholder = {
    background: tone === 'dark'
      ? 'repeating-linear-gradient(135deg,#1A1A18 0 6px,#232321 6px 12px)'
      : 'repeating-linear-gradient(135deg,var(--ink-200) 0 6px,var(--ink-100) 6px 12px)',
  };
  return (
    <figure {...rest} style={{ margin: 0, ...style }}>
      <div style={{
        position: 'relative', aspectRatio: ratio, overflow: 'hidden',
        border: frame ? 'var(--hair) solid var(--line-hair)' : 'none',
        filter: grayscale ? 'grayscale(1) contrast(1.06)' : 'none',
        ...(showImage ? {} : placeholder),
      }}>
        {showImage ? <img src={src} alt={alt} onError={() => setFailed(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : (
          <span style={{ position: 'absolute', left: 8, bottom: 6, fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', letterSpacing: 'var(--track-meta)', textTransform: 'uppercase', color: tone === 'dark' ? 'var(--ink-400)' : 'var(--ink-600)' }}>Image</span>
        )}
        {index != null ? (
          <span style={{ position: 'absolute', right: 8, top: 6, fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', letterSpacing: 'var(--track-meta)', color: 'var(--paper-50)', mixBlendMode: 'difference' }}>{index}</span>
        ) : null}
      </div>
      {caption ? (
        <figcaption style={{ marginTop: 6, fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', letterSpacing: 'var(--track-meta)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
