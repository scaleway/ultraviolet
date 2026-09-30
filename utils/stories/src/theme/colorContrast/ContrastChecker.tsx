import { CheckIcon, CloseIcon } from '@ultraviolet/icons'
import { useTheme } from '@ultraviolet/themes'
import type { consoleLightTheme } from '@ultraviolet/themes'
import { Badge, RadioGroup, Row, Stack, Text, Toggle } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { contrastRatio, filterByPrefix, getContrastLevel, getSuffix } from './helpers'
import type { ContrastLevel, Pairing } from './helpers'
import { contrastStyle } from './styles.css'
import { previewBackgroundColor, previewTextColor, swatchColor, swatchSize } from './variables.css'

type Theme = typeof consoleLightTheme

type State = 'default' | 'disabled' | 'both'
type Background = 'neutral' | 'color'

const SENTIMENTS = ['primary', 'secondary', 'neutral', 'success', 'danger', 'warning', 'info'] as const

// Module-scope persistence: the theme switcher remounts the story tree, so plain
// useState is wiped on each light/dark/darker toggle. Keep it here to survive remounts.
const persist: {
  highlightFailures: boolean
  state: State
  background: Background
  scrollY: number
} = {
  highlightFailures: false,
  state: 'both',
  background: 'color',
  scrollY: 0,
}

const LEVEL_META: Record<
  ContrastLevel,
  { sentiment: 'success' | 'danger' | 'neutral'; label: string; description: string; mark: ReactNode }
> = {
  pass: {
    sentiment: 'success',
    label: 'AA',
    description: '\u2265 4.5:1 \u2014 passes WCAG AA for normal text',
    mark: <CheckIcon />,
  },
  fail: {
    sentiment: 'danger',
    label: 'Fail',
    description: '< 4.5:1 \u2014 does not meet WCAG AA',
    mark: <CloseIcon />,
  },
  disabled: {
    sentiment: 'neutral',
    label: 'N/A',
    description: 'Disabled elements are exempt from WCAG AA contrast requirements',
    mark: '',
  },
}

const Swatch = ({ color, size = 12 }: { color: string; size?: number }) => (
  <span
    className={contrastStyle.swatch}
    style={assignInlineVars({
      [swatchColor]: color,
      [swatchSize]: `${size}px`,
    })}
  />
)

const LEVEL_ORDER: ContrastLevel[] = ['pass', 'fail', 'disabled']

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

const SummaryBar = ({ counts }: { counts: { total: number; pass: number; fail: number; disabled: number } }) => (
  <Stack className={contrastStyle.summaryBar} direction="row" gap={2} alignItems="center" wrap>
    <Text as="span" prominence="strong" sentiment="neutral" variant="bodySmallStrong">
      {counts.total} intended pairings
    </Text>
    {LEVEL_ORDER.map(level => (
      <Badge sentiment={LEVEL_META[level].sentiment} key={level}>
        {LEVEL_META[level].mark} {counts[level]} {LEVEL_META[level].label}
      </Badge>
    ))}
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
          {LEVEL_META[pairing.level].mark}
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
  const [state, setState] = useState<State>(persist.state)
  const [background, setBackground] = useState<Background>(persist.background)

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

      const bgMap = new Map(bgColors.map(([key, val]) => [getSuffix(key, 'background'), { key, val }]))

      // In "neutral" mode every sentiment is displayed on the neutral default background,
      // so drop the strong text variants (only default/disabled/hover remain).
      const textColors = filterByPrefix(colors, 'text').filter(
        ([key]) => background !== 'neutral' || !key.toLowerCase().includes('strong'),
      )
      const neutralBg = background === 'neutral' ? theme.colors.neutral.background : undefined

      const pairings: Pairing[] = textColors
        .map(([textKey, textVal]) => {
          const suffix = getSuffix(textKey, 'text')
          const isDisabled = suffix.toLowerCase().includes('disabled')
          if (state === 'disabled' && !isDisabled) {
            return null
          }
          if (state === 'default' && isDisabled) {
            return null
          }

          const bgMatch = bgMap.get(suffix)
          const bgVal = neutralBg ?? bgMatch?.val
          if (!bgVal) {
            return null
          }

          const ratio = contrastRatio(textVal, bgVal)
          const level: ContrastLevel = isDisabled ? 'disabled' : getContrastLevel(ratio)

          return {
            suffix,
            textKey,
            textVal,
            bgKey: neutralBg ? 'background' : (bgMatch?.key ?? 'background'),
            bgVal,
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
    let disabled = 0

    for (const { pairings } of groups) {
      for (const pairing of pairings) {
        total++
        if (pairing.level === 'disabled') {
          disabled++
        } else if (pairing.level === 'pass') {
          pass++
        } else {
          fail++
        }
      }
    }

    return { groups, counts: { total, pass, fail, disabled } }
  }, [theme, state, background])

  return (
    <Stack className={contrastStyle.root} gap={3}>
      <Legend />
      <SummaryBar counts={counts} />

      <Stack gap={1.5}>
        <Toggle
          checked={highlightFailures}
          onChange={e => {
            persist.highlightFailures = e.target.checked
            setHighlightFailures(e.target.checked)
          }}
          label="Highlight failures"
        />
        <Stack direction="row" gap={10} wrap>
          <RadioGroup
            direction="row"
            legend="State"
            name="state"
            onChange={e => {
              const value = e.target.value as State
              persist.state = value
              setState(value)
            }}
            value={state}
          >
            <RadioGroup.Radio label="default" value="default" />
            <RadioGroup.Radio label="disabled" value="disabled" />
            <RadioGroup.Radio label="both" value="both" />
          </RadioGroup>
          <RadioGroup
            direction="row"
            legend="Background"
            name="background"
            onChange={e => {
              const value = e.target.value as Background
              persist.background = value
              setBackground(value)
            }}
            value={background}
          >
            <RadioGroup.Radio label="neutral" value="neutral" />
            <RadioGroup.Radio label="color" value="color" />
          </RadioGroup>
        </Stack>
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
