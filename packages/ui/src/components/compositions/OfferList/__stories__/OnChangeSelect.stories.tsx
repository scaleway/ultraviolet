import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OfferList } from '..'
import { columns, data } from './resources'
import { Stack } from '../../../Stack'
import { Button } from '../../../Button'

export const OnChange: StoryFn<ComponentProps<typeof OfferList>> = props => {
  const [selectedRow, setSelectedRow] = useState<string | string[]>(
    'venus-offer',
  )
  const [selectable, setSelectable] = useState<'checkbox' | 'radio'>('radio')

  return (
    <Stack gap={1}>
      <Button
        onClick={() => {
          setSelectable(selectable === 'checkbox' ? 'radio' : 'checkbox')
          if (selectable === 'checkbox') {
            setSelectedRow('venus-offer')
          } else {
            setSelectedRow(['mercury-offer', 'jupiter-offer'])
          }
        }}
      >
        Set selectable to {selectable === 'checkbox' ? 'radio' : 'checkbox'}
      </Button>
      Selected row
      {Array.isArray(selectedRow) && selectedRow.length > 1 ? 's' : ''}:{' '}
      {Array.isArray(selectedRow)
        ? selectedRow.map((value, index) => `${index > 0 ? ', ' : ''}${value}`)
        : selectedRow}
      <OfferList
        {...props}
        onChangeSelect={setSelectedRow}
        selected={selectedRow}
        type={selectable}
      >
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
        'Use prop `onChangeSelect` to get the selected element(s). Selected row is a string (row offerName) when `selectable="radio"` and a string[] when `selectable="checkbox"`. A row can be pre-selected using prop `selected` (using the offer name)',
    },
  },
}
