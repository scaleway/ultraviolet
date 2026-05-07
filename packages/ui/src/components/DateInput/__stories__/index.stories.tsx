import { DateInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: DateInput,
  title: 'UI/Data Entry/DateInput',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta
export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Clearable } from './Clearable.stories'
export { Error } from './Error.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { Months } from './Months.stories'
export { Exclude } from './Exclude.stories'
export { MinMax } from './MinMax.stories'
export { Localized } from './Localized.stories'
export { Controlled } from './Controlled.stories'
export { Range } from './Range.stories'
export { I18n } from './I18n.stories'
export { Calendar } from './Calendar.stories'
