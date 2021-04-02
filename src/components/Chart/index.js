import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Breakpoint from '../../utils/responsive/Breakpoint'
import { Typography } from '../Typography'
import Donut from './Donut'
import Legends from './Legends'

const variants = {
  donut: Donut,
}

const Container = styled.div`
  display: flex;
`

const EmptyLegend = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const Chart = ({
  chartId,
  data,
  content,
  emptyLegend,
  hasLegend,
  variant,
}) => {
  const ChartVariant = variants[variant]
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

Chart.defaultProps = {
  chartId: undefined,
  content: undefined,
  data: [],
  emptyLegend: undefined,
  hasLegend: false,
  variant: 'donut',
}

Chart.propTypes = {
  chartId: PropTypes.string,
  content: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      product: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
      details: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      })),
    }),
  ),
  emptyLegend: PropTypes.string,
  hasLegend: PropTypes.bool,
  variant: PropTypes.oneOf(['donut']),
}

export default Chart
