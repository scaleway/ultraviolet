import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../../Submit'
import { OfferListField } from '..'
import { columns, data } from '../__tests__/resources'

export const Required: StoryFn<
  ComponentProps<typeof OfferListField>
> = args => (
  <Stack gap={1}>
    <OfferListField {...args} columns={columns}>
      {data.map(planet => (
        <OfferListField.Row
          id={planet.id}
          key={planet.id}
          offerName={planet.id}
        >
          <OfferListField.Cell>{planet.name}</OfferListField.Cell>
          <OfferListField.Cell>{planet.perihelion}AU</OfferListField.Cell>
          <OfferListField.Cell>{planet.aphelion}AU</OfferListField.Cell>
        </OfferListField.Row>
      ))}
    </OfferListField>
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  label: 'This offerList is required',
  name: 'required-offer-list',
  required: true,
}
