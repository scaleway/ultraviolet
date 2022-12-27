import Pagination from '..'

export default {
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          'Display multiple buttons to allow navigation between a paginated resource',
      },
    },
  },
  title: 'Components/Navigation/PaginationV2',
}

export { Playground } from './Playground.stories'
export { Basic } from './Basic.stories'
export { Disabled } from './Disabled.stories'
