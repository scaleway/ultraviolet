import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Tooltip } from '@ultraviolet/ui'

export const categoryDefault = {
  category: 'Category',
  total: 0,
  subCategories: [
    { title: 'SubCategory', price: 12.2, details: ['Detail 1', 'Detail 2'] },
  ],
  additionalInfo: (
    <Tooltip text="Info">
      <InformationOutlineIcon size="small" sentiment="neutral" />7 days of free
      backup
    </Tooltip>
  ),
}
export const simpleCategory = {
  category: 'SimpleCategory',
  subCategories: [{ title: 'subcategory', price: 5 }],
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
      discount: 5,
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
    <>
      <InformationOutlineIcon size="small" sentiment="neutral" />
      75GB free on public images
    </>
  ),
  subCategories: [
    {
      title: '100 GB of storage',
      price: 0.00003425,
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

export const numberInputCategory = {
  category: 'Numers of requests',
  numberInput: true,
  numberInputValue: 2,
  onChangeInput: () => {},
}

export const numberInputSubCategory = {
  category: 'Duration',
  subCategories: [
    {
      title: 'Choose a duration',
      numberInput: true,
      numberInputValue: 2,
      onChangeInput: () => {},
      hidePrice: true,
      numberInputControls: false,
      numberInputUnit: 'ms',
    },

    {
      title: 'duration',
    },
    {
      price: 1,
    },
  ],
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
