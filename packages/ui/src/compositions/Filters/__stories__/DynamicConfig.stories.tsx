import { useMemo, useState } from 'react'
import { Snippet, Stack } from '../../../components'
import { Filters } from '../Filters'
import type { FilterConfig } from '../types'

export type FilterValues = {
  category: string
  items: string[]
  tags: string[]
  text: string
}

export const defaultValues: FilterValues = {
  category: '',
  items: [],
  tags: [],
  text: '',
}

export const baseConfig: FilterConfig<FilterValues>[] = [
  {
    type: 'select',
    name: 'category',
    label: 'Category',
    placeholder: 'Select category',
    options: [
      { label: 'Category 1', value: 'category 1' },
      { label: 'Category 2', value: 'category 2' },
    ],
  },
  {
    type: 'search',
    name: 'text',
    label: 'Text',
    placeholder: 'Type to search...',
  },
]

export const DynamicConfig = () => {
  const [filterValues, setFilterValues] = useState(defaultValues)

  const config = useMemo(() => {
    if (filterValues['category'] === 'category 1') {
      return baseConfig.toSpliced(1, 0, {
        type: 'multiselect',
        name: 'items',
        label: 'Items for category 1',
        placeholder: 'Select items',
        options: [
          { label: 'Cat 1 / Item A', value: 'tag a' },
          { label: 'Cat 1 / Item B', value: 'tag b' },
        ],
      })
    } else if (filterValues['category'] === 'category 2') {
      return baseConfig.toSpliced(1, 0, {
        type: 'multiselect',
        name: 'tags',
        label: 'Tags for category 2',
        placeholder: 'Select tags',
        options: [
          { label: 'Cat 2 / Tag C', value: 'tag c' },
          { label: 'Cat 2 / Tag D', value: 'tag d' },
        ],
      })
    }

    return baseConfig
  }, [filterValues])

  return (
    <Stack gap="4">
      <Filters
        config={config}
        labels={{ clearAll: 'Clear all' }}
        defaultValues={defaultValues}
        onSubmit={setFilterValues}
      />
      <Stack maxWidth="320px">
        <strong>Submitted values</strong>
        <Snippet initiallyExpanded>{JSON.stringify(filterValues, null, 2)}</Snippet>
      </Stack>
    </Stack>
  )
}
