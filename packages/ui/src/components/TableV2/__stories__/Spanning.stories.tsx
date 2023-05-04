import styled from '@emotion/styled'
import type { Story } from '@storybook/react'
import { TableV2 } from '..'
import { columns, data } from './resources'

const StyledTrilogyCell = styled(TableV2.Cell)`
  background: ${({ theme }) => theme.colors.warning.background};
`

const StyledDirectorCell = styled(TableV2.Cell)`
  background: ${({ theme }) => theme.colors.success.background};
`

const StyledStoryByCell = styled(TableV2.Cell)`
  background: ${({ theme }) => theme.colors.info.background};
`

export const Spanning: Story = () => (
  <TableV2
    columns={[
      ...columns,
      {
        label: 'Screenwriter',
      },
    ]}
  >
    <TableV2.Body>
      {data.map((movie, index) => (
        <TableV2.Row key={movie.id} id={movie.id}>
          <TableV2.Cell>{movie.name}</TableV2.Cell>
          <TableV2.Cell>{movie.releaseYear}</TableV2.Cell>
          {index % 3 === 0 ? (
            <StyledTrilogyCell rowSpan={3}>{movie.trilogy}</StyledTrilogyCell>
          ) : null}
          <StyledDirectorCell
            colSpan={movie.director === movie.storyBy ? 2 : 1}
          >
            {movie.director}
          </StyledDirectorCell>
          {movie.director !== movie.storyBy ? (
            <StyledStoryByCell>{movie.storyBy}</StyledStoryByCell>
          ) : null}
        </TableV2.Row>
      ))}
    </TableV2.Body>
  </TableV2>
)

Spanning.parameters = {
  docs: {
    storyDescription:
      'You can use the html table `colSpan` and `rowSpan` property on a Cell.',
  },
}
