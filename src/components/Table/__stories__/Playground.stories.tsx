import Table from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
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
