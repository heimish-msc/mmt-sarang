import React from 'react';

export function ContactBlock({ fields = [], invert = false, style, ...rest }) {
  const line = invert ? 'var(--line-invert)' : 'var(--line-hair)';
  return (
    <dl {...rest} style={{ margin: 0, ...style }}>
      {fields.map((f, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 'var(--sp-6)', padding: '9px 0', borderTop: `var(--hair) solid ${line}`, borderBottom: i === fields.length - 1 ? `var(--hair) solid ${line}` : undefined }}>
          <dt style={{ fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', fontWeight: 600, letterSpacing: 'var(--track-meta)', textTransform: 'uppercase', color: invert ? 'var(--ink-200)' : 'var(--text-muted)' }}>{f.label}</dt>
          <dd style={{ margin: 0, fontSize: 'var(--body-sm)', color: invert ? 'var(--text-invert)' : 'var(--text-display)' }}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
