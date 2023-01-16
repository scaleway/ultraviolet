import { Table } from '..'
import { Template } from './Template.stories'

export const ColumnWidth = Template.bind({})

ColumnWidth.args = {
  children: [
    <Table.Head>
      <Table.Row>
        <Table.HeadCell width="150px">in PX</Table.HeadCell>
        <Table.HeadCell width="20%">in Percent</Table.HeadCell>
        <Table.HeadCell>Auto</Table.HeadCell>
      </Table.Row>
    </Table.Head>,
    <Table.Body>
      <Table.Row>
        <Table.BodyCell>150px width</Table.BodyCell>
        <Table.BodyCell>20% width</Table.BodyCell>
        <Table.BodyCell>auto width</Table.BodyCell>
      </Table.Row>
    </Table.Body>,
  ],
}

ColumnWidth.parameters = {
  docs: {
    description: {
      story:
        '`width` prop on Table.HeadCell allows to define the width of your column',
    },
  },
}
