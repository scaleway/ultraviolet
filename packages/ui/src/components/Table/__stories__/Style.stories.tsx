import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '../..'
import { Table } from '..'
import { columns, data } from './resources'

const combos = [
  { stripped: false, bordered: false, id: 1 },
  { stripped: true, bordered: false, id: 2 },
  { stripped: false, bordered: true, id: 3 },
  { stripped: true, bordered: true, id: 4 },
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
          columns={columns}
          bordered={combo.bordered}
          stripped={combo.stripped}
          expandable
        >
          <Table.Body>
            {data.slice(0, 3).map(movie => (
              <Table.Row
                key={movie.id}
                id={movie.id}
                expandable={
                  <Text as="p" variant="bodySmall">
                    A movie to watch
                  </Text>
                }
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
