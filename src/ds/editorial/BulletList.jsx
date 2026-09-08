import React from 'react';

export function BulletList({ items = [], marker = 'dash', columns = 1, invert = false, style, ...rest }) {
  const glyph = { dash: '\u2014', dot: '\u2022', none: '' }[marker];
  return (
    <ul {...rest} style={{ listStyle: 'none', margin: 0, padding: 0, columns: columns > 1 ? columns : undefined, columnGap: 'var(--sp-9)', ...style }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: 'flex', gap: 'var(--sp-5)', breakInside: 'avoid', padding: '3px 0', fontSize: 'var(--body-sm)', lineHeight: 'var(--lh-body)', color: invert ? 'var(--paper-200)' : 'var(--text-body)' }}>
          {glyph ? <span aria-hidden="true" style={{ flex: '0 0 auto', color: invert ? 'var(--ink-400)' : 'var(--text-faint)' }}>{glyph}</span> : null}
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
