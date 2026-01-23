import { theme } from '@ultraviolet/themes'
import { globalStyle, styleVariants } from '@vanilla-extract/css'
import { SIZES, VARIANTS } from './constants'

const PROMINENCES = ['Weak', 'Strong', ''] as const

function generateSizeStyle(size: keyof typeof SIZES) {
  return {
    height: theme.sizing[SIZES[size]],
    minWidth: theme.sizing[SIZES[size]],
    width: theme.sizing[SIZES[size]],
  }
}

function generateVariantStyle(
  variant: (typeof VARIANTS)[number],
  disabled: boolean,
  prominence: (typeof PROMINENCES)[number],
) {
  const fillColor = `fill${prominence}${disabled ? 'Disabled' : ''}` as const

  return {
    fill: theme.colors.other.icon.product[variant][fillColor],
  }
}
export const productIconSizes = styleVariants(
  Object.fromEntries(
    Object.keys(SIZES).map(size => [
      size,
      generateSizeStyle(size as keyof typeof SIZES),
    ]),
  ),
)

export const productIconVariants = styleVariants({
  ...Object.fromEntries(VARIANTS.map(variant => [variant, {}])),
  ...Object.fromEntries(VARIANTS.map(variant => [`${variant}Disabled`, []])),
})

for (const prominence of PROMINENCES) {
  for (const variant of VARIANTS) {
    const variantClass = productIconVariants[variant]
    const variantClassDisabled = productIconVariants[`${variant}Disabled`]

    const selectorDefault = (disabled?: boolean) =>
      `${disabled ? variantClassDisabled : variantClass} .fill${prominence}`

    const selectorGfill = (disabled?: boolean) =>
      `${disabled ? variantClassDisabled : variantClass} g.fill${prominence} > *`

    const selectorPathField = (disabled?: boolean) =>
      `${disabled ? variantClassDisabled : variantClass} path[fill].fill${prominence}`

    // Disabled style
    globalStyle(
      selectorDefault(true),
      generateVariantStyle(variant, true, prominence),
    )
    globalStyle(
      selectorGfill(true),
      generateVariantStyle(variant, true, prominence),
    )
    globalStyle(
      selectorPathField(true),
      generateVariantStyle(variant, true, prominence),
    )

    // Non-disabled style
    globalStyle(
      selectorDefault(),
      generateVariantStyle(variant, false, prominence),
    )
    globalStyle(
      selectorGfill(),
      generateVariantStyle(variant, false, prominence),
    )
    globalStyle(
      selectorPathField(),
      generateVariantStyle(variant, false, prominence),
    )
  }
}
