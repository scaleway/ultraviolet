import { Story } from '@storybook/react'
import { List } from '..'
import { ListBody } from '../ListBody'
import { ListCell } from '../ListCell'
import { ListExpandable } from '../ListExpandable'
import { ListRow } from '../ListRow'
import { columns, data } from './resources'

export const CheckboxDisabled: Story = args => (
  <List
    idKey="id"
    {...args}
    isSelectable
    data={data}
    columns={columns.map(({ label }) => ({
      label,
    }))}
  >
    <ListBody>
      {data.map(({ a, b, c, d, e, id }) => (
        <ListRow
          checkboxDisabled={Number(id) % 2 === 0}
          checkboxTooltip={
            Number(id) % 2 === 0 ? "You can't select this" : undefined
          }
          isExpandable
          isDisabled={id === '3'}
          id={id}
          key={id}
        >
          <ListCell>{a}</ListCell>
          <ListCell>{b}</ListCell>
          <ListCell>{c}</ListCell>
          <ListCell>{d}</ListCell>
          <ListCell>{e}</ListCell>
          <ListExpandable>Expandable content of row {id}</ListExpandable>
        </ListRow>
      ))}
    </ListBody>
  </List>
)
