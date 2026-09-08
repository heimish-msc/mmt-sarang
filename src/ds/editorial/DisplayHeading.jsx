import React from 'react';

const SIZES = { xxl: 'var(--display-xxl)', xl: 'var(--display-xl)', lg: 'var(--display-lg)', md: 'var(--display-md)' };

export function DisplayHeading({ size = 'xl', weight = 'heavy', width = 'normal', align = 'left', as = 'h2', invert = false, children, style, ...rest }) {
  const Tag = as;
  return (
    <Tag {...rest} style={{
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: SIZES[size],
      fontWeight: weight === 'heavy' ? 800 : weight === 'medium' ? 600 : 400,
      fontStretch: width === 'wide' ? '112%' : width === 'narrow' ? '86%' : '100%',
      lineHeight: 'var(--lh-display)',
      letterSpacing: 'var(--track-display)',
      textTransform: 'uppercase',
      textAlign: align,
      color: invert ? 'var(--text-invert)' : 'var(--text-display)',
      textWrap: 'balance',
      ...style,
    }}>{children}</Tag>
  );
}
