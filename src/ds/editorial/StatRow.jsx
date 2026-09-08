import React from 'react';

export function StatRow({ label, value = 0, showValue = true, invert = false, style, ...rest }) {
  const line = invert ? 'var(--line-invert)' : 'var(--line-hair)';
  return (
    <div {...rest} style={{ borderTop: `var(--hair) solid ${line}`, padding: '6px 0 8px', color: invert ? 'var(--text-invert)' : 'var(--text-display)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--sp-6)', fontFamily: 'var(--font-meta)', fontSize: 'var(--meta-lg)', fontWeight: 700, letterSpacing: 'var(--track-meta)', textTransform: 'uppercase' }}>
        <span>{label}</span>
        {showValue ? <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}%</span> : null}
      </div>
      <div style={{ marginTop: 6, height: 4, background: invert ? 'var(--ink-800)' : 'var(--ink-100)' }}>
        <div style={{ width: `${Math.max(0, Math.min(100, value))}%`, height: '100%', background: invert ? 'var(--paper-50)' : 'var(--ink-1000)', transition: 'width var(--dur-slow) var(--ease-standard)' }} />
      </div>
    </div>
  );
}
