import type { FilterConfig } from '../types'

export type FilterValues = {
  name: string
  status: string
  env: string[]
  price: [number, number]
  ram: [number, number]
  gpu: string
}

export const demoDefaultValues: FilterValues = {
  name: '',
  status: '',
  env: [],
  price: [0, 1000],
  ram: [0, 64],
  gpu: '',
}

export const demoFilters: FilterConfig<FilterValues>[] = [
  {
    type: 'search',
    name: 'name',
    hideInDrawer: true,
    label: 'Name',
    debounceDuration: 500,
    placeholder: 'Type to search...',
  },
  {
    type: 'group',
    label: 'Infos',
    name: 'infos',
    items: [
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        placeholder: 'Select status',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
      },
      {
        type: 'multiselect',
        name: 'env',
        label: 'Environment',
        placeholder: 'Select environment',
        options: [
          { label: 'Production', value: 'prod' },
          { label: 'Development', value: 'dev' },
          { label: 'Staging', value: 'staging' },
        ],
        searchable: true,
      },
    ],
  },
  {
    type: 'slider',
    name: 'price',
    label: 'Price',
    min: 0,
    double: true,
    max: 1000,
    step: 10,
  },
  {
    type: 'slider',
    name: 'ram',
    label: 'RAM',
    min: 0,
    max: 64,
    double: true,
  },
]
