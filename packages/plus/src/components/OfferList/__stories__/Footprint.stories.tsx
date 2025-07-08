import type { StoryFn } from '@storybook/react'
import { Tooltip } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { OfferList } from '../OfferList'

export const Footprint: StoryFn<ComponentProps<typeof OfferList>> = props => (
  <OfferList {...props}>
    {[
      { id: 'one', name: 'with default max', score: 2, info: 'this is text' },
      {
        id: 'two',
        name: 'With a custom  max score',
        max: 5,
        score: 3,
        info: 'this is text',
      },
      {
        id: 'three',
        name: 'Disabled row',
        max: 5,
        score: 3,
        info: 'this is text',
      },
    ].map(element => (
      <OfferList.Row
        key={element.id}
        id={element.id}
        disabled={element.id === 'three'}
        offerName={element.id}
      >
        <OfferList.Cell
          footPrint={{
            score: element.score,
            max: element.max,
          }}
        >
          <Tooltip
            text={element.id === 'three' ? 'This row is disabled' : null}
          >
            {element.name}
          </Tooltip>
        </OfferList.Cell>
        <OfferList.Cell>{element.info}</OfferList.Cell>
      </OfferList.Row>
    ))}
  </OfferList>
)

Footprint.args = {
  columns: [{ label: ' name' }, { label: 'column' }],
  selectable: 'radio',
}

Footprint.parameters = {
  docs: {
    description: {
      story:
        'Use prop `footprint` to add an indicator of the environmental footprint. By default, the max score is 3, but it is possible to set a custom maxScore : `footPrint = { score: number, max?: number }',
    },
  },
}
