import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import { SelectInput } from '..'
import { dataUnGrouped } from './resources'

export const AsyncSearch: StoryFn<typeof SelectInput> = () => {
  const [options, setOptions] = useState(dataUnGrouped)
  const [isLoading, setIsLoading] = useState(false)

  // Simulates a debounced async query, e.g. a request to an API with the search as a param
  const onSearch = useCallback((search: string) => {
    setIsLoading(true)
    setTimeout(() => {
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
the callback is called with the search value on every keystroke, and the consumer is responsible
for updating the \`options\` prop, e.g. from an async query. The search bar stays visible while
\`isLoading\` is true so it can still be typed in.`,
    },
  },
}
