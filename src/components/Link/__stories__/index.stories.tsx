import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Link from '..'
import { SENTIMENTS } from '../../../theme'

export default {
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'An Expandable is a container that can hide or show its content',
      },
    },
  },
  title: 'Components/Foundation/Link',
} as Meta

const Template: Story<ComponentProps<typeof Link>> = args => (
  <Link {...args}>Basic Link</Link>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription:
      'Using `variant` prop you can change the look and feel of the component.',
  },
}
Variants.decorators = [
  () => (
    <div
      style={{
        alignItems: 'start',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {SENTIMENTS.map(variant => (
        <Link
          key={variant}
          iconPosition="left"
          to="localhost:6006"
          variant={variant}
        >
          {variant}
        </Link>
      ))}
    </div>
  ),
]

export const Target = Template.bind({})
Target.parameters = {
  docs: {
    storyDescription:
      'Using `target` prop you can change specify the target you want for your link. By using _blank an icon is added to show that it is an external link',
  },
}
Target.decorators = [
  () => (
    <>
      <Link to="localhost:6006" target="_blank">
        Link opens in a new tab
      </Link>
      <Link to="localhost:6006" iconPosition="left" target="_blank">
        Link opens in a new tab
      </Link>
      <Link to="localhost:6006" iconPosition="right" target="_blank">
        Link opens in a new tab
      </Link>
    </>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'You can disable the link with the `disabled` prop',
  },
}
Disabled.decorators = [
  () => (
    <Link to="/localhost:6006" disabled>
      Disabled URL
    </Link>
  ),
]

export const LinkComponent = Template.bind({})
LinkComponent.parameters = {
  docs: {
    storyDescription:
      'By default link is an achor component `a`. If you dont put to prop but onClick it will change for a `button`. You can also specify the component you want to use by using the `as` prop.',
  },
}

LinkComponent.decorators = [
  () => (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link onClick={() => console.log('Hello world')}>
        Use custom component
      </Link>
      <Link to="./" as="span">
        Use custom component
      </Link>
    </>
  ),
]
