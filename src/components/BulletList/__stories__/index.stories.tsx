import { Meta, Story } from '@storybook/react'
import React from 'react'
import BulletList, { BulletListProps } from '..'

export default {
  component: BulletList,
  title: 'Components/Navigation/BulletList',
} as Meta

const Template: Story<BulletListProps> = args => (
  <BulletList {...args}>
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
  </BulletList>
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: `
      Creates a BulletList of hierarchical pages.
      Link are automatically supported with \`to\` prop using the \`linkComponent\` from
      your theme configuration.
    `
  }
}
