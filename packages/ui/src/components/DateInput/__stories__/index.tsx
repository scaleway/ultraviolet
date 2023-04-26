import type { Meta } from '@storybook/react'
import { DateInput } from '..'

export default {
  component: DateInput,
  decorators: [
    Stories => (
      <div style={{ height: 360 }}>
        <Stories />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A date input based on `react-datepicker.`',
      },
    },
  },
  title: 'Components/Data Entry/DateInput',
} as Meta

export { Playground } from './Playground'
export { Uncontrolled } from './Uncontrolled'
export { Controlled } from './Controlled'
export { Error } from './Error'
export { Disabled } from './Disabled'
export { Required } from './Required'
export { Localized } from './Localized'
export { I18n } from './I18n'
export { MinMax } from './MinMax'
