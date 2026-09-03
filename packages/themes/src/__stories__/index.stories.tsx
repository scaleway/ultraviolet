import type { Meta, StoryFn } from '@storybook/react-vite'
import { useTheme } from '@ultraviolet/themes'
import type { consoleLightTheme } from '@ultraviolet/themes'
import { useMemo, useState } from 'react'

type Theme = typeof consoleLightTheme

const SENTIMENTS = ['primary', 'secondary', 'neutral', 'success', 'danger', 'warning', 'info'] as const

// --- WCAG contrast computation ---

const hexToRgb = (hex: string): [number, number, number] => {
  const cleaned = hex.replace('#', '')
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map(c => c + c)
          .join('')
      : cleaned
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)]
}

const relativeLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex)
  const toLinear = (c: number) => {
    const srgb = c / 255
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

const contrastRatio = (fg: string, bg: string): number => {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

// --- Thresholds & levels ---

const AA_THRESHOLD = 4.5
type ContrastLevel = 'pass' | 'fail'

const getContrastLevel = (ratio: number): ContrastLevel => (ratio >= AA_THRESHOLD ? 'pass' : 'fail')

const LEVEL_META: Record<ContrastLevel, { color: string; label: string; description: string }> = {
  pass: { color: '#2c8564', label: 'AA', description: '\u2265 4.5:1 \u2014 passes WCAG AA for normal text' },
  fail: { color: '#e51963', label: 'Fail', description: '< 4.5:1 \u2014 does not meet WCAG AA' },
}

// --- Color extraction helpers ---

const filterByPrefix = (colors: Record<string, string>, prefix: string) =>
  Object.entries(colors)
    .filter(([key]) => key.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))

const getSuffix = (key: string, prefix: string) => key.slice(prefix.length)

// --- Types ---

type Pairing = {
  suffix: string
  textKey: string
  textVal: string
  bgKey: string
  bgVal: string
  ratio: number
  level: ContrastLevel
}

// --- Components ---

const Swatch = ({ color, size = 12 }: { color: string; size?: number }) => (
  <span
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: 3,
      backgroundColor: color,
      border: '1px solid rgba(128,128,128,0.3)',
      flexShrink: 0,
    }}
  />
)

const LEVEL_ORDER: ContrastLevel[] = ['pass', 'fail']

const Legend = ({ theme }: { theme: Theme }) => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
    {LEVEL_ORDER.map(level => (
      <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: 4,
            backgroundColor: LEVEL_META[level].color,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 13, color: theme.colors.neutral.text }}>
          <strong>{LEVEL_META[level].label}</strong>
          <span style={{ marginLeft: 6, color: theme.colors.neutral.textWeak }}>{LEVEL_META[level].description}</span>
        </span>
      </div>
    ))}
  </div>
)

const SummaryBar = ({ counts, theme }: { counts: { total: number; pass: number; fail: number }; theme: Theme }) => (
  <div
    style={{
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '12px 16px',
      borderRadius: 8,
      backgroundColor: theme.colors.neutral.backgroundWeak,
      border: `1px solid ${theme.colors.neutral.border}`,
    }}
  >
    <span style={{ fontSize: 14, fontWeight: 700, color: theme.colors.neutral.textStrong }}>
      {counts.total} intended pairings
    </span>
    <span style={{ color: LEVEL_META.pass.color, fontWeight: 600, fontSize: 13 }}>
      {'\u2713'} {counts.pass} pass
    </span>
    <span style={{ color: LEVEL_META.fail.color, fontWeight: 600, fontSize: 13 }}>
      {'\u2717'} {counts.fail} fail
    </span>
  </div>
)

