import { Table } from '../../components'

const SIZE_MATCH = {
  large: 'large',
  medium: 'medium',
  small: 'small',
  xsmall: 'xsmall',
  xxsmall: 'xsmall',
} as const

export const Sizes = () => (
  <Table>
    <Table.Head>
      <Table.HeadCell>Previous button version</Table.HeadCell>
      <Table.HeadCell>Current button version</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {(Object.keys(SIZE_MATCH) as (keyof typeof SIZE_MATCH)[]).map(
        buttonV1Size => (
          <Table.Row key={buttonV1Size}>
            <Table.BodyCell>{buttonV1Size}</Table.BodyCell>
            <Table.BodyCell>{SIZE_MATCH[buttonV1Size]}</Table.BodyCell>
          </Table.Row>
        ),
      )}
    </Table.Body>
  </Table>
)
