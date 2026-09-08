import React from 'react';

export function PageMeta({ items = [], invert = false, position = 'top', style, ...rest }) {
  const line = invert ? 'var(--line-invert)' : 'var(--line-hair)';
  return (
    <div {...rest} style={{
      display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-6)',
      padding: '5px 0 4px',
      borderTop: position === 'bottom' ? `var(--hair) solid ${line}` : undefined,
      borderBottom: position === 'top' ? `var(--hair) solid ${line}` : undefined,
      fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', letterSpacing: 'var(--track-meta)',
      textTransform: 'uppercase', color: invert ? 'var(--text-invert)' : 'var(--text-body)',
      ...style,
    }}>
      {items.map((it, i) => (
        <span key={i} style={{ whiteSpace: 'nowrap', opacity: it.dim ? 0.6 : 1, fontWeight: it.strong ? 700 : 400 }}>{it.label}</span>
      ))}
    </div>
  );
}
