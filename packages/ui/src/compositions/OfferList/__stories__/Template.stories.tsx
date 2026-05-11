import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OfferList } from '..'
import { columns, data } from './resources'

export const Template: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <OfferList {...props}>
    {data.map(planet => (
      <OfferList.Row id={planet.id} key={planet.id} offerName={planet.id}>
        <OfferList.Cell>{planet.name}</OfferList.Cell>
        <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
        <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
      </OfferList.Row>
    ))}
  </OfferList>
)

Template.args = {
  columns,
}
