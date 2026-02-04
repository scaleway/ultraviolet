import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OfferList } from '..'
import { columns, data } from './resources'

const getTextBadge = (index: number) => {
  if (index === 1) {
    return 'I am a primary badge'
  }
  if (index === 2) {
    return 'I am a disabled badge'
  }
  if (index === 3) {
    return 'I am a strong badge '
  }

  return 'I am a badge'
}
export const Badge: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <OfferList {...props} expandable>
    {data.map((planet, index) =>
      index < 4 ? (
        <OfferList.Row
          badge={{
            prominence: index === 3 ? 'strong' : 'default',
            sentiment: index === 1 ? 'primary' : 'neutral',
            text: getTextBadge(index),
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
