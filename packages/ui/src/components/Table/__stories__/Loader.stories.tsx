import Table from '..'
import { Template } from './Template.stories'

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
