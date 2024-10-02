import type { StoryFn } from '@storybook/react'
import { Table } from '..'
import { Stack, Text } from '../..'
import { columns, data } from './resources'

const combos = [
  { stripped: false, bordered: false },
  { stripped: true, bordered: false },
  { stripped: false, bordered: true },
  { stripped: true, bordered: true },
]

export const Style: StoryFn = args => (
  <Stack gap={2}>
    {combos.map((combo, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Stack gap={1} key={index}>
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
