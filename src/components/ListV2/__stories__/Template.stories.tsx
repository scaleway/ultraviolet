import { ComponentStory } from '@storybook/react'
import { List } from '..'
import { ListBody } from '../ListBody'
import { ListCell } from '../ListCell'
import { ListRow } from '../ListRow'
import { columns, data } from './resources'

export const Template: ComponentStory<typeof List> = args => <List {...args} />

Template.args = {
  data,
  columns: columns.map(({ label }) => ({
    label,
  })),
  autoClose: false,
  selectedIds: undefined,
  onSelectedIdsChange: undefined,
  idKey: 'id',
  isLoading: false,
  isSelectable: false,
  template: undefined,
  children: (
    <ListBody>
      {data.map(({ a, b, c, d, e, id }) => (
        <ListRow isHoverable isDisabled={id === '3'} id={id} key={id}>
          <ListCell>{a}</ListCell>
          <ListCell>{b}</ListCell>
          <ListCell>{c}</ListCell>
          <ListCell>{d}</ListCell>
          <ListCell>{e}</ListCell>
        </ListRow>
      ))}
    </ListBody>
  ),
}
