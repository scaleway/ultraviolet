import type { StoryFn } from '@storybook/react-vite'
import { Button, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OfferList } from '../OfferList'
import { columns, data } from './resources'

export const OnChange: StoryFn<ComponentProps<typeof OfferList>> = props => {
  const [selectedRow, setSelectedRow] = useState<string | string[]>()
  const [selectable, setSelectable] = useState<'checkbox' | 'radio'>('radio')

  return (
    <Stack gap={1}>
      <Button
        onClick={() => {
          setSelectable(selectable === 'checkbox' ? 'radio' : 'checkbox')
          if (selectable === 'checkbox') setSelectedRow('')
          else setSelectedRow([])
        }}
      >
        Set selectable to {selectable === 'checkbox' ? 'radio' : 'checkbox'}
      </Button>
      Selected row
      {Array.isArray(selectedRow) && selectedRow.length > 1 ? 's' : ''}:{' '}
      {Array.isArray(selectedRow)
        ? selectedRow.map((value, index) => `${index > 0 ? ', ' : ''}${value}`)
        : selectedRow}
      <OfferList {...props} onChangeSelect={setSelectedRow} type={selectable}>
        {data.map(planet => (
          <OfferList.Row
            disabled={planet.id === 'mars'}
            id={planet.id}
            key={planet.id}
            offerName={`${planet.id}-offer`}
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>
    </Stack>
  )
}

OnChange.args = {
  columns,
}

OnChange.parameters = {
  docs: {
    description: {
      story:
        'Use prop `onChangeSelect` to get the selected element(s). Selected row is a string (row id) when `selectable="radio"` and a string[] when `selectable="checkbox"`',
    },
  },
}
