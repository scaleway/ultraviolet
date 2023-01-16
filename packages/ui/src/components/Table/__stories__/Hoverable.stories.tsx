import { Table } from '..'
import { Button } from '../../Button'
import { Template } from './Template.stories'

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
