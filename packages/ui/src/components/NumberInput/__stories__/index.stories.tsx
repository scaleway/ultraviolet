import type { Meta } from '@storybook/react'
import { NumberInput } from '..'

export default {
  component: NumberInput,
  decorators: [
    StoryComponent => (
      <div
        style={{
          width: 'fit-content',
          minWidth: '200px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  tags: ['deprecated'],
  parameters: {
    deprecated: true,
    deprecatedReason:
      'This component is deprecated. Please use NumberInputV2 instead.',
    migrationLink: 'Migrations/NumberInput to NumberInputV2',
  },
  title: 'Components/Data Entry/NumberInput',
} as Meta<typeof NumberInput>

export { Playground } from './Playground.stories'
export { Placeholder } from './Placeholder.stories'
export { Text } from './Text.stories'
export { DisabledTooltip } from './DisabledTooltip.stories'
export { Steps } from './Steps.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Events } from './Events.stories'
export { Controlled } from './Controlled.stories'
export { DefaultValue } from './DefaultValue.stories'
