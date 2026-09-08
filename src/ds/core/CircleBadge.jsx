import React from 'react';

export function CircleBadge({ children, size = 44, tone = 'outline', style, ...rest }) {
  const tones = {
    outline: { background: 'transparent', color: 'var(--ink-1000)', border: 'var(--hair) solid var(--ink-1000)' },
    filled: { background: 'var(--ink-1000)', color: 'var(--paper-50)', border: 'var(--hair) solid var(--ink-1000)' },
    invert: { background: 'transparent', color: 'var(--paper-50)', border: 'var(--hair) solid var(--paper-50)' },
  };
  return (
    <span {...rest} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: Math.round(size * 0.43), lineHeight: 1, letterSpacing: '-0.02em', ...tones[tone], ...style }}>{children}</span>
  );
}
