'use client'

import type { Box } from '@nivo/core'
import { Pie } from '@nivo/pie'
import type { theme as UVTheme } from '@ultraviolet/themes'
import { useTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { useCallback, useState } from 'react'
import { getLegendColor } from '../../helpers/legend'
import { getNivoTheme } from '../../helpers/nivoTheme'
import { Text } from '../Text'
import { Legends } from './Legends'
import {
  containerPie,
  contentPie,
  emptyLegendPie,
  heightContainerPie,
} from './styles.css'
import type { Data } from './types'

type PieChartProps = {
  chartProps?: Record<string, unknown>
  data?: Data[]
  height?: number
  width?: number
  emptyLegend?: string
  content?: ReactNode
  withLegend?: boolean
  margin?: Box
  style?: CSSProperties
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
  style,
}: PieChartProps) => {
  const theme = useTheme()
  const [currentFocusIndex, setCurrentFocusIndex] = useState<string>()
  const emptyTooltip = useCallback(() => <span />, [])
  const isEmpty = !data || data.length === 0

  const EmptyLegendDisplayed = useCallback(
    () =>
      emptyLegend ? (
        <div className={emptyLegendPie}>
          <Text as="p" variant="body">
            {emptyLegend}
          </Text>
        </div>
      ) : null,
    [emptyLegend],
  )

  const localColors = getLegendColor(theme as typeof UVTheme)

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
    <div
      className={containerPie}
      style={{
        ...assignInlineVars({
          [heightContainerPie]: height ? `${height}px` : '',
        }),
        ...style,
      }}
    >
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
        {content ? <div className={contentPie}>{content}</div> : null}
      </div>
      {withLegend ? <LegendDisplayer /> : null}
    </div>
  )
}
