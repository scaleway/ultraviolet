import { Pagination } from '..'

export default {
  component: Pagination,
  title: 'UI/Navigation/Pagination',
  parameters: {
    a11y: false,
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
}

export { Playground } from './Playground.stories'
export { Basic } from './Basic.stories'
export { Disabled } from './Disabled.stories'
export { Controlled } from './Controlled.stories'
export { PerPage } from './PerPage.stories'
