import type { StoryFn } from '@storybook/react-vite'
import { OfferListField } from '..'
import { columns, data } from '../__tests__/resources'

export const Template: StoryFn<typeof OfferListField> = args => (
  <OfferListField {...args} columns={columns}>
    {data.map(planet => (
      <OfferListField.Row id={planet.id} key={planet.id} offerName={planet.id}>
        <OfferListField.Cell>{planet.name}</OfferListField.Cell>
        <OfferListField.Cell>{planet.perihelion}AU</OfferListField.Cell>
        <OfferListField.Cell>{planet.aphelion}AU</OfferListField.Cell>
      </OfferListField.Row>
    ))}
  </OfferListField>
)
