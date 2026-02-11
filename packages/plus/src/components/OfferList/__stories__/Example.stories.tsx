import type { StoryFn } from '@storybook/react-vite'
import { LeafIcon } from '@ultraviolet/icons/LeafIcon'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import { OfferList } from '../OfferList'

const data = [
  {
    bandwidth: '500 Mpbs public\n1 Gpbs private',
    cpu: '1x Intel Xeon E3 1220\n4C/4T 3.1 GHz',
    disks: '2 x 1.02 TB SSD',
    id: 'EM-A115X-SSD',
    memory: '32 GB',
    price: '€0.091/hour',
    score: 2,
  },
  {
    bandwidth: '500 Mpbs public\n1 Gpbs private',
    cpu: '1x AMD Ryzen PRO 3600\n6C/12T 3.G GHz',
    disks: '2 x 1 TB HDD',
    id: 'EM-A215R-HDD',
    memory: '16 GB',
    price: '€0.101/hour',
    score: 2,
  },
  {
    bandwidth: '500 Mpbs public\n1 Gpbs private',
    cpu: '1x AMD Ryzen PRO 3600\n6C/12T 3.6 GHz',
    disks: '2 x 1.02 TB NVMe',
    id: 'EM-610R-NVMe',
    memory: '32 GB',
    price: '€0.11/hour',
    score: 2,
  },
  {
    bandwidth: '1 Gbps public\n1 Gpbs private',
    cpu: '1x Intel Xeon E3 1410 v2\n4C/8T 2.8 GHz',
    disks: '2 x 1.02 TB SSD',
    id: 'EM-A315X-SSD',
    memory: '64 GB',
    price: '€0.153/hour',
    score: 1,
  },
  {
    bandwidth: '1 Gbps public\n1Gpbs private',
    cpu: '1x Intel Xeon E3 1650\n6C/8T 3.2 GHz',
    disks: '2 x 1.02 TB SSD',
    id: 'EM-A410X-SSD',
    memory: '64 GB',
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

    return [...data].toSorted((a, b) => {
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
          info: 'Info',
          isOrdered: currentOrder.columnId === 'id',
          label: 'Name',
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'id', order: newOrder }),
          orderDirection: currentOrder.order,
        },
        {
          label: 'CPU(s)',
        },
        {
          isOrdered: currentOrder.columnId === 'memory',
          label: 'Memory',
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'memory', order: newOrder }),
          orderDirection: currentOrder.order,
        },
        { label: 'Disks' },
        { label: 'Bandwidth' },
        { label: 'Price (excl.tax)' },
      ]}
    >
      {sortedData.map(offer => (
        <OfferList.Row
          expandable="Expandable content"
          id={offer.id}
          key={offer.id}
          offerName={offer.id}
        >
          <OfferList.Cell>
            <Stack direction="column">
              {offer.id}
              <Stack direction="row" gap={0.5}>
                {Array.from({ length: offer.score }).map((_, i) => (
                  <LeafIcon
                    // oxlint-disable-next-line react/no-array-index-key
                    key={`green-${i}`}
                    sentiment="success"
                    size="small"
                  />
                ))}
                {Array.from({ length: 3 - offer.score }).map((_, i) => (
                  <LeafIcon
                    disabled
                    // oxlint-disable-next-line react/no-array-index-key
                    key={`grey-${i}`}
                    sentiment="neutral"
                    size="small"
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
