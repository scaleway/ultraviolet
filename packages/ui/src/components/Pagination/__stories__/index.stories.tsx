import { Pagination } from '..'

export default {
  component: Pagination,
  title: 'UI/Navigation/Pagination',
  parameters: {
    a11y: false,
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
}

export { Playground } from './Playground.stories'
export { Basic } from './Basic.stories'
export { Disabled } from './Disabled.stories'
export { Controlled } from './Controlled.stories'
export { PerPage } from './PerPage.stories'
