import type { ComponentMeta } from '@storybook/react'
import { SelectInput } from '..'

export default {
  component: SelectInput,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: 150 }}>
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'SelectInput is a component used to select a value between different options.',
      },
    },
  },
  title: 'Components/Data Entry/SelectInput',
} as ComponentMeta<typeof SelectInput>

export { Playground } from './Playground'
export { Uncontrolled } from './Uncontrolled'
export { Controlled } from './Controlled'
export { CustomOptions } from './CustomOptions'
export { IsClearable } from './IsClearable'
export { NoLabel } from './NoLabel'
export { Searchable } from './Searchable'
export { Required } from './Required'
export { Disabled } from './Disabled'
export { OptionDisabled } from './OptionDisabled'
export { Animated } from './Animated'
export { Multi } from './Multi'
export { MultiDisabled } from './MultiDisabled'
export { Time } from './Time'
export { TimeError } from './TimeError'
export { LoadingDemo } from './LoadingDemo'
export { LoadingExample } from './LoadingExample'
export { Description } from './Description'
export { EmptyState } from './EmptyState'
export { Group } from './Group'
export { KnownIssues } from './KnownIssues'
