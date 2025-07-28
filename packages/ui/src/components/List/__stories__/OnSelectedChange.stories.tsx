import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Text } from '../../Text'
import { List } from '..'
import { columns, data } from './resources'
import { Template } from './Template.stories'

export const OnSelectedChange: StoryFn = args => {
  const [selectedRows, onSelectedChange] = useState<string[]>([])
  // oxlint-disable-next-line eslint/no-console
  console.log('selected', selectedRows)

  return (
    <>
      <Text as="div" variant="body">
        Selected rows:
        {selectedRows.length > 0 ? (
          <ul>
            {selectedRows.map(item => (
              <li key={item}>
                <Text as="span" variant="bodyStrong">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        ) : (
          ' None'
        )}
      </Text>
      <List
        {...args}
        columns={columns}
        onSelectedChange={onSelectedChange}
        selectable
      >
        {data.map(planet => (
          <List.Row
            expandable="Planet description"
            id={planet.id}
            key={planet.id}
          >
            <List.Cell>{planet.name}</List.Cell>
            <List.Cell>{planet.perihelion}AU</List.Cell>
            <List.Cell>{planet.aphelion}AU</List.Cell>
          </List.Row>
        ))}
        <List.SelectBar data={data} idKey="id">
          {({ selectedItems, unselectAll }) => (
            <>
              <Text as="p" sentiment="primary" variant="bodyStrong">
                {selectedItems.length} item(s) selected
              </Text>
              <Button
                onClick={() => {
                  // oxlint-disable-next-line eslint/no-alert
                  alert('elements could be deleted')
                  unselectAll()
                }}
                size="small"
              >
                Delete
              </Button>
            </>
          )}
        </List.SelectBar>
      </List>
    </>
  )
}

OnSelectedChange.args = {
  ...Template.args,
  children: (
    <>
      {data.map(planet => (
        <List.Row
          disabled={planet.id === 'mercury'}
          id={planet.id}
          key={planet.id}
          selectDisabled={
            planet.id === 'home-sweet-home'
              ? "Earth isn't selectable"
              : undefined
          }
        >
          <List.Cell>
            {planet.name}
            {planet.id === 'mercury'
              ? ' (Not selectable because the row itself is disabled)'
              : ''}
            {planet.id === 'home-sweet-home'
              ? ' (Not selectable because of prop `selectDisabled`)'
              : ''}
          </List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
        </List.Row>
      ))}
      <List.SelectBar data={data} idKey="id">
        {({ selectedItems, unselectAll }) => (
          <>
            <Text as="p" sentiment="primary" variant="bodyStrong">
              {selectedItems.length} item(s) selected
            </Text>
            <Button
              onClick={() => {
                // oxlint-disable-next-line eslint/no-alert
                alert('elements could be deleted')
                unselectAll()
              }}
              size="small"
            >
              Delete
            </Button>
          </>
        )}
      </List.SelectBar>
    </>
  ),
  selectable: true,
}

OnSelectedChange.parameters = {
  docs: {
    description: {
      story:
        'By adding the prop `onSelectedChange` on the `List`, it is possible to easily get the list of the id of selected rows.',
    },
  },
}
