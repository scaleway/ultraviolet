import { ColorItem, ColorPalette } from '@storybook/addon-docs/blocks'
import { consoleDarkTheme, consoleDarkerTheme, consoleLightTheme } from '@ultraviolet/themes'
import { useDocsTheme } from '../../../../.storybook/components/useDocsTheme'

const SENTIMENTS = ['primary', 'secondary', 'neutral', 'success', 'danger', 'warning', 'info'] as const

const CATEGORIES = ['background', 'border', 'text'] as const

const VARIANTS = [
  { suffix: '', label: 'Default' },
  { suffix: 'Strong', label: 'Strong' },
  { suffix: 'Stronger', label: 'Stronger' },
  { suffix: 'Weak', label: 'Weak' },
] as const

const STATES = [
  { suffix: 'Disabled', label: 'Disabled' },
  { suffix: '', label: 'Default' },
  { suffix: 'Hover', label: 'Hover' },
] as const

const THEMES = {
  dark: consoleDarkTheme,
  darker: consoleDarkerTheme,
  light: consoleLightTheme,
} as const

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const cleanGradients = (gradients: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(gradients).map(([key, value]) => [key, value.replace(/;$/u, '')]))

const ICON_STATE_LABELS: Record<string, string> = {
  fill: 'Default',
  fillDisabled: 'Disabled',
  fillStrong: 'Strong',
  fillStrongDisabled: 'Strong Disabled',
  fillWeak: 'Weak',
  fillWeakDisabled: 'Weak Disabled',
}

const mapIconFills = (fills: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(fills).map(([key, value]) => [ICON_STATE_LABELS[key] ?? key, value]))

const chunkObject = (obj: Record<string, string>, size: number): Record<string, string>[] => {
  const entries = Object.entries(obj)
  const chunks: Record<string, string>[] = []

  for (let i = 0; i < entries.length; i += size) {
    chunks.push(Object.fromEntries(entries.slice(i, i + size)))
  }

  return chunks
}

const ColorsPalette = () => {
  const themeName = useDocsTheme()
  const theme = THEMES[themeName]

  return (
    <>
      <h2>Sentiments</h2>
      {SENTIMENTS.map(sentiment => {
        const sentimentColors = theme.colors[sentiment] as Record<string, string>

        return (
          <div key={sentiment}>
            <h3 style={{ textTransform: 'capitalize' }}>{sentiment}</h3>
            <ColorPalette>
              {CATEGORIES.flatMap(category =>
                VARIANTS.map(variant => {
                  const base = `${category}${variant.suffix}`

                  // Skip variants that don't exist for this sentiment
                  // (e.g. "Stronger"/"Weak" only exist for "neutral").
                  if (!sentimentColors[base]) return null

                  const colors: Record<string, string> = {}

                  STATES.forEach(state => {
                    const key = `${base}${state.suffix}`
                    const value = sentimentColors[key]
                    if (value) colors[state.label] = value
                  })

                  return (
                    <ColorItem
                      key={`${sentiment}-${base}`}
                      title={capitalize(category)}
                      subtitle={variant.label}
                      colors={colors}
                    />
                  )
                }),
              )}
            </ColorPalette>
          </div>
        )
      })}

      <h2>Other</h2>

      <h3>Data</h3>
      <ColorPalette>
        {chunkObject(theme.colors.other.data.charts, 3).map((chunk, index) => (
          <ColorItem key={`charts-${index}`} title="Charts" subtitle="Data" colors={chunk} />
        ))}
      </ColorPalette>

      <h3>Gradients</h3>
      <ColorPalette>
        {chunkObject(cleanGradients(theme.colors.other.gradients.background.linear), 3).map((chunk, index) => (
          <ColorItem key={`linear-${index}`} title="Linear" subtitle="Gradient" colors={chunk} />
        ))}
        {chunkObject(cleanGradients(theme.colors.other.gradients.background.radial), 3).map((chunk, index) => (
          <ColorItem key={`radial-${index}`} title="Radial" subtitle="Gradient" colors={chunk} />
        ))}
      </ColorPalette>

      <h3>Icon</h3>
      <h4>Category</h4>
      <ColorPalette>
        {Object.entries(theme.colors.other.icon.category).map(([sentiment, fills]) => (
          <ColorItem
            key={`icon-category-${sentiment}`}
            title={capitalize(sentiment)}
            subtitle="Category"
            colors={mapIconFills(fills)}
          />
        ))}
      </ColorPalette>
      <h4>Product</h4>
      <ColorPalette>
        {Object.entries(theme.colors.other.icon.product).map(([sentiment, fills]) => (
          <ColorItem
            key={`icon-product-${sentiment}`}
            title={capitalize(sentiment)}
            subtitle="Product"
            colors={mapIconFills(fills)}
          />
        ))}
      </ColorPalette>
    </>
  )
}

export default ColorsPalette
