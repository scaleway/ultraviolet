import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardGroupField } from '../..'

export const WithLabel: StoryFn<ComponentProps<typeof SelectableCardGroupField>> = args => (
  <SelectableCardGroupField {...args}>
    <SelectableCardGroupField.Card
      label={
        <SelectableCardGroupField.Label
          label="Option avec Badge"
          labelDescription="Description de l'option"
          badgeText="Nouveau"
          badgeSentiment="primary"
        />
      }
      value="value-1"
    />
    <SelectableCardGroupField.Card
      label={
        <SelectableCardGroupField.Label
          label="Option avec Badge et Side Text"
          badgeText="Populaire"
          badgeSentiment="success"
          sideText="5€"
        />
      }
      value="value-2"
    />
    <SelectableCardGroupField.Card
      label={<SelectableCardGroupField.Label label="Option simple" labelDescription="Sans badge" />}
      value="value-3"
    />
  </SelectableCardGroupField>
)

WithLabel.args = {
  legend: 'Sélectionnez une option',
  name: 'withLabel',
  type: 'radio',
}
