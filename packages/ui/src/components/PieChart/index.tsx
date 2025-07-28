'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { Box } from '@nivo/core'
import { Pie } from '@nivo/pie'
import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'
import { getLegendColor } from '../../helpers/legend'
import { getNivoTheme } from '../../helpers/nivoTheme'
import { Text } from '../Text'
import Legends from './Legends'
import type { Data } from './types'

const Container = styled.div<{ height: number }>`
  display: flex;
  align-items: center;
  height: ${({ height }) => `${height}px`};
`

const EmptyLegend = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.space['5']};
`

const StyledContent = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;

  font-size: ${({ theme }) => theme.typography.headingStrong};
  line-height: 100px;
  height: 100px;
  width: 100px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
`

type PieChartProps = {
  chartProps?: Record<string, unknown>
  data?: Data[]
  height?: number
  width?: number
  emptyLegend?: string
  content?: ReactNode
  withLegend?: boolean
  margin?: Box
}

const DEFAULT_CHARTPROPS = {}
const DEFAULT_MARGIN = { bottom: 10, left: 10, right: 10, top: 10 }

/**
 * PieChart component is a wrapper around the Nivo Pie component to display a pie chart.
 * See https://nivo.rocks/pie/ for more information.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const PieChart = ({
  height = 206,
  width = 206,
  data = undefined,
  emptyLegend,
  content,
  withLegend = false,
  margin = DEFAULT_MARGIN,
  chartProps = DEFAULT_CHARTPROPS,
}: PieChartProps) => {
  const theme = useTheme()
  const [currentFocusIndex, setCurrentFocusIndex] = useState<string>()
  const emptyTooltip = useCallback(() => <span />, [])
  const isEmpty = !data || data.length === 0

  const EmptyLegendDisplayed = useCallback(
    () =>
      emptyLegend ? (
        <EmptyLegend>
          <Text as="p" variant="body">
            {emptyLegend}
          </Text>
        </EmptyLegend>
      ) : null,
    [emptyLegend],
  )

  const localColors = getLegendColor(theme)

  const LegendDisplayer = useCallback(
    () =>
      isEmpty ? (
        <EmptyLegendDisplayed />
      ) : (
        <Legends
          colors={localColors}
          data={data}
          focused={currentFocusIndex}
          onFocusChange={setCurrentFocusIndex}
        />
      ),
    [isEmpty, currentFocusIndex, data, EmptyLegendDisplayed, localColors],
  )

  return (
    <Container height={height}>
      <div style={{ position: 'relative' }}>
        <Pie
          activeOuterRadiusOffset={!isEmpty ? 4 : 0}
          colors={localColors}
          cornerRadius={0}
          data={
            !isEmpty
              ? data
              : [
                  {
                    id: 'empty',
                    percent: 100,
                  },
                ]
          }
          defs={[
            {
              background: 'inherit',
              color: theme.colors.neutral.textStrong,
              id: 'lines',
              lineWidth: 2,
              rotation: 0,
              spacing: 5,
              type: 'patternLines',
            },
          ]}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          height={height}
          innerRadius={0.8}
          margin={margin}
          onMouseEnter={(datum, event) => {
            if (!isEmpty) {
              const pie = event.currentTarget
              pie.style.cursor = 'pointer'
              setCurrentFocusIndex(datum.id.toString())
            }
          }}
          onMouseLeave={() => setCurrentFocusIndex(undefined)}
          padAngle={1}
          theme={getNivoTheme(theme)}
          tooltip={emptyTooltip}
          value="percent"
          width={width}
          {...chartProps}
        />
        {content ? <StyledContent>{content}</StyledContent> : null}
      </div>
      {withLegend ? <LegendDisplayer /> : null}
    </Container>
  )
}
