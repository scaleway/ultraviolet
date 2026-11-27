import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import { SelectInput } from '..'
import { dataUnGrouped } from './resources'

let timeoutIdOnSearch: NodeJS.Timeout | null = null

export const AsyncSearch: StoryFn<typeof SelectInput> = () => {
  const [options, setOptions] = useState(dataUnGrouped)
  const [isLoading, setIsLoading] = useState(false)

  // Simulates an async query with the search as a param, debounced by 300ms by the component
  const onSearch = useCallback((search: string) => {
    setIsLoading(true)
    if (timeoutIdOnSearch) {
      clearTimeout(timeoutIdOnSearch)
    }

    timeoutIdOnSearch = setTimeout(() => {
      setOptions(search ? dataUnGrouped.filter(option => option.value.startsWith(search.toLowerCase())) : dataUnGrouped)
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <SelectInput
      isLoading={isLoading}
      label="Async search"
      name="async-search"
      onSearch={onSearch}
      options={options}
      placeholder="Select item"
      placeholderSearch="Search in list"
    />
  )
}

AsyncSearch.parameters = {
  docs: {
    description: {
      story: `When \`onSearch\` is provided, the search bar does not filter the options locally anymore:
it is called with the search value, debounced by 300 milliseconds,
and the consumer is responsible for updating the \`options\` prop, e.g. from an async query.
The search bar stays visible while \`isLoading\` is true so it can still be typed in.`,
    },
  },
}
