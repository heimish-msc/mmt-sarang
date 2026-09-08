import React from 'react';

export function Divider({ weight = 'hair', tone = 'ink', style, ...rest }) {
  const h = weight === 'heavy' ? 'var(--rule-heavy)' : weight === 'med' ? 'var(--rule-med)' : 'var(--hair)';
  const bg = tone === 'soft' ? 'var(--line-soft)' : tone === 'invert' ? 'var(--line-invert)' : 'var(--line-hair)';
  return <div {...rest} style={{ height: h, background: bg, width: '100%', ...style }} />;
}
