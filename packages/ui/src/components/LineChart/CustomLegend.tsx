'use client'

import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { DatumValue } from '@nivo/core'
import type { Serie } from '@nivo/line'
import type { ComponentProps } from 'react'
import { getLegendColor } from '../../helpers/legend'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'
import { getAverage, getCurrent, getMax, getMin, getSelected } from './helpers'

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

const StyledText = styled(Text)`
  text-align: right;
  flex: 1;
  min-width: 72px;
  align-self: center;
`

const Cell = ({ value, variant }: CellProps) => (
  <StyledText as="span" sentiment="neutral" variant={variant}>
    {value as string | number}
  </StyledText>
)

const CellValueContainer = styled.div`
  display: flex;
  align-items: center;
`

const LongContainer = styled.div`
  display: flex;
  flex: 6;
`

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

const StyledContainer = styled.div`
  margin-top: ${({ theme }) => theme.space[2]};
`

export const CustomLegend = ({
  axisTransformer = noop,
  data,
  selected,
  setSelected,
  className,
  'data-testid': dataTestId,
}: CustomLegendProps) => (
  <StyledContainer className={className} data-testid={dataTestId}>
    <div
      // oxlint-disable-next-line no-unknown-property
      css={styles.head}
    >
      <LongContainer>Legend</LongContainer>
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
            <LongContainer>
              <Checkbox
                checked={selected.includes(labelIndexed)}
                name={id}
                onChange={() =>
                  setSelected([...getSelected(id, index, selected)])
                }
              >
                <CellValueContainer>
                  <Text as="span" sentiment="neutral" variant="bodySmall">
                    {row?.['label']}
                  </Text>
                  <div
                    // oxlint-disable-next-line no-unknown-property
                    css={styles.legend(index)}
                    // oxlint-disable-next-line no-unknown-property
                    data-testid={`label-${id}`}
                  />
                </CellValueContainer>
              </Checkbox>
            </LongContainer>
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
  </StyledContainer>
)