const PairingCard = ({
  pairing,
  theme,
  highlightFailures,
}: {
  pairing: Pairing
  theme: Theme
  highlightFailures: boolean
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      border: `1px solid ${pairing.level === 'pass' ? theme.colors.neutral.border : theme.colors.danger.border}`,
      opacity: highlightFailures ? (pairing.level === 'fail' ? 1 : 0.25) : 1,
      transition: 'opacity 0.2s',
    }}
  >
    <div
      style={{
        backgroundColor: pairing.bgVal,
        color: pairing.textVal,
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minHeight: 64,
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 600 }}>The quick brown fox</span>
      <span style={{ fontSize: 12, opacity: 0.85 }}>0123456789</span>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        backgroundColor: theme.colors.neutral.backgroundWeak,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{ fontSize: 12, fontWeight: 700, color: theme.colors.neutral.textStrong, textTransform: 'capitalize' }}
        >
          {pairing.suffix || 'default'}
        </span>
        <span style={{ fontSize: 11, color: theme.colors.neutral.textWeak }}>
          <Swatch color={pairing.textVal} size={10} /> {pairing.textVal}
          <span style={{ margin: '0 4px' }}>on</span>
          <Swatch color={pairing.bgVal} size={10} /> {pairing.bgVal}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: LEVEL_META[pairing.level].color }}>
          {pairing.ratio.toFixed(2)}
          {pairing.level === 'pass' ? ' ✔︎' : '❗'}
        </span>
        <span style={{ fontSize: 10, fontWeight: 600, color: theme.colors.neutral.textWeak }}>
          {LEVEL_META[pairing.level].label}
        </span>
      </div>
    </div>
  </div>
)

// --- Main story component ---

const ContrastChecker = () => {
  const theme = useTheme()
  const [highlightFailures, setHighlightFailures] = useState(false)
  const [hideDisabled, setHideDisabled] = useState(false)

  const { groups, counts } = useMemo(() => {
    const groups = SENTIMENTS.map(sentiment => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const colors = theme.colors[sentiment] as unknown as Record<string, string>
      const bgColors = filterByPrefix(colors, 'background')
      const textColors = filterByPrefix(colors, 'text')

      const bgMap = new Map(bgColors.map(([key, val]) => [getSuffix(key, 'background'), { key, val }]))

      const pairings: Pairing[] = textColors
        .map(([textKey, textVal]) => {
          const suffix = getSuffix(textKey, 'text')
          const bgMatch = bgMap.get(suffix)

          if (!bgMatch) return null
          if (hideDisabled && suffix.toLowerCase().includes('disabled')) return null

          const ratio = contrastRatio(textVal, bgMatch.val)
          const level = getContrastLevel(ratio)

          return {
            suffix,
            textKey,
            textVal,
            bgKey: bgMatch.key,
            bgVal: bgMatch.val,
            ratio,
            level,
          }
        })
        .filter((p): p is Pairing => p !== null)

      return { sentiment, pairings }
    })

    let total = 0
    let pass = 0
    let fail = 0

    for (const { pairings } of groups) {
      for (const pairing of pairings) {
        total++
        if (pairing.level === 'pass') pass++
        else fail++
      }
    }

    return { groups, counts: { total, pass, fail } }
  }, [theme, hideDisabled])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            color: theme.colors.neutral.textStrong,
          }}
        >
          Color Contrast Checker
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: theme.colors.neutral.text }}>
          WCAG contrast ratios for intended text-on-background pairings (matching state &amp; variant suffixes) within
          each sentiment. Switch between light / dark / darker themes using the toolbar to check each theme.
        </p>
      </div>

      <Legend theme={theme} />
      <SummaryBar counts={counts} theme={theme} />

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            fontSize: 14,
            color: theme.colors.neutral.text,
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={highlightFailures}
            onChange={e => setHighlightFailures(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          Highlight failures only (dim passing pairings)
        </label>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            fontSize: 14,
            color: theme.colors.neutral.text,
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={hideDisabled}
            onChange={e => setHideDisabled(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          Hide disabled colors
        </label>
      </div>

      {groups.map(({ sentiment, pairings }) => (
        <div key={sentiment} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: theme.colors.neutral.textStrong,
              textTransform: 'capitalize',
            }}
          >
            {sentiment}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            {pairings.map(pairing => (
              <PairingCard
                key={pairing.textKey}
                pairing={pairing}
                theme={theme}
                highlightFailures={highlightFailures}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default {
  title: 'Customization/Color Contrast',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Displays WCAG contrast ratios for intended text-on-background pairings (matching state & variant suffixes) within each sentiment. Use the theme switcher in the toolbar to check light, dark, and darker themes.',
      },
    },
  },
} satisfies Meta

export const Default: StoryFn = () => <ContrastChecker />

Default.storyName = 'Color Contrast Checker'
