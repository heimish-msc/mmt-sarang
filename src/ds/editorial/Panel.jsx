import React from 'react';

export function Panel({ tone = 'ink', pad = 'var(--sp-9)', bleed = false, children, style, ...rest }) {
  const tones = {
    ink: { background: 'var(--surface-invert)', color: 'var(--text-invert)' },
    paper: { background: 'var(--surface-card)', color: 'var(--text-body)' },
    raised: { background: 'var(--surface-raised)', color: 'var(--text-body)', border: 'var(--hair) solid var(--line-soft)' },
    outline: { background: 'transparent', color: 'var(--text-body)', border: 'var(--hair) solid var(--line-hair)' },
  };
  return <div {...rest} style={{ padding: bleed ? 0 : pad, borderRadius: 'var(--radius-0)', ...tones[tone], ...style }}>{children}</div>;
}
