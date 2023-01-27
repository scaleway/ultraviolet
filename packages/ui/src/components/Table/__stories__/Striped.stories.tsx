import { Table } from '..'
import { Template } from './Template.stories'

export const Striped = Template.bind({})

Striped.args = {
  children: [
    <Table.Head>
      <Table.Row>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
      </Table.Row>
    </Table.Head>,
    <Table.Body striped>
      <Table.Row>
        <Table.BodyCell>001</Table.BodyCell>
        <Table.BodyCell>Just now</Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>002</Table.BodyCell>
        <Table.BodyCell>Yesterday</Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>003</Table.BodyCell>
        <Table.BodyCell>Yesterday</Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>004</Table.BodyCell>
        <Table.BodyCell>Yesterday</Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>005</Table.BodyCell>
        <Table.BodyCell>Yesterday</Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>006</Table.BodyCell>
        <Table.BodyCell>Tomorrow</Table.BodyCell>
      </Table.Row>
    </Table.Body>,
  ],
}

Striped.parameters = {
  docs: {
    description: {
      story:
        'Striped prop will allow you to add background one row out of two to give more visibility in you table content.',
    },
  },
}
