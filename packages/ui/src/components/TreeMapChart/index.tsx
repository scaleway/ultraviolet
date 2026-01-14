'use client'

import type { TooltipProps, TreeMapSvgProps } from '@nivo/treemap'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import { useTheme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { useCallback, useMemo } from 'react'
import { getDataColors } from '../../helpers/treeMap'
import { treeMapContainer } from './styles.css'
import { Tooltip } from './Tooltip'
import type { DataType } from './types'

type TreeMapChartProps = {
  height?: string | number
  data: DataType
  className?: string
  tooltipFunction?: (
    props: TooltipProps<DataType>['node']['data'],
  ) => ComponentProps<typeof Tooltip>
  chartProps?: Partial<TreeMapSvgProps<DataType>>
  'data-testid'?: string
}

/**
 * TreeMapChart component is used to display data in a TreeMap chart format. It uses the Nivo library under the hood.
 * See https://nivo.rocks/treemap/html/ for more information.
 */
export const TreeMapChart = ({
  height = '537px', // maintains aspect ratio based on standard 1074px width
  data,
  tooltipFunction,
  chartProps,
  className,
  'data-testid': dataTestId,
}: TreeMapChartProps) => {
  const theme = useTheme()

  // Generate colors to be used by the TreeMap
  const colors = useMemo(() => getDataColors(data, theme), [data, theme])

  // Custom tooltip renderer - uses provided function or defaults to showing content and value
  const tooltip = useCallback(
    (props: TooltipProps<DataType>) => {
      const { value, content } = tooltipFunction
        ? tooltipFunction(props.node.data)
        : { content: props.node.data.content, value: props.node.data.value }

      return <Tooltip content={content} value={value} />
    },
    [tooltipFunction],
  )

  // Custom Theme configuration for label styling
  const nivoTheme = useMemo(
    () => ({
      labels: {
        text: theme.typography.captionStrong,
      },
    }),
    [theme.typography.captionStrong],
  )

  return (
    <div
      className={cn(className, treeMapContainer)}
      data-testid={dataTestId}
      style={{ height }}
    >
      <ResponsiveTreeMapHtml
        animate={false}
        borderColor={theme.colors.neutral.background}
        borderWidth={2}
        colors={colors}
        data={data}
        enableParentLabel={false}
        identity="id" // The property name used to uniquely identify each node
        label={node =>
          typeof node.data.content === 'string' ? node.data.content : node.id
        }
        labelSkipSize={20} // Minimum node size (in pixels) before labels are hidden
        labelTextColor={theme.colors.neutral.background}
        leavesOnly // Only show leaf nodes, not parent containers
        motionConfig="none"
        nodeOpacity={1} // Opacity of nodes (0-1); 1 is fully opaque
        orientLabel={false} // Disable label rotation so the ellipsis works well on long texts
        theme={nivoTheme}
        tile="squarify" // Algorithm that creates more square-like rectangles
        tooltip={tooltip}
        value="value" // The property name that determines the size of each node
        {...chartProps}
      />
    </div>
  )
}
