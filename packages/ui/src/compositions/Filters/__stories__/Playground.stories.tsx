import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Snippet, Stack } from '../../../components'
import type { FiltersProps } from '../Filters'
import { Filters } from '../Filters'
import type { FilterValues } from './demo.config'
import { demoDefaultValues, demoFilters } from './demo.config'

export const Playground: StoryFn<FiltersProps<FilterValues>> = props => {
  const [liveValues, setLiveValues] = useState(props.defaultValues)
  const [submittedValues, setSubmittedValues] = useState(props.defaultValues)

  return (
    <Stack gap="4">
      <Filters onChange={setLiveValues} onSubmit={setSubmittedValues} {...props} />
      <Stack direction="row" wrap gap="4">
        <div>
          <strong>Live values</strong>
          <p>Updated when changing any filter.</p>
          <Snippet initiallyExpanded>{JSON.stringify(liveValues, null, 2)}</Snippet>
        </div>
        <div>
          <strong>Submitted values</strong>
          <p>Updated when changing a filter in the main row or when submitting in the Drawer.</p>
          <Snippet initiallyExpanded>{JSON.stringify(submittedValues, null, 2)}</Snippet>
        </div>
      </Stack>
    </Stack>
  )
}

Playground.args = {
  config: demoFilters,
  defaultValues: demoDefaultValues,
  labels: {
    clear: 'Clear',
    clearAll: 'Clear all',
    seeAll: 'All filters',
    drawerHeader: 'Filters',
    submit: 'See results',
  },
  layout: {
    mainFilters: ['name', 'status', 'env'],
    templateColumns: 'repeat(auto-fit, minmax(200px, 1fr)',
  },
}
