import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button, Stack } from '../../../components'
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
          <p>Updated when changing a filter in the main row or when submitting in the Drawer.</p>
          <small>
            <pre>{JSON.stringify(filterValues, null, 2)}</pre>
          </small>
        </div>
      </Stack>
    </Stack>
  )
}
