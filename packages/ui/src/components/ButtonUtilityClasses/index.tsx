import type { ReactNode } from 'react'
import styles from './styles.module.css'
import '@ultraviolet/themesCss/style/light.css'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const button = cva(styles['base'], {
  variants: {
    sentiment: {
      primary: [],
      secondary: [],
      danger: [],
    },
    variant: {
      filled: [],
      ghost: [],
      outlined: [],
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      sentiment: 'primary',
      className: [
        'color-primary-background-strong',
        'color-primary-border-strong',
        'color-primary-text-strong',
      ],
    },
    {
      variant: 'filled',
      sentiment: 'secondary',
      className: [
        'color-secondary-background-strong',
        'color-secondary-border-strong',
        'color-secondary-text-strong',
      ],
    },
    {
      variant: 'filled',
      sentiment: 'danger',
      className: [
        'color-danger-background-strong',
        'color-danger-border-strong',
        'color-danger-text-strong',
      ],
    },
    {
      variant: 'outlined',
      sentiment: 'primary',
      className: [
        'color-primary-border',
        'color-primary-text',
        'color-other-monochrome-white-background',
      ],
    },
    {
      variant: 'outlined',
      sentiment: 'secondary',
      className: [
        'color-secondary-border',
        'color-secondary-text',
        'color-other-monochrome-white-background',
      ],
    },
    {
      variant: 'outlined',
      sentiment: 'danger',
      className: [
        'color-danger-border',
        'color-danger-text',
        'color-other-monochrome-white-background',
      ],
    },
    {
      variant: 'ghost',
      sentiment: 'primary',
      className: [
        'color-primary-border',
        'color-primary-text',
        'color-primary-background',
      ],
    },
    {
      variant: 'ghost',
      sentiment: 'secondary',
      className: [
        'color-secondary-border',
        'color-secondary-text',
        'color-secondary-background',
      ],
    },
    {
      variant: 'ghost',
      sentiment: 'danger',
      className: [
        'color-danger-border',
        'color-danger-text',
        'color-danger-background',
      ],
    },
  ],
  defaultVariants: {},
})

export type ButtonVariantProps = VariantProps<typeof button>
export type ButtonProps = Omit<ButtonVariantProps, 'sentiment' | 'variant'> &
  Required<Pick<ButtonVariantProps, 'sentiment' | 'variant'>>

type ButtonUtilityClassesProps = {
  children: ReactNode
  className?: string
  hasGreenBorder?: boolean
} & ButtonProps

export const ButtonUtilityClasses = ({
  children,
  sentiment,
  variant,
  className,
  hasGreenBorder,
}: ButtonUtilityClassesProps) => (
  <button
    type="button"
    className={`${className} ${button({ sentiment, variant })}`}
    data-has-green-border={hasGreenBorder ? 'true' : undefined}
  >
    {children}
  </button>
)
