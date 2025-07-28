import type { StoryFn } from '@storybook/react-vite'
import { LeafIcon } from '@ultraviolet/icons'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import { OfferList } from '../OfferList'

const data = [
  {
    id: 'EM-A115X-SSD',
    cpu: '1x Intel Xeon E3 1220\n4C/4T 3.1 GHz',
    memory: '32 GB',
    disks: '2 x 1.02 TB SSD',
    bandwidth: '500 Mpbs public\n1 Gpbs private',
    price: '€0.091/hour',
    score: 2,
  },
  {
    id: 'EM-A215R-HDD',
    cpu: '1x AMD Ryzen PRO 3600\n6C/12T 3.G GHz',
    memory: '16 GB',
    disks: '2 x 1 TB HDD',
    bandwidth: '500 Mpbs public\n1 Gpbs private',
    price: '€0.101/hour',
    score: 2,
  },
  {
    id: 'EM-610R-NVMe',
    cpu: '1x AMD Ryzen PRO 3600\n6C/12T 3.6 GHz',
    memory: '32 GB',
    disks: '2 x 1.02 TB NVMe',
    bandwidth: '500 Mpbs public\n1 Gpbs private',
    price: '€0.11/hour',
    score: 2,
  },
  {
    id: 'EM-A315X-SSD',
    cpu: '1x Intel Xeon E3 1410 v2\n4C/8T 2.8 GHz',
    memory: '64 GB',
    disks: '2 x 1.02 TB SSD',
    bandwidth: '1 Gbps public\n1 Gpbs private',
    price: '€0.153/hour',
    score: 1,
  },
  {
    id: 'EM-A410X-SSD',
    cpu: '1x Intel Xeon E3 1650\n6C/8T 3.2 GHz',
    memory: '64 GB',
    disks: '2 x 1.02 TB SSD',
    bandwidth: '1 Gbps public\n1Gpbs private',
    price: '€0.153/hour',
    score: 2,
  },
]

export const Example: StoryFn<ComponentProps<typeof OfferList>> = props => {
  const [currentOrder, setCurrentOrder] = useState<{
    columnId: 'id' | 'memory'
    order: 'asc' | 'desc'
  }>({ columnId: 'id', order: 'asc' })

  const sortedData = useMemo(() => {
    const orderMultiplicator = currentOrder.order === 'asc' ? 1 : -1

    return [...data].sort((a, b) => {
      if (a[currentOrder.columnId] < b[currentOrder.columnId]) {
        return -1 * orderMultiplicator
      }
      if (a[currentOrder.columnId] > b[currentOrder.columnId]) {
        return orderMultiplicator
      }

      return 0
    })
  }, [currentOrder])

  return (
    <OfferList
      {...props}
      columns={[
        {
          label: 'Name',
          info: 'Info',
          isOrdered: currentOrder.columnId === 'id',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'id', order: newOrder }),
        },
        {
          label: 'CPU(s)',
        },
        {
          label: 'Memory',
          isOrdered: currentOrder.columnId === 'memory',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'memory', order: newOrder }),
        },
        { label: 'Disks' },
        { label: 'Bandwidth' },
        { label: 'Price (excl.tax)' },
      ]}
    >
      {sortedData.map(offer => (
        <OfferList.Row
          key={offer.id}
          id={offer.id}
          offerName={offer.id}
          expandable="Expandable content"
        >
          <OfferList.Cell>
            <Stack direction="column">
              {offer.id}
              <Stack direction="row" gap={0.5}>
                {Array.from({ length: offer.score }).map((_, i) => (
                  <LeafIcon
                    key={`green-${i}`}
                    sentiment="success"
                    size="small"
                  />
                ))}
                {Array.from({ length: 3 - offer.score }).map((_, i) => (
                  <LeafIcon
                    key={`grey-${i}`}
                    sentiment="neutral"
                    size="small"
                    disabled
                  />
                ))}
              </Stack>
            </Stack>
          </OfferList.Cell>
          <OfferList.Cell>{offer.cpu}</OfferList.Cell>
          <OfferList.Cell>{offer.memory}</OfferList.Cell>
          <OfferList.Cell>{offer.disks}</OfferList.Cell>
          <OfferList.Cell>{offer.bandwidth}</OfferList.Cell>
          <OfferList.Cell>{offer.price}</OfferList.Cell>
        </OfferList.Row>
      ))}
    </OfferList>
  )
}

Example.args = {
  expandable: true,
  type: 'radio',
}

Example.parameters = {
  docs: {
    description: {
      story: 'A more advanced example demonstrating how to use the component.',
    },
  },
}
