import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Stack, Tooltip } from '@ultraviolet/ui'

const AdditionalInfo = () => (
  <Stack direction="row" gap={0.5} alignItems="center">
    <Tooltip text="Info">
      <InformationOutlineIcon size="small" sentiment="neutral" />
    </Tooltip>
    7 days of free backup
  </Stack>
)

export const categoryDefault = {
  category: 'Category',
  total: 0,
  subCategories: [
    { title: 'SubCategory', price: 12.2, details: ['Detail 1', 'Detail 2'] },
  ],
  additionalInfo: <AdditionalInfo />,
}

export const categoryAZ = {
  category: 'Availability Zone',
  subCategories: [{ title: 'PARIS 1', price: 5 }],
  discount: 0.5,
}

export const categoryM2 = {
  category: 'Configuration',
  subCategories: [
    {
      title: 'M2-M',
      price: 124.1,
      details: [
        'Apple M2 Chip',
        '8 Cores CPU 8 cores GPU',
        '256 GB SSD storage',
        '16 GB memory',
        '1 GB bandwidth',
      ],
    },
    {
      title: 'macOs Sonoma',
      price: 10,
    },
  ],
}

export const categoryOptions = {
  category: 'Options',
  subCategories: [
    { customContent: 'Included', title: '0.5 Gbps public bandwidth' },
  ],
}

export const negativeItem = {
  category: 'Coupon',
  subCategories: [{ title: 'PROMO2025', price: -10, fixedPrice: true }],
  allowNegative: true,
}

export const fixePrice = {
  category: 'One time fees',
  subCategories: [
    { title: 'Setup', price: 200, fixedPrice: true },
    { title: 'Shipping', price: 50, fixedPrice: true },
  ],
}

export const categoryRequest = {
  category: 'Requests cost',
  subCategories: [
    {
      title: '200000 requests',
      price: 0.00000015,
      amount: 200000,
      priceUnit: 'request',
      fixedPrice: true,
    },
  ],
}

export const categoryStorage = {
  category: 'Storage',
  additionalInfo: (
    <Stack gap={0.5} direction="row" alignItems="center">
      <InformationOutlineIcon size="small" sentiment="neutral" />
      75GB free on public images
    </Stack>
  ),
  subCategories: [
    {
      title: '100 GB of storage',
      price: 0.003425,
      amount: 100,
      priceUnit: 'GB/hours',
      amountFree: 75,
    },
  ],
}

export const categoryCustomContent = {
  category: 'Custom content',
  customContent: 'FREE',
}

export const rangePriceContent = {
  category: 'Nodes',
  subCategories: [
    {
      title: '20-30 nodes',
      price: 10,
      amount: [20, 30],
    },
  ],
}
