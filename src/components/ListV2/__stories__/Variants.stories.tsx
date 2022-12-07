import { Story } from '@storybook/react'
import { List } from '..'
import { Color } from '../../../theme'
import { ListBody } from '../ListBody'
import { ListCell } from '../ListCell'
import { ListRow } from '../ListRow'
import { columns, data } from './resources'

const variants: Color[] = [
  'primary',
  'warning',
  'info',
  'danger',
  'neutral',
  'success',
]

export const Variants: Story = args => (
  <List
    {...args}
    selectable
    data={data}
    columns={columns.map(({ label }) => ({
      label,
    }))}
  >
    <ListBody>
      {data.map(({ a, b, c, d, e, id }) => {
        const variant = variants[Number(id) % 5]

        return (
          <ListRow variant={variant} isHoverable id={id} key={id}>
            <ListCell>{a}</ListCell>
            <ListCell>{b}</ListCell>
            <ListCell>{c}</ListCell>
            <ListCell>{d}</ListCell>
            <ListCell>{e}</ListCell>
          </ListRow>
        )
      })}
    </ListBody>
  </List>
)
