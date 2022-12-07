import { Story } from '@storybook/react'
import { useState } from 'react'
import { List } from '..'
import ActionBar from '../../ActionBar'
import Button from '../../Button'
import Stack from '../../Stack'
import { ListBody } from '../ListBody'
import { ListCell } from '../ListCell'
import { ListRow } from '../ListRow'
import { columns, data } from './resources'

export const SelectableWithActionBar: Story = args => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  return (
    <Stack gap={1}>
      <List
        {...args}
        selectable
        data={data}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        columns={columns.map(({ label }) => ({
          label,
        }))}
      >
        <ListBody>
          {data.map(({ a, b, c, d, e, id }) => (
            <ListRow isHoverable id={id} key={id}>
              <ListCell>{a}</ListCell>
              <ListCell>{b}</ListCell>
              <ListCell>{c}</ListCell>
              <ListCell>{d}</ListCell>
              <ListCell>{e}</ListCell>
            </ListRow>
          ))}
        </ListBody>
        {selectedIds.length > 0 ? (
          <ActionBar>
            <Stack direction="row" alignItems="center" gap={2}>
              <div>Selected ids are : {selectedIds.join(', ')}</div>
              <Button size="small" onClick={() => setSelectedIds([])}>
                Unselect all
              </Button>
            </Stack>
          </ActionBar>
        ) : null}
      </List>
    </Stack>
  )
}
