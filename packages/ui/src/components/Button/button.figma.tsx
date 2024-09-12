import figma from '@figma/code-connect/react'
import { Button } from '.'

figma.connect(
  Button,
  'https://www.figma.com/design/XHoO4V9LOFEFkAZsocYJ83/%5BCore%5D-Core?node-id=8396-163080&t=3Vg6b1oYUg7gxfWw-4',
  {
    props: {
      variant: figma.enum('variant', {
        filled: 'filled',
        outlined: 'outlined',
        ghost: 'ghost',
      }),
      sentiment: figma.enum('sentiment', {
        primary: 'primary',
        danger: 'danger',
        success: 'success',
        info: 'info',
        warning: 'warning',
        neutral: 'neutral',
      }),
      disabled: figma.boolean('disabled'),
      label: figma.nestedProps('label', {
        label: figma.string('label'),
      }),
      size: figma.enum('size', {
        xsmall: 'xsmall',
        small: 'small',
        medium: 'medium',
        large: 'large',
      }),
    },
    example: ({ variant, disabled, sentiment, label, size }) => (
      <Button
        variant={variant}
        disabled={disabled}
        sentiment={sentiment}
        size={size}
      >
        {label.label}
      </Button>
    ),
  },
)
