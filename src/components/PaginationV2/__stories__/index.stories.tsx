import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Pagination from '..'

export default {
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Pagination can be useful for long listings.',
      },
    },
  },
  title: 'Components/Navigation/PaginationV2',
} as Meta

const Template: Story<ComponentProps<typeof Pagination>> = args => (
  <Pagination {...args} />
)

export const Default = Template.bind({})

export const Basic = Template.bind({})
Basic.args = {
  disabled: false,
  onChange: () => {},
  page: 3,
  pageCount: 10,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  onChange: () => {},
  page: 3,
  pageCount: 10,
}
