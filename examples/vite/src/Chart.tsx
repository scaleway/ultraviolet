import { Card, LineChart, Row, Text } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'

const lineChartData = [
  {
    data: [
      {
        x: '2025-01-01T10:17:20Z',
        y: 3.102_521_7,
      },
      {
        x: '2025-01-01T22:17:20Z',
        y: 4.358_333,
      },
      {
        x: '2025-01-02T10:17:20Z',
        y: 3.375,
      },
      {
        x: '2025-01-02T22:17:20Z',
        y: 3.016_666_7,
      },
      {
        x: '2025-01-03T10:17:20Z',
        y: 3.016_666_7,
      },
      {
        x: '2025-01-03T22:17:20Z',
        y: 3.1,
      },
      {
        x: '2025-01-04T10:17:20Z',
        y: 2.925,
      },
      {
        x: '2025-01-04T22:17:20Z',
        y: 3.141_666_7,
      },
      {
        x: '2025-01-05T10:17:20Z',
        y: 2.883_333_4,
      },
      {
        x: '2025-01-05T22:17:20Z',
        y: 3.158_333_3,
      },
      {
        x: '2025-01-06T10:17:20Z',
        y: 2.9,
      },
      {
        x: '2025-01-06T22:17:20Z',
        y: 3.166_666_7,
      },
      {
        x: '2025-01-07T10:17:20Z',
        y: 4.825,
      },
      {
        x: '2025-01-07T22:17:20Z',
        y: 4.05,
      },
      {
        x: '2025-01-08T10:17:20Z',
        y: 3.066_666_6,
      },
    ],
    id: 'lineChartSerie',
    label: 'line chart values',
  },
]

export const Chart = () => {
  const [data, setData] = useState<typeof lineChartData | undefined>(undefined)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData(lineChartData)
    }, 1000)

    return clearTimeout(timeoutId)
  }, [])

  return (
    <Row gap="3" templateColumns="9fr 3fr">
      <Card>
        <Text as="h1" variant="headingSmall">
          Chart
        </Text>
        <LineChart
          data={data}
          // xScale={{ type: 'linear' }}
          withLegend
        />
      </Card>
    </Row>
  )
}
