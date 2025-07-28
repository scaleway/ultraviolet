import type { StoryFn } from '@storybook/react-vite'
import { consoleLightTheme } from '@ultraviolet/themes'
import { useEffect, useState } from 'react'
import { Stack } from '../../Stack'
import { Row } from '..'
import { DivWithBackground } from './DivWithBackground'

export const Responsive: StoryFn = props => {
  const [breakpoint, setBreakpoint] = useState<'xxsmall' | 'xsmall' | 'small'>(
    'xxsmall',
  )

  useEffect(() => {
    const calc = () => {
      if (
        window.innerWidth <=
        Number(consoleLightTheme.breakpoints.xxsmall.replace('px', ''))
      ) {
        setBreakpoint('xxsmall')
      } else if (
        window.innerWidth <=
        Number(consoleLightTheme.breakpoints.xsmall.replace('px', ''))
      ) {
        setBreakpoint('xsmall')
      } else {
        setBreakpoint('small')
      }
    }
    calc()
    window.addEventListener('resize', calc)

    return () => window.removeEventListener('resize', calc)
  }, [])

  const row1Columns = {
    xxsmall: ['1fr', '1fr', '1fr'],
    xsmall: ['2fr', '2fr', '2fr'],
    small: ['3fr', '6fr', '3fr'],
  } as const

  const row2Columns = {
    xxsmall: ['1fr', '1fr', '1fr'],
    xsmall: ['2fr', '2fr', '2fr'],
    small: ['4fr', '3fr', '4fr'],
  } as const

  // Helper to get current columns for a row
  const getColumns = (columnsMap: typeof row1Columns | typeof row2Columns) =>
    columnsMap[breakpoint] || columnsMap.xxsmall

  const row1Current = getColumns(row1Columns)
  const row2Current = getColumns(row2Columns)

  return (
    <Stack gap={1}>
      <Row
        {...props}
        templateColumns={{
          xxsmall: '1fr',
          xsmall: '2fr 2fr 2fr',
          small: '3fr 6fr 3fr',
        }}
        gap={{
          xxsmall: 1,
          xsmall: 1,
          small: 2,
        }}
      >
        {row1Current.map((col, idx) => {
          const sentiments = ['primary', 'success', 'danger']

          return (
            <DivWithBackground key={idx} data-sentiment={sentiments[idx]}>
              {col}
            </DivWithBackground>
          )
        })}
      </Row>
      <Row
        {...props}
        templateColumns={{
          xxsmall: '1fr',
          xsmall: '2fr 2fr 2fr',
          small: '4fr 3fr 4fr',
        }}
        gap={{
          xxsmall: 1,
          xsmall: 1,
          small: 2,
        }}
      >
        {row2Current.map((col, idx) => {
          const sentiments = ['primary', 'success', 'danger']

          return (
            <DivWithBackground key={idx} data-sentiment={sentiments[idx]}>
              {col}
            </DivWithBackground>
          )
        })}
      </Row>
    </Stack>
  )
}

Responsive.parameters = {
  docs: {
    description: {
      story:
        'You can set different type of `templateColumns` and `gap` according to theme breakpoints. We recommend switching to [story view mode](/story/components-layout-row--responsive) and in the top bar select screen size to test on different breakpoints.',
    },
  },
}
