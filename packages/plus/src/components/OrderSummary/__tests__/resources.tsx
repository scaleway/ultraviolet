import { InformationOutlineIcon } from '@ultraviolet/icons'
import { FranceFlag } from '@ultraviolet/icons/flags/FranceFlag'
import { Tooltip } from '@ultraviolet/ui'

export const categoryDefault = {
  additionalInfo: (
    <Tooltip text="Info">
      <InformationOutlineIcon sentiment="neutral" size="small" />7 days of free
      backup
    </Tooltip>
  ),
  category: 'Category',
  subCategories: [
    {
      additionalInfo: (
        <Tooltip text="Info">
          <InformationOutlineIcon sentiment="neutral" size="small" />7 days of
          free backup
        </Tooltip>
      ),
      details: ['Detail 1', 'Detail 2'],
      price: 12.2,
      title: 'SubCategory',
    },
  ],
  total: 0,
}
export const simpleCategory = {
  category: 'SimpleCategory',
  subCategories: [{ price: 5, title: 'subcategory' }],
}

export const categoryAZ = {
  category: 'Availability Zone',
  discount: 0.5,
  icon: <FranceFlag />,
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
      discount: 5,
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
  subTitle: 'sub title',
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
      amount: 200_000,
      fixedPrice: true,
      price: 0.000_000_15,
      priceUnit: 'request',
      title: '200000 requests',
    },
  ],
}

export const categoryStorage = {
  additionalInfo: (
    <>
      <InformationOutlineIcon sentiment="neutral" size="small" />
      75GB free on public images
    </>
  ),
  category: 'Storage',
  subCategories: [
    {
      amount: 100,
      amountFree: 75,
      price: 0.000_034_25,
      priceUnit: 'GB/hours',
      title: '100 GB of storage',
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
      hidePrice: true,
      numberInput: true,
      numberInputControls: false,
      numberInputUnit: 'ms',
      numberInputValue: 2,
      onChangeInput: () => {},
      title: 'Choose a duration',
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
      amount: [20, 30],
      price: 10,
      title: '20-30 nodes',
    },
  ],
}

export const anchorProduct = {
  anchor: '#anchor-category',
  category: 'This is an anchor',
  subCategories: [
    {
      amount: 2,
      anchor: '#anchor-sub-category',
      details: ['detail', 'detail'],
      price: 10,
      title: 'This is also an anchor',
    },
  ],
}
