import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button, Snippet, Stack } from '../../../components'
import { FiltersMainRow } from '../parts/FiltersMainRow'
import { FiltersProvider } from '../parts/FiltersProvider'
import { demoDefaultValues, demoFilters } from './demo.config'

export const Context: StoryFn = () => {
  const [filterValues, setFilterValues] = useState(demoDefaultValues)

  return (
    <Stack gap="4">
      <FiltersProvider defaultValues={demoDefaultValues} onSubmit={setFilterValues}>
        {({ filters }) => (
          <>
            <FiltersMainRow
              config={demoFilters.slice(0, 2)}
              labels={{
                clearAll: 'Clear all',
                seeAll: 'All filters',
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                filters.reset()
                filters.submit(filters.defaultValues)
              }}
            >
              Reset from outside of the component
            </Button>
          </>
        )}
      </FiltersProvider>
      <Stack direction="row" gap="4">
        <div>
          <strong>Submitted values</strong>
          <Snippet initiallyExpanded>{JSON.stringify(filterValues, null, 2)}</Snippet>
        </div>
      </Stack>
    </Stack>
  )
}
