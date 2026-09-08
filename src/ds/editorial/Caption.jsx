import React from 'react';

export function Caption({ tone = 'muted', tracking = 'normal', as = 'p', children, style, ...rest }) {
  const Tag = as;
  const colors = { muted: 'var(--text-muted)', ink: 'var(--text-display)', faint: 'var(--text-faint)', invert: 'var(--text-invert)', signal: 'var(--text-signal)' };
  return (
    <Tag {...rest} style={{ margin: 0, fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', fontWeight: 600, letterSpacing: tracking === 'wide' ? 'var(--track-meta-wide)' : 'var(--track-meta)', textTransform: 'uppercase', lineHeight: 'var(--lh-meta)', color: colors[tone], ...style }}>{children}</Tag>
  );
}
