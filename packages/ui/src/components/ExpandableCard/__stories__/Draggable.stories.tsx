import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { ExpandableCard } from '..'
import { Stack } from '../..'

export const Draggable: StoryFn<typeof ExpandableCard> = args => {
  const [cards, setCards] = useState(['Pool-1', 'Pool-2', 'Pool-3', 'Pool-4'])

  return (
    <Stack gap={1}>
      {cards.map((name, index) => {
        const onDrop = (newValue: string, oldValue: string) => {
          const oldIndex = cards.indexOf(oldValue)
          let newIndex = cards.indexOf(newValue)

          if (newIndex < oldIndex) {
            newIndex += 1 // If moving up, we put the element after the old index
          }

          const newCards = [...cards]
          newCards.splice(oldIndex, 1)
          newCards.splice(newIndex, 0, oldValue)

          setCards(newCards)
        }

        return (
          <ExpandableCard
            key={name}
            {...args}
            name="pool"
            header={name}
            value={name}
            onDrop={onDrop}
            draggable
            index={index}
          >
            Content for {name}
          </ExpandableCard>
        )
      })}
    </Stack>
  )
}

Draggable.args = {
  draggableTooltip: 'Custom tooltip text',
}

Draggable.parameters = {
  docs: {
    description: {
      story:
        'Using prop `draggable` you can make the ExpandableCard draggable. You can set up a custom tooltip using the `draggableTooltip` prop. By default, the tooltip has the value "Click and drag to move. Give a different `value` to every draggable card. ',
    },
  },
}
