import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Button, { buttonSizes, buttonVariants } from '..'
import { icons } from '../../Icon'

export default {
  component: Button,
  title: 'Components/Button/Button',
} as Meta

const Template: Story<ComponentProps<typeof Button>> = args => (
  <Button {...args}>Button</Button>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}
Variants.decorators = [
  () => (
    <>
      {buttonVariants.map(variant => (
        <Button key={variant} variant={variant} mr={2} mb={2}>
          {variant}
        </Button>
      ))}
    </>
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription: 'Set `size` using size property.',
  },
}
Sizes.decorators = [
  () => (
    <>
      {buttonSizes.map(size => (
        <Button key={size} size={size} mr={2}>
          {size}
        </Button>
      ))}
    </>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'Set `disabled` using disabled property.',
  },
}
Disabled.decorators = [() => <Button disabled>Disabled</Button>]

export const Progress = Template.bind({})
Progress.parameters = {
  docs: {
    storyDescription:
      'Add `ActivityIndicator` by setting progress property to `left` or `right`.',
  },
}
Progress.decorators = [
  () => (
    <>
      <Button progress="left" mr={2}>
        left progress
      </Button>
      <Button progress="right">right progress</Button>
    </>
  ),
]

export const Icons = Template.bind({})
Icons.parameters = {
  docs: {
    storyDescription:
      'Add icon using `icon`. You can specify the name of the icon or the icon itself.',
  },
}
Icons.decorators = [
  () => (
    <>
      <Button icon="lock" mr={2} />
      <Button icon="lock">With text</Button>
    </>
  ),
]

export const IconsSizes = Template.bind({})
IconsSizes.parameters = {
  docs: {
    storyDescription: 'Set size using `iconSize` prop.',
  },
}
IconsSizes.decorators = [
  () => (
    <>
      {[10, 18, 24, 32].map(size => (
        <React.Fragment key={size}>
          <Button icon="lock" iconSize={size} mr={2} />
          <Button icon="lock" iconSize={size} mr={2}>
            With text
          </Button>
        </React.Fragment>
      ))}
    </>
  ),
]

export const IconsPositions = Template.bind({})
IconsPositions.parameters = {
  docs: {
    storyDescription:
      'Add a position icon using `iconPosition`. You can specify whether you want it to the left or to the right of your text. It requires an `icon`.',
  },
}
IconsPositions.decorators = [
  () => (
    <>
      <Button iconPosition="left" icon="lock" mr={2}>
        Left
      </Button>
      <Button iconPosition="right" icon="lock">
        Right
      </Button>
    </>
  ),
]

export const Action = Template.bind({})
Action.parameters = {
  docs: {
    storyDescription: 'Action button is a icon only button with no padding',
  },
}
Action.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {icons.map(icon => (
        <Button action key={icon} icon={icon} />
      ))}
      {buttonVariants.map(variant => (
        <Button action icon="lock" key={variant} variant={variant} />
      ))}
      {buttonVariants.map(variant => (
        <Button action="rounded" icon="lock" key={variant} variant={variant} />
      ))}
    </div>
  ),
]

export const Extend = Template.bind({})
Extend.parameters = {
  docs: {
    storyDescription:
      'Make button extensible using `extend` prop. It requires a `icon`.',
  },
}
Extend.decorators = [
  () => (
    <Button extend icon="plus">
      Extend
    </Button>
  ),
]

export const Download = Template.bind({})
Download.parameters = {
  docs: {
    storyDescription:
      'Use `download` prop if you want to make it a downloadable button.',
  },
}
Download.decorators = [() => <Button download icon="download" />]

export const LinkDelegation = Template.bind({})
LinkDelegation.parameters = {
  docs: {
    storyDescription:
      'Using the `to` props, link behavior is delegated to [Link Component](https://react.ui.scaleway.com/docs-components-link).',
  },
}
LinkDelegation.decorators = [
  () => (
    <Button to="https://scaleway.com" target="_blank">
      Scaleway
    </Button>
  ),
]

export const Tooltip = Template.bind({})
Tooltip.parameters = {
  docs: {
    storyDescription:
      'You can also add a tooltip text by providing a string in the `tooltip` props',
  },
}
Tooltip.decorators = [
  () => (
    <>
      <Button
        mb={2}
        action
        icon="lock"
        variant="primary"
        tooltip="I am locked"
      />
      <Button mb={2} icon="lock" variant="primary" tooltip="I am locked" />
      <Button icon="lock" variant="primary" tooltip="I am locked">
        Hover Me
      </Button>
    </>
  ),
]
