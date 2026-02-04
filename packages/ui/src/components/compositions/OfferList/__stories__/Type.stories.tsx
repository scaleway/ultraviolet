import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OfferList } from '..'
import { columns, data } from './resources'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'

export const Type: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <Stack gap={3}>
    <Stack gap={1}>
      <Text as="div" variant="body">
        Single-select (
        <Text as="span" variant="code">
          selectable=&quot;radio&quot;
        </Text>
        ):
      </Text>
      <OfferList {...props} type="radio">
        {data.map(planet => (
          <OfferList.Row
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
            selectDisabled={
              planet.id === 'jupiter' ? 'this row cannot be selected' : false
            }
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>
    </Stack>
    <Stack gap={1}>
      <Text as="div" variant="body">
        Single-select (
        <Text as="span" variant="code">
          selectable=&quot;checkbox&quot;
        </Text>
        ):
      </Text>
      <OfferList {...props} type="checkbox">
        {data.map(planet => (
          <OfferList.Row
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
            selectDisabled={
              planet.id === 'jupiter'
                ? 'this row cannot be selected (but it is not disabled)'
                : false
            }
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>
    </Stack>
  </Stack>
)

Type.args = {
  columns,
}

Type.parameters = {
  docs: {
    description: {
      story:
        'Offers are selectable. For multi select, set prop `type` to `checkbox`, for single select, set it to `radio`. By default, `type = "radio"`. Use prop `selectDisabled` to disable selection on a row, without disabling the whole row.',
    },
  },
}
