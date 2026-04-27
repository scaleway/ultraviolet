'use client'

import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { getLegendColor } from '../../helpers/legend'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'

import { getAverage, getCurrent, getMax, getMin, getSelected } from './helpers'
import { Cell } from './LegendCell'
import { backgroundColorLegend, lineChartStyle } from './styles.css'

import type { Serie } from './helpers'
import type { DatumValue } from '@nivo/core'

type Transformer = (value: DatumValue) => string

const noop: Transformer = value => value.toString()

type CustomLegendProps = {
  axisTransformer?: Transformer
  data?: Serie[]
  selected: string[]
  setSelected: (selected: string[]) => void
  className?: string
  'data-testid'?: string
}

export const CustomLegend = ({
  axisTransformer = noop,
  data,
  selected,
  setSelected,
  className,
  'data-testid': dataTestId,
}: CustomLegendProps) => (
  <div
    className={cn(className, lineChartStyle.container)}
    data-testid={dataTestId}
  >
    <div className={lineChartStyle.head}>
      <div
        className={cn(lineChartStyle.longContainer, lineChartStyle.headTitle)}
      >
        Legend
      </div>
      <Cell value="Minimum" variant="body" />
      <Cell value="Maximum" variant="body" />
      <Cell value="Average" variant="body" />
      <Cell value="Current" variant="body" />
    </div>
    <div className={lineChartStyle.body}>
      {data?.map((row, index) => {
        const values = row.data
          .map(val => val.y)
          .filter(val => typeof val === 'number')
        const labelIndexed = `${row.id}${index}`
        const id = row.id.toString()

        return (
          <div className={lineChartStyle.row} key={labelIndexed}>
            <div
              className={cn(
                lineChartStyle.longContainer,
                lineChartStyle.content,
              )}
            >
              <Checkbox
                checked={selected.includes(labelIndexed)}
                name={id}
                onChange={() =>
                  setSelected([...getSelected(id, index, selected)])
                }
              >
                <div className={lineChartStyle.cellValueContainer}>
                  <Text as="span" sentiment="neutral" variant="bodySmall">
                    {row?.['label']}
                  </Text>
                  <div
                    className={lineChartStyle.legend}
                    data-testid={`label-${id}`}
                    style={assignInlineVars({
                      [backgroundColorLegend]: getLegendColor(theme)[index],
                    })}
                  />
                </div>
              </Checkbox>
            </div>
            <Cell value={axisTransformer(getMin(values))} variant="bodySmall" />
            <Cell value={axisTransformer(getMax(values))} variant="bodySmall" />
            <Cell
              value={axisTransformer(getAverage(values))}
              variant="bodySmall"
            />
            <Cell
              value={axisTransformer(getCurrent(values))}
              variant="bodySmall"
            />
          </div>
        )
      })}
    </div>
  </div>
)
