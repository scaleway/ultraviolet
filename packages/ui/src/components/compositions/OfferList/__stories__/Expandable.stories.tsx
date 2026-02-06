import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OfferList } from '..'
import { columns, data } from './resources'

export const Expandable: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <OfferList {...props} expandable>
    {data.map(planet => (
      <OfferList.Row
        expandable="expand content"
        id={planet.id}
        key={planet.id}
        offerName={planet.id}
      >
        <OfferList.Cell>{planet.name}</OfferList.Cell>
        <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
        <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
      </OfferList.Row>
    ))}
  </OfferList>
)

Expandable.args = {
  columns,
  type: 'radio',
}

Expandable.parameters = {
  docs: {
    description: {
      story: 'A row can be expandable.',
    },
  },
}
