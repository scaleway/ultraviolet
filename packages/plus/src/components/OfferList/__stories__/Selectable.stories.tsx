import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { OfferList } from '../OfferList'
import { columns, data } from './resources'

export const Selectable: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <Stack gap={3}>
    <Stack gap={1}>
      <Text as="div" variant="body">
        Single-select (
        <Text as="span" variant="code">
          selectable=&quot;radio&quot;
        </Text>
        ):
      </Text>
      <OfferList {...props} selectable="radio">
        {data.map(planet => (
          <OfferList.Row key={planet.id} id={planet.id}>
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
      <OfferList {...props} selectable="checkbox">
        {data.map(planet => (
          <OfferList.Row key={planet.id} id={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>
    </Stack>
  </Stack>
)

Selectable.args = {
  columns,
}

Selectable.parameters = {
  docs: {
    description: {
      story:
        'A row can be selectable. For multi select, set prop `selectable` to `checkbox`, for single select, set it to `radio`.',
    },
  },
}
