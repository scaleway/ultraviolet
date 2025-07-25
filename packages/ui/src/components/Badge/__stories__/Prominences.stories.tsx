import type { StoryFn } from '@storybook/react-vite'
import { Badge, PROMINENCES } from '..'
import { SENTIMENTS } from '../../../theme'

export const Prominences: StoryFn = props => (
  <>
    {Object.keys(PROMINENCES).map(prominence => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {prominence}:
        {SENTIMENTS.map(sentiment => (
          <Badge
            {...props}
            key={`${prominence}-${sentiment}`}
            sentiment={sentiment}
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
    description: {
      story:
        'Prominence is defined by property `prominence`, this parameter will change color degree of badge.',
    },
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
