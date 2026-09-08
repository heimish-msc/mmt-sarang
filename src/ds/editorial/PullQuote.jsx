import React from 'react';

export function PullQuote({ children, attribution, invert = false, style, ...rest }) {
  return (
    <blockquote {...rest} style={{ margin: 0, borderTop: `var(--rule-med) solid ${invert ? 'var(--line-invert)' : 'var(--line-hair)'}`, paddingTop: 'var(--sp-6)', ...style }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--title-lg)', fontWeight: 500, lineHeight: 1.18, letterSpacing: 'var(--track-title)', color: invert ? 'var(--text-invert)' : 'var(--text-display)', textWrap: 'pretty' }}>{children}</p>
      {attribution ? (
        <footer style={{ marginTop: 'var(--sp-6)', fontFamily: 'var(--font-meta)', fontSize: 'var(--meta)', letterSpacing: 'var(--track-meta)', textTransform: 'uppercase', color: invert ? 'var(--ink-200)' : 'var(--text-muted)' }}>{attribution}</footer>
      ) : null}
    </blockquote>
  );
}
