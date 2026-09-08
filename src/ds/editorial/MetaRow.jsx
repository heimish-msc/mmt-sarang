import React from 'react';

export function MetaRow({ cells = [], head = false, invert = false, last = false, style, ...rest }) {
  const line = invert ? 'var(--line-invert)' : 'var(--line-hair)';
  return (
    <div {...rest} style={{
      display: 'grid',
      gridTemplateColumns: cells.map(c => c.span ? `${c.span}fr` : '1fr').join(' '),
      gap: 'var(--grid-gutter)',
      alignItems: 'start',
      padding: 'var(--row-pad-y) 0',
      borderTop: `var(--hair) solid ${line}`,
      borderBottom: last ? `var(--hair) solid ${line}` : undefined,
      color: invert ? 'var(--text-invert)' : 'var(--text-body)',
      ...style,
    }}>
      {cells.map((c, i) => (
        <div key={i} style={{
          fontFamily: 'var(--font-text)',
          fontSize: head ? 'var(--meta)' : 'var(--body-sm)',
          fontWeight: head || c.strong ? 700 : 400,
          letterSpacing: head ? 'var(--track-meta)' : 'var(--track-body)',
          textTransform: head ? 'uppercase' : 'none',
          lineHeight: head ? 'var(--lh-meta)' : 'var(--lh-body)',
          color: c.dim ? (invert ? 'var(--ink-200)' : 'var(--text-muted)') : 'inherit',
          textAlign: c.align || 'left',
        }}>{c.content}</div>
      ))}
    </div>
  );
}
