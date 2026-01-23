import { theme } from '@ultraviolet/themes'
import { globalStyle, styleVariants } from '@vanilla-extract/css'

export const VARIANTS = ['primary', 'neutral'] as const
const FILL_CLASSES = ['fill', 'fillStrong'] as const

export const categoryIcon = styleVariants({
  neutral: {},
  neutralDisabled: {},
  primary: {},
  primaryDisabled: {},
})

const color = theme.colors.other.icon.category

for (const variant of VARIANTS) {
  for (const fillClass of FILL_CLASSES) {
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
  }
}
