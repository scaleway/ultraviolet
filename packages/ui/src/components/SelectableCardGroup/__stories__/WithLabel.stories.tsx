import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'

export const WithLabel: StoryFn<typeof SelectableCardGroup> = args => {
  const [value, onChange] = useState('value-1')

  return (
    <SelectableCardGroup
      {...args}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.value)}
      value={value}
    >
      <SelectableCardGroup.Card
        label={
          <SelectableCardGroup.Label
            label="Option avec Badge"
            labelDescription="Description de l'option"
            badgeText="Nouveau"
            badgeSentiment="primary"
          />
        }
        value="value-1"
      />
      <SelectableCardGroup.Card
        label={
          <SelectableCardGroup.Label
            label="Option avec Badge et Side Text"
            badgeText="Populaire"
            badgeSentiment="success"
            sideText="5€"
          />
        }
        value="value-2"
      />
      <SelectableCardGroup.Card
        label={<SelectableCardGroup.Label label="Option simple" labelDescription="Sans badge" />}
        value="value-3"
      />
    </SelectableCardGroup>
  )
}

WithLabel.args = {
  legend: 'Sélectionnez une option',
  name: 'with-label',
  type: 'radio',
}
