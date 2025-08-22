import type { StoryFn } from '@storybook/react-vite'
import { SENTIMENTS } from '../../../theme'
import { Badge } from '..'
import { PROMINENCES } from '../constant'

export const Prominences: StoryFn = props => (
  <>
    {Object.keys(PROMINENCES).map(prominence => (
      <div
        key={prominence}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
      >
        {prominence}:
        {SENTIMENTS.map(sentiment => (
          <Badge
            key={`${prominence}-${sentiment}`}
            {...props}
            prominence={prominence as keyof typeof PROMINENCES}
            sentiment={sentiment}
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
