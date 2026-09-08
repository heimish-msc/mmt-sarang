import React from 'react';

export function Tag({ tone = 'default', children, style, ...rest }) {
  const tones = {
    default: { color: 'var(--ink-1000)', border: 'var(--hair) solid var(--ink-1000)', background: 'transparent' },
    filled: { color: 'var(--paper-50)', border: 'var(--hair) solid var(--ink-1000)', background: 'var(--ink-1000)' },
    soft: { color: 'var(--text-muted)', border: 'var(--hair) solid var(--line-soft)', background: 'transparent' },
    signal: { color: 'var(--signal-500)', border: 'var(--hair) solid var(--signal-500)', background: 'transparent' },
  };
  return (
    <span {...rest} style={{ display: 'inline-block', padding: '4px 9px 3px', fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', fontWeight: 600, letterSpacing: 'var(--track-meta-wide)', textTransform: 'uppercase', lineHeight: 1.1, ...tones[tone], ...style }}>{children}</span>
  );
}
