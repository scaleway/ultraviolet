import { Story } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import { List } from '..'
import { ListBody } from '../ListBody'
import { ListCell } from '../ListCell'
import { ListRow } from '../ListRow'
import { columns, data } from './resources'

export const Sortable: Story = args => {
  const [sort, setSort] = useState<{
    column: string
    order: ComponentProps<typeof List.Header>['sort']
  }>({
    column: '1',
    order: 'asc',
  })

  const handleSort: ComponentProps<typeof List.Header>['onClick'] = ({
    column,
  }) => {
    setSort(currentSort => {
      if (currentSort.column === column) {
        return {
          column,
          order: currentSort.order === 'asc' ? 'desc' : 'asc',
        }
      }

      return { column, order: 'asc' }
    })
  }

  return (
    <List
      {...args}
      data={data}
      columns={columns.map(({ label, id }) => ({
        label,
        sort: sort.column === id ? sort.order : 'none',
        onClick: handleSort,
        id,
      }))}
    >
      <ListBody>
        {data.map(({ a, b, c, d, e, id }) => (
          <ListRow id={id} isHoverable key={id}>
            <ListCell>{a}</ListCell>
            <ListCell>{b}</ListCell>
            <ListCell>{c}</ListCell>
            <ListCell>{d}</ListCell>
            <ListCell>{e}</ListCell>
          </ListRow>
        ))}
      </ListBody>
    </List>
  )
}
