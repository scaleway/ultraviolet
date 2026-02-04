import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OfferList } from '..'
import { columns, data } from './resources'

export const Banner: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <OfferList {...props} expandable>
    {data.map((planet, index) =>
      index < 3 ? (
        <OfferList.Row
          banner={{
            sentiment: planet.id === 'mercury' ? 'primary' : undefined,
            text:
              index === 2
                ? 'Disabled banner because row is disabled'
                : 'This is a banner',
          }}
          disabled={index === 2}
          expandable="Some text"
          id={planet.id}
          key={planet.id}
          offerName={planet.id}
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
