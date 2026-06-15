import type { StoryFn } from '@storybook/react-vite'
import type { FiltersProps } from '..'
import { Filters } from '..'
import type { FilterValues } from './demo.config'

export const Template: StoryFn<FiltersProps<FilterValues>> = props => <Filters {...props} />

Template.args = {
  labels: {
    clear: 'Clear',
    clearAll: 'Clear all',
    seeAll: 'All filters',
    drawerHeader: 'Filters',
    submit: 'See results',
  },
}
