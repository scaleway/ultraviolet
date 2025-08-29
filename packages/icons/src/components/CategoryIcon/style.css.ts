import { globalStyle, styleVariants } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const VARIANTS = ['primary', 'neutral'] as const
const FILL_CLASSES = ['fill', 'fillStrong'] as const

export const categoryIcon = styleVariants({
  primaryDisabled: {},
  primary: {},
  neutralDisabled: {},
  neutral: {},
})

const color = theme.colors.other.icon.category

VARIANTS.forEach(variant => {
  FILL_CLASSES.forEach(fillClass => {
    // Default style
    globalStyle(`${categoryIcon[variant]} .${fillClass}`, {
      fill: color[variant][fillClass],
    })

    // Disabled style
    globalStyle(
      `${categoryIcon[`${variant}Disabled` as keyof typeof categoryIcon]} .${fillClass}`,
      {
        fill: color[variant][`${fillClass}Disabled`],
      },
    )
  })
})
