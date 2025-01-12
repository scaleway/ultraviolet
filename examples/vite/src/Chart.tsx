import { Card, LineChart, Row, Text } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'

const lineChartData = [
  {
    data: [
      {
        x: '2025-01-01T10:17:20Z',
        y: 3.1025217,
      },
      {
        x: '2025-01-01T22:17:20Z',
        y: 4.358333,
      },
      {
        x: '2025-01-02T10:17:20Z',
        y: 3.375,
      },
      {
        x: '2025-01-02T22:17:20Z',
        y: 3.0166667,
      },
      {
        x: '2025-01-03T10:17:20Z',
        y: 3.0166667,
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
        y: 3.1416667,
      },
      {
        x: '2025-01-05T10:17:20Z',
        y: 2.8833334,
      },
      {
        x: '2025-01-05T22:17:20Z',
        y: 3.1583333,
      },
      {
        x: '2025-01-06T10:17:20Z',
        y: 2.9,
      },
      {
        x: '2025-01-06T22:17:20Z',
        y: 3.1666667,
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
        y: 3.0666666,
      },
    ],
    id: 'lineChartSerie',
    label: 'line chart values',
  },
]

export const Chart = () => {
  const [data, setData] = useState<typeof lineChartData | undefined>(undefined)

  useEffect(() => {
    let timeoutId: number | undefined = undefined
    setTimeout(() => {
      setData(lineChartData)
    }, 1000)

    return clearTimeout(timeoutId)
  }, [])

  return (
    <Row templateColumns="9fr 3fr" gap="3">
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
