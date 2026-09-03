import { useTheme } from '@ultraviolet/themes'
import type { consoleLightTheme } from '@ultraviolet/themes'
import { Badge, Checkbox, Row, Stack, Text } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { contrastStyle } from './styles.css'
import { previewBackgroundColor, previewTextColor, swatchColor, swatchSize } from './variables.css'

type Theme = typeof consoleLightTheme

const SENTIMENTS = ['primary', 'secondary', 'neutral', 'success', 'danger', 'warning', 'info'] as const

// Module-scope persistence: the theme switcher remounts the story tree, so plain
// useState is wiped on each light/dark/darker toggle. Keep it here to survive remounts.
const persist = {
  highlightFailures: false,
  hideDisabled: false,
  scrollY: 0,
}

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

const LEVEL_META: Record<ContrastLevel, { sentiment: 'success' | 'danger'; label: string; description: string }> = {
  pass: { sentiment: 'success', label: 'AA', description: '\u2265 4.5:1 \u2014 passes WCAG AA for normal text' },
  fail: { sentiment: 'danger', label: 'Fail', description: '< 4.5:1 \u2014 does not meet WCAG AA' },
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
    className={contrastStyle.swatch}
    style={assignInlineVars({
      [swatchColor]: color,
      [swatchSize]: `${size}px`,
    })}
  />
)

const LEVEL_ORDER: ContrastLevel[] = ['pass', 'fail']

const Legend = () => (
  <Stack direction="row" gap={2} wrap alignItems="center">
    {LEVEL_ORDER.map(level => (
      <Stack key={level} direction="row" gap={0.5} alignItems="center">
        <Badge sentiment={LEVEL_META[level].sentiment} size="small">
          {LEVEL_META[level].label}
        </Badge>
        <Text as="span" sentiment="neutral" prominence="weak" variant="bodySmall">
          {LEVEL_META[level].description}
        </Text>
      </Stack>
    ))}
  </Stack>
)

const SummaryBar = ({ counts }: { counts: { total: number; pass: number; fail: number } }) => (
  <Stack className={contrastStyle.summaryBar} direction="row" gap={2} alignItems="center" wrap>
    <Text as="span" prominence="strong" sentiment="neutral" variant="bodySmallStrong">
      {counts.total} intended pairings
    </Text>
    <Badge sentiment="success">
      {'\u2713'} {counts.pass} pass
    </Badge>
    <Badge sentiment="danger">
      {'\u2717'} {counts.fail} fail
    </Badge>
  </Stack>
)

const PairingCard = ({
  pairing,
  highlightFailures,
}: {
  pairing: Pairing
  theme: Theme
  highlightFailures: boolean
}) => (
  <div
    className={contrastStyle.pairingCard}
    data-highlight={highlightFailures ? 'true' : 'false'}
    data-level={pairing.level}
  >
    <div
      className={contrastStyle.preview}
      style={assignInlineVars({
        [previewBackgroundColor]: pairing.bgVal,
        [previewTextColor]: pairing.textVal,
      })}
    >
      <Text as="span" variant="bodyStronger">
        The quick brown fox
      </Text>
      <Text as="span" style={{ opacity: 0.85 }} variant="caption">
        0123456789
      </Text>
    </div>
    <Stack className={contrastStyle.pairingFooter} direction="row" alignItems="center" justifyContent="space-between">
      <Stack gap={0.25}>
        <Text
          as="span"
          className={contrastStyle.capitalize}
          prominence="strong"
          sentiment="neutral"
          variant="bodySmallStrong"
        >
          {pairing.suffix || 'default'}
        </Text>
        <Stack direction="row" gap={0.5} alignItems="center">
          <Swatch color={pairing.textVal} size={10} />
          <Text as="span" prominence="weak" sentiment="neutral" variant="caption">
            {pairing.textVal}
          </Text>
          <Text as="span" prominence="weak" sentiment="neutral" variant="caption">
            on
          </Text>
          <Swatch color={pairing.bgVal} size={10} />
          <Text as="span" prominence="weak" sentiment="neutral" variant="caption">
            {pairing.bgVal}
          </Text>
        </Stack>
      </Stack>
      <Stack alignItems="flex-end" gap={0.25}>
        <Text
          as="span"
          className={`${contrastStyle.capitalize} ${contrastStyle.ratioText[pairing.level]}`}
          sentiment="neutral"
          variant="bodySmallStronger"
        >
          {pairing.ratio.toFixed(2)}
          {pairing.level === 'pass' ? ' \u2713' : ' \u2717'}
        </Text>
        <Badge sentiment={LEVEL_META[pairing.level].sentiment} size="small">
          {LEVEL_META[pairing.level].label}
        </Badge>
      </Stack>
    </Stack>
  </div>
)

export const ContrastChecker = () => {
  const theme = useTheme()
  const [highlightFailures, setHighlightFailures] = useState(persist.highlightFailures)
  const [hideDisabled, setHideDisabled] = useState(persist.hideDisabled)

  useEffect(() => {
    const onScroll = () => {
      persist.scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.scrollTo(0, persist.scrollY)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <Stack className={contrastStyle.root} gap={3}>
      <Stack gap={1.5}>
        <Text as="h1" prominence="strong" sentiment="neutral" variant="headingStronger">
          Color Contrast Checker
        </Text>
        <Text as="p" sentiment="neutral" variant="bodySmall">
          WCAG contrast ratios for intended text-on-background pairings (matching state &amp; variant suffixes) within
          each sentiment. Switch between light / dark / darker themes using the toolbar to check each theme.
        </Text>
      </Stack>

      <Legend />
      <SummaryBar counts={counts} />

      <Stack direction="row" gap={3} wrap>
        <Checkbox
          checked={highlightFailures}
          onChange={e => {
            persist.highlightFailures = e.target.checked
            setHighlightFailures(e.target.checked)
          }}
        >
          Highlight failures only (dim passing pairings)
        </Checkbox>
        <Checkbox
          checked={hideDisabled}
          onChange={e => {
            persist.hideDisabled = e.target.checked
            setHideDisabled(e.target.checked)
          }}
        >
          Hide disabled colors
        </Checkbox>
      </Stack>

      {groups.map(({ sentiment, pairings }) => (
        <Stack key={sentiment} gap={1.5}>
          <Text as="h2" className={contrastStyle.capitalize} sentiment="neutral" variant="headingSmallStrong">
            {sentiment}
          </Text>
          <Row gap={1.5} templateColumns="repeat(auto-fill, minmax(220px, 1fr))">
            {pairings.map(pairing => (
              <PairingCard
                key={pairing.textKey}
                pairing={pairing}
                theme={theme}
                highlightFailures={highlightFailures}
              />
            ))}
          </Row>
        </Stack>
      ))}
    </Stack>
  )
}
