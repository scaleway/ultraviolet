import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OfferList } from '../OfferList'
import { columns, data } from './resources'

export const Badge: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <OfferList {...props} expandable>
    {data.map((planet, index) =>
      index < 3 ? (
        <OfferList.Row
          key={planet.id}
          id={planet.id}
          offerName={planet.id}
          disabled={index === 2}
          expandable="Some text"
          badge={{
            text: 'I am a badge',
            sentiment: index === 1 ? 'primary' : 'neutral',
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

Badge.args = {
  columns,
}

Badge.parameters = {
  docs: {
    description: {
      story:
        'Use props `badge` to add a badge to the row. When a row is disabled, its badge is also disabled.',
    },
  },
}
