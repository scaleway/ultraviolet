import type { StoryFn } from '@storybook/react-vite'
import { Table } from '..'
import { SelectInput } from '../../../Data Entry/SelectInput'
import { TextInput } from '../../../Data Entry/TextInput'
import { columns, data } from './resources'

export const Input: StoryFn<typeof Table> = ({ ...props }) => <Table {...props} />

Input.args = {
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row id={movie.id} key={movie.id}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
          <Table.Cell>
            <SelectInput
              size="small"
              options={[
                { label: 'Prequel', value: 'prequel' },
                { label: 'Original', value: 'original' },
                { label: 'Sequel', value: 'sequel' },
              ]}
              aria-label="Choose a trilogy"
            />
          </Table.Cell>
          <Table.Cell>{movie.director}</Table.Cell>
          <Table.Cell>
            <TextInput placeholder="Placeholder" size="small" aria-label="Add a note" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
  columns: [...columns, { label: 'Note', width: '200px' }],
}

Input.parameters = {
  docs: {
    description: {
      story:
        'It is possible to add a `TextInput`, `SelectInput`, or any other input inside a cell. Any input inside a `Table.Cell` should have prop `size="small"`. If no visual label is added, do not forget to add an accessible label (following the component convention)',
    },
  },
}
