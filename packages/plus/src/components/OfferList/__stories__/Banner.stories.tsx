import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OfferList } from '../OfferList'
import { columns, data } from './resources'

export const Banner: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <OfferList {...props} expandable>
    {data.map((planet, index) =>
      index < 3 ? (
        <OfferList.Row
          key={planet.id}
          id={planet.id}
          offerName={planet.id}
          disabled={index === 2}
          expandable="Some text"
          banner={{
            text:
              index === 2
                ? 'Disabled banner because row is disabled'
                : 'This is a banner',
            sentiment: planet.id === 'mercury' ? 'primary' : undefined,
          }}
        >
          <OfferList.Cell>{planet.name}</OfferList.Cell>
          <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
          <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
        </OfferList.Row>
      ) : null,
    )}
  </OfferList>
)

Banner.args = {
  columns,
}

Banner.parameters = {
  docs: {
    description: {
      story:
        'Use props `banner` to add a banner. When a row is disabled, its banner is also disabled.',
    },
  },
}
