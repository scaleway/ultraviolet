import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Stack, Tooltip } from '@ultraviolet/ui'

const AdditionalInfo = () => (
  <Stack alignItems="center" direction="row" gap={0.5}>
    <Tooltip text="Info">
      <InformationOutlineIcon sentiment="neutral" size="small" />
    </Tooltip>
    7 days of free backup
  </Stack>
)

export const categoryDefault = {
  additionalInfo: <AdditionalInfo />,
  category: 'Category',
  subCategories: [
    {
      additionalInfo: <AdditionalInfo />,
      details: ['Detail 1', 'Detail 2'],
      price: 12.2,
      title: 'SubCategory',
    },
  ],
  total: 0,
}

export const categoryAZ = {
  category: 'Availability Zone',
  discount: 0.5,
  subCategories: [{ price: 5, title: 'PARIS 1' }],
}

export const categoryM2 = {
  category: 'Configuration',
  subCategories: [
    {
      details: [
        'Apple M2 Chip',
        '8 Cores CPU 8 cores GPU',
        '256 GB SSD storage',
        '16 GB memory',
        '1 GB bandwidth',
      ],
      price: 124.1,
      title: 'M2-M',
    },
    {
      price: 10,
      title: 'macOs Sonoma',
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
  allowNegative: true,
  category: 'Coupon',
  subCategories: [{ fixedPrice: true, price: -10, title: 'PROMO2025' }],
}

export const fixePrice = {
  category: 'One time fees',
  subCategories: [
    { fixedPrice: true, price: 200, title: 'Setup' },
    { fixedPrice: true, price: 50, title: 'Shipping' },
  ],
}

export const categoryRequest = {
  category: 'Requests cost',
  subCategories: [
    {
      amount: 200000,
      fixedPrice: true,
      price: 0.00000015,
      priceUnit: 'request',
      title: '200000 requests',
    },
  ],
}

export const categoryStorage = {
  additionalInfo: (
    <Stack alignItems="center" direction="row" gap={0.5}>
      <InformationOutlineIcon sentiment="neutral" size="small" />
      75GB free on public images
    </Stack>
  ),
  category: 'Storage',
  subCategories: [
    {
      amount: 100,
      amountFree: 75,
      price: 0.003425,
      priceUnit: 'GB/hours',
      title: '100 GB of storage',
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
      amount: [20, 30],
      price: 10,
      title: '20-30 nodes',
    },
  ],
}
