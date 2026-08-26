import { StepList } from '..'
import { Template } from './Template.stories'

export const Sentiment = Template.bind({})

Sentiment.parameters = {
  docs: {
    story: {
      description: 'Set a bullet sentiment state using `sentiment` property.',
    },
  },
}

Sentiment.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletContent="A" sentiment="success">
        success
      </StepList.Item>
      <StepList.Item bulletContent="A">default</StepList.Item>
    </StepList>
  ),
]
