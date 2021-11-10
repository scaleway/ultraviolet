import { Meta, Story } from '@storybook/react'
import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import UniversalLink, { UniversalLinkProps } from '..'

export default {
  component: UniversalLink,
  title: 'Components/UniversalLink',
} as Meta

const Template: Story<UniversalLinkProps> = args => (
  <UniversalLink
    href="/?path=/story/components-universallink--default"
    {...args}
  >
    href
  </UniversalLink>
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: `A basic link component to display beautiful links.`,
  },
}

export const CustomLink = Template.bind({})
CustomLink.parameters = {
  docs: {
    storyDescription:
      "Use `to` prop to use the linkComponent that come from the `ThemeProvider`. If you don't set it in your theme you can use `as` prop the change the component that will be rendered.",
  },
}
CustomLink.decorators = [
  () => (
    <BrowserRouter>
      <UniversalLink
        to="/?path=/story/components-universallink--custom-link"
        as={Link}
      >
        to
      </UniversalLink>
    </BrowserRouter>
  ),
]
