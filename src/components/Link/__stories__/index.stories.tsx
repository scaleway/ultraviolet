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
          'A Link is a component that can render links. You can use `href` prop to render an `a` tag or `to` prop with a `linkComponent` configured in the theme to render another component (We forward all props to the linkComponent).',
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
          href="https://scaleway.com"
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
    <Link href="https://scaleway.com" target="_blank">
      Link opens in a new tab
    </Link>
  ),
]

export const Size = Template.bind({})
Size.parameters = {
  docs: {
    storyDescription: 'Using `size` prop you can change the size of the text',
  },
}
Size.decorators = [
  () => (
    <div
      style={{
        alignItems: 'start',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link size="large" href="https://scaleway.com">
        Link opens in a new tab
      </Link>
      <Link size="small" href="https://scaleway.com">
        Link opens in a new tab
      </Link>
    </div>
  ),
]
