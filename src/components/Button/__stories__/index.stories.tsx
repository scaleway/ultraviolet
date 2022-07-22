import { Meta, Story } from '@storybook/react'
import { ComponentProps, Fragment } from 'react'
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
    <div style={{ display: 'flex', gap: 16 }}>
      {buttonVariants.map(variant => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
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
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      {buttonSizes.map(size => (
        <div key={size}>
          <Button size={size}>{size}</Button>
        </div>
      ))}
    </div>
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
      'Add `Loader` by setting progress property to `left` or `right`.',
  },
}
Progress.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button progress="left">left progress</Button>
      <Button progress="right">right progress</Button>
    </div>
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
    <div style={{ display: 'flex', gap: 16 }}>
      <Button icon="lock" aria-label="test" />
      <Button icon="lock">With text</Button>
    </div>
  ),
]

export const ProgressAndIcon = Template.bind({})
ProgressAndIcon.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button progress="left" icon="lock" iconPosition="right">
        left progress
      </Button>
      <Button progress="right" icon="lock" iconPosition="left">
        right progress
      </Button>
    </div>
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
    <div style={{ display: 'flex', gap: 16 }}>
      {[10, 18, 24, 32].map(size => (
        <Fragment key={size}>
          <Button icon="lock" iconSize={size} aria-label="test" />
          <Button icon="lock" iconSize={size}>
            With text
          </Button>
        </Fragment>
      ))}
    </div>
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
    <div style={{ display: 'flex', gap: 16 }}>
      <Button iconPosition="left" icon="lock">
        Left
      </Button>
      <Button iconPosition="right" icon="lock">
        Right
      </Button>
    </div>
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
        <Button action key={icon} icon={icon} aria-label="test" />
      ))}
      {buttonVariants.map(variant => (
        <Button
          action
          icon="lock"
          key={variant}
          variant={variant}
          aria-label="test"
        />
      ))}
      {buttonVariants.map(variant => (
        <Button
          action="rounded"
          icon="lock"
          key={variant}
          variant={variant}
          aria-label="test"
        />
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
      'Using the `to` props, link behavior is delegated to [Link Component](https://main.ui.scaleway.com/docs-components-link).',
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
    <div style={{ display: 'flex', gap: 16 }}>
      <Button
        action
        icon="lock"
        variant="primary"
        tooltip="I am locked"
        aria-label="test"
      />
      <Button
        icon="lock"
        variant="primary"
        tooltip="I am locked"
        aria-label="test"
      />
      <Button icon="lock" variant="primary" tooltip="I am locked">
        Hover Me
      </Button>
    </div>
  ),
]
