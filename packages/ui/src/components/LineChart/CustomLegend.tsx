'use client'

import type { DatumValue } from '@nivo/core'
import type { Serie } from '@nivo/line'
import { theme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ComponentProps } from 'react'
import { getLegendColor } from '../../helpers/legend'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'
import { getAverage, getCurrent, getMax, getMin, getSelected } from './helpers'
import {
  backgroundColorLegend,
  cellValueContainer,
  container,
  lineChartBody,
  lineChartHead,
  lineChartLegend,
  lineChartRow,
  longContainer,
  textLegend,
} from './styles.css'

type CellProps = {
  value?: DatumValue
  variant: ComponentProps<typeof Text>['variant']
}

const Cell = ({ value, variant }: CellProps) => (
  <Text as="span" className={textLegend} sentiment="neutral" variant={variant}>
    {value as string | number}
  </Text>
)

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
    className={`${className ? `${className} ` : ''}${container}`}
    data-testid={dataTestId}
  >
    <div className={lineChartHead}>
      <div className={longContainer}>Legend</div>
      <Cell value="Minimum" variant="body" />
      <Cell value="Maximum" variant="body" />
      <Cell value="Average" variant="body" />
      <Cell value="Current" variant="body" />
    </div>
    <div className={lineChartBody}>
      {data?.map((row, index) => {
        const values = row.data.map(val => val.y as number)
        const labelIndexed = `${row.id}${index}`
        const id = row.id.toString()

        return (
          <div
            className={lineChartRow}
            // oxlint-disable-next-line no-unknown-property
            key={labelIndexed}
          >
            <div className={longContainer}>
              <Checkbox
                checked={selected.includes(labelIndexed)}
                name={id}
                onChange={() =>
                  setSelected([...getSelected(id, index, selected)])
                }
              >
                <div className={cellValueContainer}>
                  <Text as="span" sentiment="neutral" variant="bodySmall">
                    {row?.['label']}
                  </Text>
                  <div
                    className={lineChartLegend}
                    // oxlint-disable-next-line no-unknown-property
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
