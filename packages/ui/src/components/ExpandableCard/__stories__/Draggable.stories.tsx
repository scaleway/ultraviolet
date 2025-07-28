import type { StoryFn } from '@storybook/react-vite'
import type { KeyboardEvent } from 'react'
import { useState } from 'react'
import { Stack } from '../..'
import { ExpandableCard } from '..'

export const Draggable: StoryFn<typeof ExpandableCard> = args => {
  const [cards, setCards] = useState(['Pool-1', 'Pool-2', 'Pool-3', 'Pool-4'])

  const onDrop = (newValue: string, oldValue: string) => {
    const oldIndex = cards.indexOf(oldValue)
    let newIndex = cards.indexOf(newValue)

    if (newIndex < oldIndex) {
      newIndex += 1 // If moving up, we put the element after the old index
    }

    const newCards = [...cards]
    newCards.splice(oldIndex, 1)
    newCards.splice(newIndex, 0, oldValue)

    console.log('newCards', newCards, newIndex, oldIndex, newValue, oldValue)
    setCards(newCards)
  }

  return (
    <Stack gap={1}>
      {cards.map((name, index) => {
        const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'ArrowUp' && index > 0) {
            event.preventDefault()
            onDrop(cards[index], cards[index - 1])
          } else if (event.key === 'ArrowDown' && index < cards.length - 1) {
            event.preventDefault()
            onDrop(cards[index + 1], cards[index])
          }
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
            onKeyDown={onKeyDown}
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
        'Using prop `draggable` you can make the ExpandableCard draggable. You can set up a custom tooltip using the `draggableTooltip` prop. By default, the tooltip has the value "Click and drag to move. Give a different `value` to every draggable card. See code for accessibility support (keyboard event).',
    },
  },
}
