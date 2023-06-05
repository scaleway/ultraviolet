import styled from '@emotion/styled'
import type { Story } from '@storybook/react'
import { Table } from '..'
import { columns, data } from './resources'

const StyledTrilogyCell = styled(Table.Cell)`
  background: ${({ theme }) => theme.colors.warning.background};
`

const StyledDirectorCell = styled(Table.Cell)`
  background: ${({ theme }) => theme.colors.success.background};
`

const StyledStoryByCell = styled(Table.Cell)`
  background: ${({ theme }) => theme.colors.info.background};
`

export const Spanning: Story = () => (
  <Table
    columns={[
      ...columns,
      {
        label: 'Screenwriter',
      },
    ]}
  >
    <Table.Body>
      {data.map((movie, index) => (
        <Table.Row key={movie.id} id={movie.id}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
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
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

Spanning.parameters = {
  docs: {
    storyDescription:
      'You can use the html table `colSpan` and `rowSpan` property on a Cell.',
  },
}
