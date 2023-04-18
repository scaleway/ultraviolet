import type { Story } from '@storybook/react'
import { TableV2 } from '..'
import { Stack, Text } from '../..'
import { columns, data } from './resources'

const combos = [
  { stripped: false, separated: false },
  { stripped: true, separated: false },
  { stripped: false, separated: true },
  { stripped: true, separated: true },
]

export const Style: Story = () => (
  <Stack gap={2}>
    {combos.map(combo => (
      <Stack gap={1}>
        <Text as="h6" variant="headingSmall">
          {combo.stripped ? '✅' : '❌'} Stripped |{' '}
          {combo.separated ? '✅' : '❌'} Separator
        </Text>
        <TableV2
          columns={columns}
          separated={combo.separated}
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
      'You can customize the Table with two props `stripped` and `separated`.',
  },
}
