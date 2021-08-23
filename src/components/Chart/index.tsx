import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent, useState } from 'react'
import Breakpoint from '../../utils/responsive/Breakpoint'
import Typography from '../Typography'
import Donut from './Donut'
import Legends from './Legends'

const variants = {
  donut: Donut,
}

type Variants = keyof typeof variants

const Container = styled.div`
  display: flex;
`

const EmptyLegend = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`

type ChartProps = {
  chartId?: string,
  /**
   * Content will be displayed in the center of the chart, it can be text, number or any other component.
   */
  content?: React.ReactNode,
  data?: {
    color: string,
    details?: {
      name?: string,
      value?: string
    }[],
    name?: string,
    percent: number,
    product: string,
    value?: string
  }[],
  emptyLegend?: string,
  hasLegend?: boolean,
  variant?: Variants
};

const Chart: VoidFunctionComponent<ChartProps> = ({
  chartId,
  data = [],
  content,
  emptyLegend,
  hasLegend = false,
  variant = "donut"
}) => {
  const ChartVariant = variants[variant as Variants]
  const [currentFocusIndex, setCurrentFocusIndex] = useState()

  return (
    <Container>
      <Breakpoint up="small">
        <ChartVariant
          data={data}
          focused={currentFocusIndex}
          onFocusChange={setCurrentFocusIndex}
          chartId={chartId}
          content={content}
        />
      </Breakpoint>
      {hasLegend &&
        (!data.length ? (
          emptyLegend && (
            <EmptyLegend>
              <Typography variant="bodyA">{emptyLegend}</Typography>
            </EmptyLegend>
          )
        ) : (
          <Legends
            focused={currentFocusIndex}
            data={data}
            onFocusChange={setCurrentFocusIndex}
            chartId={chartId}
          />
        ))}
    </Container>
  )
}

Chart.propTypes = {
  chartId: PropTypes.string,
  content: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.string,
        }),
      ),
      name: PropTypes.string,
      percent: PropTypes.number.isRequired,
      product: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ),
  emptyLegend: PropTypes.string,
  hasLegend: PropTypes.bool,
  variant: PropTypes.oneOf(['donut']),
}

export default Chart
