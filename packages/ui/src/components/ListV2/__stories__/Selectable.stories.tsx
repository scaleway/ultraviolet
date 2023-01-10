import styled from '@emotion/styled'
import type { Story } from '@storybook/react'
import { useMemo, useState } from 'react'
import { List } from '..'
import { ActionBar } from '../../ActionBar'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { columns, data as sourceData } from './resources'

const ActionBarWithPadding = styled(ActionBar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.space['1']};
`

export const Selectable: Story = () => {
  const [data, setData] = useState(sourceData)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectedPlanets = useMemo(
    () => data.filter(planet => selectedIds.includes(planet.id)),
    [data, selectedIds],
  )

  const onDelete = (planetIds: string[]) => {
    setData(currentPlanets =>
      currentPlanets.filter(planet => !planetIds.includes(planet.id)),
    )
  }

  return (
    <>
      <List
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        columns={columns}
      >
        {data.map(planet => (
          <List.Row
            key={planet.id}
            id={planet.id}
            checkboxDisabled={planet.id === 'home-sweet-home'}
            checkboxTooltip={
              planet.id === 'home-sweet-home'
                ? "Earth isn't selectable"
                : undefined
            }
          >
            <List.Cell>
              {planet.id === 'home-sweet-home'
                ? `${planet.name} (Not selectable)`
                : planet.name}
            </List.Cell>
            <List.Cell>{planet.perihelion}AU</List.Cell>
            <List.Cell>{planet.aphelion}AU</List.Cell>
          </List.Row>
        ))}
      </List>
      {selectedPlanets.length !== 0 ? (
        <ActionBarWithPadding>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Text as="p" variant="bodySmall">
              Planets selected :{' '}
              {selectedPlanets.map(planet => planet.name).join(', ')}
            </Text>
          </Stack>
          <Button action icon="delete" onClick={() => onDelete(selectedIds)} />
        </ActionBarWithPadding>
      ) : null}
    </>
  )
}

Selectable.parameters = {
  docs: {
    storyDescription:
      'You can easily allow the user to select rows. For that you must provided both `selectedIds` and `onSelectedIdsChange`.\n\nSelected rows are controlled by specifying `selectedIds`, which is an array where each item should match an `id` provide to a List.Row.\n\nOn toggle/toggleAll, List will exposed updatedSelectedIds using `onSelectedIdsChange`, but you still need to update your `selectedIds` since it is controlled. Please make sure that `onSelectedIdsChange` does not changed between callback (use useCallback or useState dispatch for instance).\n\nBe aware that List will always try to synchronize visibleData and selectedIds, so if one row disappeared (deleted, pagination, ...), `onSelectedIdsChange` will be called with a ids list without item.\n\nThe prop `checkboxDisabled` prevent a row to be selected and `checkboxTooltip` allow you to explain why to user.\n\nThis example show how you can list selectedIds with another component',
  },
}
