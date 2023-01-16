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
    padding-bottom: 8px;
    border-bottom: 1px solid ${theme.colors.neutral.backgroundStrong};

    > :not(:last-child) {
      margin-right: 8px;
    }
  `,
  legend: (index: number) => (theme: Theme) =>
    css`
      margin-left: 16px;
      width: 32px;
      height: 2px;
      background-color: ${getLegendColor(index, theme)};
    `,
  row: css`
    display: flex;
    padding: 4px 0;
    > :not(:last-child) {
      margin-right: 8px;
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
  <StyledText variant={variant} color="neutral" as="span">
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
}

const StyledContainer = styled.div`
  margin-top: ${({ theme }) => theme.space[2]};
`

const CustomLegend = ({
  axisTransformer = noop,
  data,
  selected,
  setSelected,
}: CustomLegendProps) => (
  <StyledContainer>
    <div css={styles.head}>
      <LongContainer>Legend</LongContainer>
      <Cell variant="body" value="Minimum" />
      <Cell variant="body" value="Maximum" />
      <Cell variant="body" value="Average" />
      <Cell variant="body" value="Current" />
    </div>
    <div css={styles.body}>
      {data?.map((row, index) => {
        const values = row.data.map(val => val.y as number)
        const labelIndexed = `${row.id}${index}`
        const id = row.id.toString()

        return (
          <div key={labelIndexed} css={styles.row}>
            <LongContainer>
              <Checkbox
                checked={selected.indexOf(labelIndexed) > -1}
                name={id}
                onChange={() =>
                  setSelected([...getSelected(id, index, selected)])
                }
              >
                <CellValueContainer>
                  <Text as="span" variant="bodySmall" color="neutral">
                    {row?.['label']}
                  </Text>
                  <div data-testid={`label-${id}`} css={styles.legend(index)} />
                </CellValueContainer>
              </Checkbox>
            </LongContainer>
            <Cell variant="bodySmall" value={axisTransformer(getMin(values))} />
            <Cell variant="bodySmall" value={axisTransformer(getMax(values))} />
            <Cell
              variant="bodySmall"
              value={axisTransformer(getAverage(values))}
            />
            <Cell
              variant="bodySmall"
              value={axisTransformer(getCurrent(values))}
            />
          </div>
        )
      })}
    </div>
  </StyledContainer>
)

export default CustomLegend
