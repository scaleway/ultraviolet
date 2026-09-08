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
export { Size } from './Size.stories'
export { Controlled } from './Controlled.stories'
export { HideButtons } from './HideButtons.stories'
export { PerPage } from './PerPage.stories'
