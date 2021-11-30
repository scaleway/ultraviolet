import { Meta, Story } from '@storybook/react'
import React from 'react'
import Table, { Body, BodyCell, Head, HeadCell, Row } from '..'
import Button from '../../Button'

export default {
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'TabGroup gives a navigation made out of tabs.',
      },
    },
  },
  subcomponents: { Body, BodyCell, Head, HeadCell, Row },
  title: 'Components/Data Display/Table',
} as Meta

const Template: Story = args => <Table {...args} />

Template.args = {
  children: [
    <Table.Head>
      <Table.Row>
        <Table.HeadCell>ID</Table.HeadCell>
      </Table.Row>
    </Table.Head>,
    <Table.Body>
      <Table.Row>
        <Table.BodyCell>165</Table.BodyCell>
      </Table.Row>
    </Table.Body>,
  ],
}

export const Default = Template.bind({})

Default.args = {
  ...Template.args,
}

export const Hoverable = Template.bind({})

Hoverable.args = {
  children: [
    <Table.Head>
      <Table.Row>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Row>
    </Table.Head>,
    <Table.Body>
      <Table.Row>
        <Table.BodyCell>999</Table.BodyCell>
        <Table.BodyCell>Just now</Table.BodyCell>
        <Table.BodyCell>
          <Button size="small" icon="eye" data-visibility="hover" />
        </Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>165</Table.BodyCell>
        <Table.BodyCell>Yesterday</Table.BodyCell>
        <Table.BodyCell>
          <Button size="small" icon="eye" data-visibility="hover" />
        </Table.BodyCell>
      </Table.Row>
    </Table.Body>,
  ],
}

export const Loader = Template.bind({})

Loader.args = {
  children: [
    <Table.Head>
      <Table.Row>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
      </Table.Row>
    </Table.Head>,
    <Table.Body loading colSpan={2}>
      <Table.Row>
        <Table.BodyCell>999</Table.BodyCell>
        <Table.BodyCell>Just now</Table.BodyCell>
      </Table.Row>
    </Table.Body>,
  ],
}
