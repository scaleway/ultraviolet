import { Story } from '@storybook/react'
import Badge, { PROMINENCES } from '..'
import { SENTIMENTS } from '../../../theme'

export const Prominences: Story = props => (
  <>
    {Object.keys(PROMINENCES).map(prominence => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {prominence}:
        {SENTIMENTS.map(sentiment => (
          <Badge
            {...props}
            key={`${prominence}-${sentiment}`}
            variant={sentiment}
            prominence={prominence as keyof typeof PROMINENCES}
          >
            {sentiment}
          </Badge>
        ))}
      </div>
    ))}
  </>
)

Prominences.parameters = {
  docs: {
    storyDescription:
      'Prominence is defined by property `prominence`, this parameter will change color degree of badge.',
  },
}

Prominences.args = {
  children: [],
}

Prominences.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
