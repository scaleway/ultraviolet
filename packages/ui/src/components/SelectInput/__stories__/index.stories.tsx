import type { Meta } from '@storybook/react'
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
  title: 'Components/Data Entry/SelectInput',
} as Meta<typeof SelectInput>

export { Playground } from './Playground.stories'
export { Uncontrolled } from './Uncontrolled.stories'
export { Controlled } from './Controlled.stories'
export { CustomOptions } from './CustomOptions.stories'
export { IsClearable } from './IsClearable.stories'
export { NoLabel } from './NoLabel.stories'
export { Searchable } from './Searchable.stories'
export { Required } from './Required.stories'
export { Disabled } from './Disabled.stories'
export { OptionDisabled } from './OptionDisabled.stories'
export { Animated } from './Animated.stories'
export { Multi } from './Multi.stories'
export { MultiDisabled } from './MultiDisabled.stories'
export { Time } from './Time.stories'
export { TimeError } from './TimeError.stories'
export { LoadingDemo } from './LoadingDemo.stories'
export { LoadingExample } from './LoadingExample.stories'
export { Description } from './Description.stories'
export { EmptyState } from './EmptyState.stories'
export { Group } from './Group.stories'
export { KnownIssues } from './KnownIssues.stories'
