'use client'

import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import type { DatumValue } from '@nivo/core'
import type { Serie } from '@nivo/line'
import type { ComponentProps } from 'react'
import { getLegendColor } from '../../helpers/legend'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'
import { getAverage, getCurrent, getMax, getMin, getSelected } from './helpers'
import {
  cellValueContainer,
  container,
  longContainer,
  textLegend,
} from './styles.css'

const styles = {
  body: (theme: Theme) => css`
    > :not(:last-child) {
      border-bottom: 1px solid ${theme.colors.neutral.backgroundStrong};
    }
  `,
  head: (theme: Theme) => css`
    display: flex;
    padding-bottom: ${theme.space['1']};
    border-bottom: 1px solid ${theme.colors.neutral.backgroundStrong};

    > :not(:last-child) {
      margin-right: ${theme.space['1']};
    }
  `,
  legend: (index: number) => (theme: Theme) =>
    css`
      margin-left: ${theme.space['2']};
      width: ${theme.sizing['400']};
      height: 2px;
      background-color: ${getLegendColor(theme)[index]};
    `,
  row: (theme: Theme) => css`
    display: flex;
    padding: ${theme.space['0.5']} 0;
    > :not(:last-child) {
      margin-right: ${theme.space['1']};
    }
  `,
}

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
    <div
      // oxlint-disable-next-line no-unknown-property
      css={styles.head}
    >
      <div className={longContainer}>Legend</div>
      <Cell value="Minimum" variant="body" />
      <Cell value="Maximum" variant="body" />
      <Cell value="Average" variant="body" />
      <Cell value="Current" variant="body" />
    </div>
    <div
      // oxlint-disable-next-line no-unknown-property
      css={styles.body}
    >
      {data?.map((row, index) => {
        const values = row.data.map(val => val.y as number)
        const labelIndexed = `${row.id}${index}`
        const id = row.id.toString()

        return (
          <div
            // oxlint-disable-next-line no-unknown-property
            css={styles.row}
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
                    // oxlint-disable-next-line no-unknown-property
                    css={styles.legend(index)}
                    // oxlint-disable-next-line no-unknown-property
                    data-testid={`label-${id}`}
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
