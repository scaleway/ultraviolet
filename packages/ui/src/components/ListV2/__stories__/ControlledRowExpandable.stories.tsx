import type { Story } from '@storybook/react'
import { useState } from 'react'
import { List } from '..'
import { Button } from '../..'
import { columns, data as sourceData } from './resources'

export const ControlledRowExpandable: Story = () => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  return (
    <List columns={[...columns, { label: 'Actions', width: '200px' }]}>
      {sourceData.map(planet => (
        <List.Row
          key={planet.id}
          id={planet.id}
          expandable="Planet description"
          isExpanded={expandedRowId === planet.id}
        >
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
          <List.Cell>
            <Button
              size="small"
              onClick={() =>
                setExpandedRowId(currentValue =>
                  currentValue === planet.id ? null : planet.id,
                )
              }
            >
              {expandedRowId === planet.id ? 'Show less' : 'Show more'}
            </Button>
          </List.Cell>
        </List.Row>
      ))}
    </List>
  )
}

ControlledRowExpandable.parameters = {
  docs: {
    storyDescription:
      'You can control yourself the expanding of a row using the prop `forceExtend` on `List.Expandable`.',
  },
}
