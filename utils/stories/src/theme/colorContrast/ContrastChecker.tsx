import { CheckIcon, CloseIcon } from '@ultraviolet/icons'
import { consoleDarkTheme, consoleDarkerTheme, consoleLightTheme, useThemeV2 } from '@ultraviolet/themes'
import { Badge, CheckboxGroup, Row, Stack, Text } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { contrastRatio, filterByPrefix, getContrastLevel, getSuffix } from './helpers'
import type { ContrastLevel, Pairing } from './helpers'
import { contrastStyle } from './styles.css'
import { previewBackgroundColor, previewTextColor, swatchColor, swatchSize } from './variables.css'

type Background = 'Neutral' | 'Color'
type Status = 'Pass' | 'Fail' | 'N/A'

const BACKGROUND_OPTIONS: Background[] = ['Neutral', 'Color']
const STATUS_OPTIONS: Status[] = ['Pass', 'Fail', 'N/A']

const SENTIMENTS = ['primary', 'secondary', 'neutral', 'success', 'danger', 'warning', 'info'] as const

const LEVEL_TO_STATUS: Record<ContrastLevel, Status> = {
  pass: 'Pass',
  fail: 'Fail',
  disabled: 'N/A',
}

// Module-scope persistence: the theme switcher remounts the story tree, so plain
// useState is wiped on each light/dark/darker toggle. Keep it here to survive remounts.
const persist: {
  backgrounds: Background[]
  statuses: Status[]
  scrollY: number
} = {
  backgrounds: BACKGROUND_OPTIONS,
  statuses: STATUS_OPTIONS,
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

const PairingCard = ({ pairing }: { pairing: Pairing }) => (
  <div className={contrastStyle.pairingCard} data-level={pairing.level}>
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
  const [backgrounds, setBackgrounds] = useState<Background[]>(persist.backgrounds)
  const [statuses, setStatuses] = useState<Status[]>(persist.statuses)
  const { theme: currentTheme } = useThemeV2()

  const theme = useMemo(() => {
    if (currentTheme === 'dark') {
      return consoleDarkTheme
    }

    if (currentTheme === 'darker') {
      return consoleDarkerTheme
    }

    return consoleLightTheme
  }, [currentTheme])

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

      const buildPairings = (textEntries: [string, string][], bgVal: string | undefined, bgKey: string | null) =>
        textEntries
          .map(([textKey, textVal]): Pairing | null => {
            const suffix = getSuffix(textKey, 'text')
            const isDisabled = suffix.toLowerCase().includes('disabled')

            const bgMatch = bgMap.get(suffix)
            const pairingBgVal = bgVal ?? bgMatch?.val
            if (!pairingBgVal) {
              return null
            }

            const ratio = contrastRatio(textVal, pairingBgVal)
            const level: ContrastLevel = isDisabled ? 'disabled' : getContrastLevel(ratio)
            // Status filter: keep only selected statuses
            if (!statuses.includes(LEVEL_TO_STATUS[level])) {
              return null
            }

            return {
              suffix,
              textKey,
              textVal,
              bgKey: bgKey ?? bgMatch?.key ?? 'background',
              bgVal: pairingBgVal,
              ratio,
              level,
            }
          })
          .filter((p): p is Pairing => p !== null)

      const pairings: Pairing[] = []
      if (backgrounds.includes('Color')) {
        // state-matched backgrounds, all text variants (current display)
        pairings.push(...buildPairings(filterByPrefix(colors, 'text'), undefined, null))
      }
      if (backgrounds.includes('Neutral')) {
        // every sentiment on the neutral default background, without strong variants
        const neutralTexts = filterByPrefix(colors, 'text').filter(([key]) => !key.toLowerCase().includes('strong'))
        pairings.push(...buildPairings(neutralTexts, theme.colors.neutral.background, 'neutral-background'))
      }

      // Drop exact duplicates (same text variant + background), e.g. the neutral sentiment's
      // default pairing is produced by both the "color" and "neutral" background modes.
      const seen = new Set<string>()
      const uniquePairings = pairings.filter(pairing => {
        const id = `${pairing.textKey}-${pairing.bgVal}`
        if (seen.has(id)) {
          return false
        }
        seen.add(id)
        return true
      })

      return { sentiment, pairings: uniquePairings }
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
  }, [backgrounds, statuses, theme.colors])

  return (
    <Stack className={contrastStyle.root} gap={3}>
      <Legend />
      <SummaryBar counts={counts} />

      <Stack direction="row" gap={10} wrap>
        <CheckboxGroup
          direction="row"
          legend="Background"
          name="background"
          onChange={e => {
            const value = e.target.value as Background
            const next = e.target.checked ? [...backgrounds, value] : backgrounds.filter(item => item !== value)
            persist.backgrounds = next
            setBackgrounds(next)
          }}
          value={backgrounds}
        >
          {BACKGROUND_OPTIONS.map(option => (
            <CheckboxGroup.Checkbox key={option} value={option}>
              {option}
            </CheckboxGroup.Checkbox>
          ))}
        </CheckboxGroup>
        <CheckboxGroup
          direction="row"
          legend="Status"
          name="status"
          onChange={e => {
            const value = e.target.value as Status
            const next = e.target.checked ? [...statuses, value] : statuses.filter(item => item !== value)
            persist.statuses = next
            setStatuses(next)
          }}
          value={statuses}
        >
          {STATUS_OPTIONS.map(option => (
            <CheckboxGroup.Checkbox key={option} value={option}>
              {option}
            </CheckboxGroup.Checkbox>
          ))}
        </CheckboxGroup>
      </Stack>

      {groups.map(({ sentiment, pairings }) => (
        <Stack key={sentiment} gap={1.5}>
          <Text as="h2" className={contrastStyle.capitalize} sentiment="neutral" variant="headingSmallStrong">
            {sentiment}
          </Text>
          <Row gap={1.5} templateColumns="repeat(auto-fill, minmax(220px, 1fr))">
            {pairings.map(pairing => (
              <PairingCard key={`${pairing.bgKey}-${pairing.bgVal}-${pairing.textKey}`} pairing={pairing} />
            ))}
          </Row>
        </Stack>
      ))}
    </Stack>
  )
}
