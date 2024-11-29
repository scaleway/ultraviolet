import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { List } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Template } from './Template.stories'
import { columns, data } from './resources'

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
        selectable
        onSelectedChange={onSelectedChange}
      >
        {data.map(planet => (
          <List.Row
            key={planet.id}
            id={planet.id}
            expandable="Planet description"
          >
            <List.Cell>{planet.name}</List.Cell>
            <List.Cell>{planet.perihelion}AU</List.Cell>
            <List.Cell>{planet.aphelion}AU</List.Cell>
          </List.Row>
        ))}
        <List.SelectBar data={data} idKey="id">
          {({ selectedItems, unselectAll }) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Text variant="bodyStrong" as="p" sentiment="primary">
                {selectedItems.length} item(s) selected
              </Text>
              <Button
                size="small"
                onClick={() => {
                  // oxlint-disable-next-line eslint/no-alert
                  alert('elements could be deleted')
                  unselectAll()
                }}
              >
                Delete
              </Button>
            </Stack>
          )}
        </List.SelectBar>
      </List>
    </>
  )
}

OnSelectedChange.args = {
  ...Template.args,
  selectable: true,
  children: (
    <>
      {data.map(planet => (
        <List.Row
          key={planet.id}
          id={planet.id}
          disabled={planet.id === 'mercury'}
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Text variant="bodyStrong" as="p" sentiment="primary">
              {selectedItems.length} item(s) selected
            </Text>
            <Button
              size="small"
              onClick={() => {
                // oxlint-disable-next-line eslint/no-alert
                alert('elements could be deleted')
                unselectAll()
              }}
            >
              Delete
            </Button>
          </Stack>
        )}
      </List.SelectBar>
    </>
  ),
}

OnSelectedChange.parameters = {
  docs: {
    description: {
      story:
        'By adding the prop `onSelectedChange` on the `List`, it is possible to easily get the list of the id of selected rows.',
    },
  },
}
