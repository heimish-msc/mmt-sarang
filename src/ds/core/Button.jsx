import React from 'react';

export function Button({ variant = 'solid', size = 'md', as = 'button', full = false, disabled = false, children, style, ...rest }) {
  const pad = size === 'sm' ? '7px 14px' : size === 'lg' ? '15px 30px' : '11px 22px';
  const fs = size === 'sm' ? 'var(--meta)' : size === 'lg' ? 'var(--meta-lg)' : '10.5px';
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-5)',
    padding: pad, width: full ? '100%' : undefined,
    fontFamily: 'var(--font-meta)', fontSize: fs, fontWeight: 700,
    letterSpacing: 'var(--track-meta-wide)', textTransform: 'uppercase', lineHeight: 1,
    borderRadius: 'var(--radius-0)', cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.35 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)',
    textDecoration: 'none',
  };
  const skins = {
    solid: { background: 'var(--ink-1000)', color: 'var(--paper-50)', border: 'var(--hair) solid var(--ink-1000)' },
    outline: { background: 'transparent', color: 'var(--ink-1000)', border: 'var(--hair) solid var(--ink-1000)' },
    ghost: { background: 'transparent', color: 'var(--ink-1000)', border: 'var(--hair) solid transparent', padding: '4px 0', letterSpacing: 'var(--track-meta-wide)' },
    invert: { background: 'var(--paper-50)', color: 'var(--ink-1000)', border: 'var(--hair) solid var(--paper-50)' },
  };
  const Tag = as;
  return (
    <Tag {...rest} disabled={as === 'button' ? disabled : undefined} style={{ ...base, ...skins[variant], ...style }}>
      {children}
      {variant === 'ghost' ? <span aria-hidden="true" style={{ fontWeight: 400 }}>&#8594;</span> : null}
    </Tag>
  );
}
