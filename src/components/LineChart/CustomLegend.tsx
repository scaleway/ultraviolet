import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { DatumValue } from '@nivo/core'
import { Serie } from '@nivo/line'
import PropTypes from 'prop-types'
import React, { FunctionComponent, memo } from 'react'
import { getLegendColor } from '../../helpers/legend'
import Checkbox from '../Checkbox'
import FlexBox from '../FlexBox'
import Typography from '../Typography'
import { getAverage, getCurrent, getMax, getMin, getSelected } from './helpers'

const styles = {
  body: (theme: Theme) => css`
    > :not(:last-child) {
      border-bottom: 1px solid ${theme.colorsDeprecated.gray100};
    }
  `,
  cell: css`
    flex: 1;
    min-width: 72px;
    align-self: center;
  `,
  head: (theme: Theme) => css`
    display: flex;
    padding-bottom: 8px;
    border-bottom: 1px solid ${theme.colorsDeprecated.gray100};

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
  variant?: string
}

const Cell: FunctionComponent<CellProps> = memo(({ value, variant }) => (
  <Typography
    variant={variant}
    textAlign="right"
    color="gray700"
    css={styles.cell}
  >
    {value}
  </Typography>
))

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string,
}

export type Transformer = (value: DatumValue) => string

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

const CustomLegend: FunctionComponent<CustomLegendProps> = ({
  axisTransformer = noop,
  data,
  selected,
  setSelected,
}) => (
  <StyledContainer>
    <div css={styles.head}>
      <FlexBox.Child flex="6">Legend</FlexBox.Child>
      <Cell variant="bodyA" value="Minimum" />
      <Cell variant="bodyA" value="Maximum" />
      <Cell variant="bodyA" value="Average" />
      <Cell variant="bodyA" value="Current" />
    </div>
    <div css={styles.body}>
      {data?.map((row, index) => {
        const values = row.data.map(val => val.y as number)
        const labelIndexed = `${row.id}${index}`
        const id = row.id.toString()

        return (
          <div key={labelIndexed} css={styles.row}>
            <FlexBox.Child flex="6">
              <Checkbox
                checked={selected.indexOf(labelIndexed) > -1}
                name={id}
                onChange={() =>
                  setSelected([...getSelected(id, index, selected)])
                }
              >
                <FlexBox direction="row" alignItems="center">
                  <Typography
                    variant="bodyB"
                    color="gray700"
                    data-testid={`label-${id}`}
                  >
                    {row.label}
                  </Typography>
                  <div css={styles.legend(index)} />
                </FlexBox>
              </Checkbox>
            </FlexBox.Child>
            <Cell variant="bodyB" value={axisTransformer(getMin(values))} />
            <Cell variant="bodyB" value={axisTransformer(getMax(values))} />
            <Cell variant="bodyB" value={axisTransformer(getAverage(values))} />
            <Cell variant="bodyB" value={axisTransformer(getCurrent(values))} />
          </div>
        )
      })}
    </div>
  </StyledContainer>
)

CustomLegend.propTypes = {
  axisTransformer: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          y: PropTypes.number,
        }).isRequired,
      ).isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ),
  selected: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setSelected: PropTypes.func.isRequired,
}

export default CustomLegend
