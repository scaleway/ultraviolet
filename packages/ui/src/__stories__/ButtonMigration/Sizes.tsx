import { Table } from '../../components'

const SIZE_MATCH = {
  large: 'large',
  medium: 'medium',
  small: 'small',
  xsmall: 'small',
  xxsmall: 'small',
} as const

export const Sizes = () => (
  <Table
    columns={[
      { label: 'Previous button version' },
      { label: 'Current button version' },
    ]}
  >
    <Table.Body>
      {(Object.keys(SIZE_MATCH) as (keyof typeof SIZE_MATCH)[]).map(
        buttonV1Size => (
          <Table.Row key={buttonV1Size} id={buttonV1Size}>
            <Table.Cell>{buttonV1Size}</Table.Cell>
            <Table.Cell>{SIZE_MATCH[buttonV1Size]}</Table.Cell>
          </Table.Row>
        ),
      )}
    </Table.Body>
  </Table>
)
