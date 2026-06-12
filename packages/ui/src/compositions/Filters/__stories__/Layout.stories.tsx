import type { StoryFn } from '@storybook/react-vite'
import { Filters } from '../Filters'
import { defaultValues, demoFilters } from './demo.config'

export const Layout: StoryFn = () => (
  <Filters
    config={demoFilters.filter(item => item.label === 'Price' || item.label === 'Environment')}
    defaultValues={defaultValues}
    layout={{ size: 'large', mainFilters: ['price', 'env'] }}
    labels={{
      clear: 'Clear',
      clearAll: 'Clear All',
      seeAll: 'All filters',
      drawerHeader: 'Filters',
      submit: 'See results',
    }}
  />
)

Layout.parameters = {
  docs: {
    description: {
      story:
        'Use a "large" size when there is a slider in the main row, because the `Slider` component doesn\'t have a medium size',
    },
  },
}
