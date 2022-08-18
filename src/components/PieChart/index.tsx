import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box } from '@nivo/core'
import { Pie } from '@nivo/pie'
import PropTypes from 'prop-types'
import { ReactNode, Validator, useCallback, useState } from 'react'
import Text from '../Text'
import Legends from './Legends'
import { Data } from './types'

const Container = styled.div<{ height: number }>`
  display: flex;
  align-items: center;
  height: ${({ height }) => `${height}px`};
`

const EmptyLegend = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const StyledContent = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;

  font-size: 25px;
  line-height: 100px;
  height: 100px;
  width: 100px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
`

type PieChartProps = {
  chartProps?: Record<string, unknown>
  data?: Data[]
  height?: number
  width?: number
  emptyLegend?: string
  content?: ReactNode
  withLegend?: boolean
  margin?: Box
}

const PieChart = ({
  height = 206,
  width = 206,
  data = undefined,
  emptyLegend,
  content,
  withLegend = false,
  margin = { bottom: 10, left: 10, right: 10, top: 10 },
  chartProps = {},
}: PieChartProps) => {
  const { colors } = useTheme()
  const [currentFocusIndex, setCurrentFocusIndex] = useState<string>()
  const emptyTooltip = useCallback(() => <span />, [])
  const isEmpty = !data || data?.length === 0

  const EmptyLegendDisplayer = useCallback(
    () =>
      emptyLegend ? (
        <EmptyLegend>
          <Text variant="body" as="p">
            {emptyLegend}
          </Text>
        </EmptyLegend>
      ) : null,
    [emptyLegend],
  )

  const LegendDisplayer = useCallback(
    () =>
      isEmpty ? (
        <EmptyLegendDisplayer />
      ) : (
        <Legends
          focused={currentFocusIndex}
          data={data}
          onFocusChange={setCurrentFocusIndex}
        />
      ),
    [isEmpty, currentFocusIndex, data, EmptyLegendDisplayer],
  )

  return (
    <Container height={height}>
      <div style={{ position: 'relative' }}>
        <Pie
          colors={d => d.data.color}
          height={height}
          width={width}
          value="percent"
          enableArcLabels={false}
          enableArcLinkLabels={false}
          data={
            !isEmpty
              ? data
              : [
                  {
                    color: colors.neutral.backgroundStrong,
                    id: 'empty',
                    percent: 100,
                  },
                ]
          }
          defs={[
            {
              background: 'inherit',
              color: colors.neutral.textStrong,
              id: 'lines',
              lineWidth: 2,
              rotation: 0,
              spacing: 5,
              type: 'patternLines',
            },
          ]}
          fill={[
            {
              id: 'lines',
              match: {
                id: 'discount',
              },
            },
          ]}
          margin={margin}
          innerRadius={0.8}
          cornerRadius={0}
          activeOuterRadiusOffset={!isEmpty ? 4 : 0}
          tooltip={emptyTooltip}
          onMouseEnter={(datum, event) => {
            if (!isEmpty) {
              const pie = event.currentTarget
              pie.style.cursor = 'pointer'
              setCurrentFocusIndex(datum.id.toString())
            }
          }}
          onMouseLeave={() => setCurrentFocusIndex(undefined)}
          {...chartProps}
        />
        {content ? <StyledContent>{content}</StyledContent> : null}
      </div>
      {withLegend ? <LegendDisplayer /> : null}
    </Container>
  )
}

PieChart.propTypes = {
  chartProps: PropTypes.shape({}),
  content: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      needPattern: PropTypes.bool,
      percent: PropTypes.number.isRequired,
      value: PropTypes.string,
    }).isRequired,
  ),
  emptyLegend: PropTypes.string,
  height: PropTypes.number,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }) as Validator<Box>,
  width: PropTypes.number,
  withLegend: PropTypes.bool,
}

export default PieChart
