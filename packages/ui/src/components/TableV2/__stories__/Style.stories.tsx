import type { Story } from '@storybook/react'
import { TableV2 } from '..'
import { Stack, Text } from '../..'
import { columns, data } from './resources'

const combos = [
  { stripped: false, bordered: false },
  { stripped: true, bordered: false },
  { stripped: false, bordered: true },
  { stripped: true, bordered: true },
]

export const Style: Story = () => (
  <Stack gap={2}>
    {combos.map((combo, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Stack gap={1} key={index}>
        <Text as="h6" variant="headingSmall">
          {combo.stripped ? '✅' : '❌'} Stripped |{' '}
          {combo.bordered ? '✅' : '❌'} Bordered
        </Text>
        <TableV2
          columns={columns}
          bordered={combo.bordered}
          stripped={combo.stripped}
        >
          <TableV2.Body>
            {data.slice(0, 3).map(movie => (
              <TableV2.Row key={movie.id} id={movie.id}>
                <TableV2.Cell>{movie.name}</TableV2.Cell>
                <TableV2.Cell>{movie.releaseYear}</TableV2.Cell>
                <TableV2.Cell>{movie.trilogy}</TableV2.Cell>
                <TableV2.Cell>{movie.director}</TableV2.Cell>
              </TableV2.Row>
            ))}
          </TableV2.Body>
        </TableV2>
      </Stack>
    ))}
  </Stack>
)

Style.parameters = {
  docs: {
    storyDescription:
      'You can customize the Table with two props `stripped` and `bordered`.',
  },
}
