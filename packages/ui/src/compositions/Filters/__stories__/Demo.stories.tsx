import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../../components'
import { Filters } from '../Filters'
import { defaultValues, demoFilters } from './demo.config'

export const Demo: StoryFn = () => {
  const [liveValues, setLiveValues] = useState(defaultValues)
  const [submittedValues, setSubmittedValues] = useState(defaultValues)

  return (
    <Stack gap="4">
      <Filters
        config={demoFilters}
        defaultValues={defaultValues}
        labels={{
          clear: 'Clear',
          clearAll: 'Clear all',
          seeAll: 'All filters',
          drawerHeader: 'Filters',
          submit: 'See results',
        }}
        onChange={setLiveValues}
        onSubmit={setSubmittedValues}
      />
      <Stack direction="row" gap="4">
        <div>
          <strong>Live values</strong>
          <p>Updated when changing any filter.</p>
          <small>
            <pre>{JSON.stringify(liveValues, null, 2)}</pre>
          </small>
        </div>
        <div>
          <strong>Submitted values</strong>
          <p>Updated when changing a filter in the main row or when submitting in the Drawer.</p>
          <small>
            <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
          </small>
        </div>
      </Stack>
    </Stack>
  )
}
