import type { Story } from '@storybook/react'
import { List } from '..'
import Button from '../../Button'
import Menu from '../../Menu'
import Stack from '../../Stack'
import { ListBody } from '../ListBody'
import { ListCell } from '../ListCell'
import { ListExpandable } from '../ListExpandable'
import { ListRow } from '../ListRow'
import { columns, data } from './resources'

export const RowExpandableWithAction: Story = args => (
  <List
    {...args}
    idKey="id"
    isSelectable
    data={data}
    columns={[
      ...columns.map(({ label }) => ({
        label,
      })),
      { label: '', width: '50px' },
    ]}
  >
    <ListBody>
      {data.map(({ a, b, c, d, e, id }) => (
        <ListRow isHoverable isExpandable id={id} key={id}>
          <ListCell>{a}</ListCell>
          <ListCell>{b}</ListCell>
          <ListCell>{c}</ListCell>
          <ListCell>{d}</ListCell>
          <ListCell>{e}</ListCell>
          <ListCell preventClick>
            <Stack alignItems="end">
              <Menu
                disclosure={
                  <Button icon="dots-horizontal" variant="transparent" />
                }
              >
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
                <Menu.Item>Action 3</Menu.Item>
              </Menu>
            </Stack>
          </ListCell>
          <ListExpandable>Expandable content of row {id}</ListExpandable>
        </ListRow>
      ))}
    </ListBody>
  </List>
)
