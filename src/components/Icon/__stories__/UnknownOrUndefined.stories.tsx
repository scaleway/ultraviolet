import { DecoratorFunction } from '@storybook/addons'
import { ComponentStory } from '@storybook/react'
import Icon from '..'

export const UnknownOrUndefined: ComponentStory<typeof Icon> = args => (
  <>
    <Icon name={undefined} color="danger" {...args} />
    {/* @ts-expect-error we test an unknown icon name */}
    <Icon name="unknown" color="warning" {...args} />
  </>
)

UnknownOrUndefined.parameters = {
  docs: {
    storyDescription:
      'If name is `undefined` or not found warning is sent and default circle icon is displayed.',
  },
}

UnknownOrUndefined.decorators = [
  Story => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Story />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]
