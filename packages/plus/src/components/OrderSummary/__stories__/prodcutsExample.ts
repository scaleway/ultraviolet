export const categoryDefault = {
  category: 'Category',
  total: 0,
  subCategories: [
    { title: 'SubCategory', price: 12.2, details: ['Detail 1', 'Detail 2'] },
  ],
  additionalInfo: '7 days of free backup',
}

export const categoryAZ = {
  category: 'Availability Zone',
  subCategories: [{ title: 'PARIS 1', price: 5 }],
  discount: 50,
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
  subCategories: [{ info: 'Included', title: '0.5 Gbps public bandwidth' }],
}
