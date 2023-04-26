import type { ComponentMeta } from '@storybook/react'
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
  title: 'Components/Data Entry/NumberInput',
} as ComponentMeta<typeof NumberInput>

export { Playground } from './Playground'
export { Text } from './Text'
export { DisabledTooltip } from './DisabledTooltip'
export { Steps } from './Steps'
export { Sizes } from './Sizes'
export { Disabled } from './Disabled'
export { Events } from './Events'
export { Controlled } from './Controlled'
export { DefaultValue } from './DefaultValue'
