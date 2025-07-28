import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '../..'
import { Table } from '..'
import { columns, data } from './resources'

const combos = [
  { bordered: false, id: 1, stripped: false },
  { bordered: false, id: 2, stripped: true },
  { bordered: true, id: 3, stripped: false },
  { bordered: true, id: 4, stripped: true },
] as const

export const Style: StoryFn = args => (
  <Stack gap={2}>
    {combos.map(combo => (
      <Stack gap={1} key={combo.id}>
        <Text as="h6" variant="headingSmall">
          {combo.stripped ? '✅' : '❌'} Stripped |{' '}
          {combo.bordered ? '✅' : '❌'} Bordered
        </Text>
        <Table
          {...args}
          bordered={combo.bordered}
          columns={columns}
          expandable
          stripped={combo.stripped}
        >
          <Table.Body>
            {data.slice(0, 3).map(movie => (
              <Table.Row
                expandable={
                  <Text as="p" variant="bodySmall">
                    A movie to watch
                  </Text>
                }
                id={movie.id}
                key={movie.id}
              >
                <Table.Cell>{movie.name}</Table.Cell>
                <Table.Cell>{movie.releaseYear}</Table.Cell>
                <Table.Cell>{movie.trilogy}</Table.Cell>
                <Table.Cell>{movie.director}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Stack>
    ))}
  </Stack>
)

Style.parameters = {
  docs: {
    description: {
      story:
        'You can customize the Table with two props `stripped` and `bordered`.',
    },
  },
}
