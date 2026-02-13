import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SteppedListCard } from '..'
import { Stack } from '../../../Stack'
import { Button } from '../../../Button'

export const NextStep: StoryFn<
  ComponentProps<typeof SteppedListCard>
> = props => (
  <SteppedListCard {...props}>
    <SteppedListCard.Step stepNumber={1}>
      {nextStep => (
        <Stack direction="column" gap={2}>
          <Stack direction="row" gap={2}>
            <Button
              onClick={() => {
                nextStep()
              }}
              sentiment="primary"
            >
              nextStep()
            </Button>
            <Button
              onClick={() => {
                nextStep(true)
              }}
            >
              nextStep(true)
            </Button>
            <Button
              onClick={() => {
                nextStep(false)
              }}
            >
              nextStep(false)
            </Button>
          </Stack>
        </Stack>
      )}
    </SteppedListCard.Step>
    <SteppedListCard.Step stepNumber={2}>
      <Stack direction="column" gap={2}>
        Click the name of step 1 to navigate back to it and test the different
        buttons.
      </Stack>
    </SteppedListCard.Step>
  </SteppedListCard>
)

NextStep.args = {
  header: 'Header',
  hideText: 'Hide',
  hideTooltipText: 'To hide the content, click on the "hide" button',
  showText: 'Show',
  showTooltipText: 'To show, click on this button',
  steps: ['Start', 'First step'],
}

NextStep.parameters = {
  docs: {
    description: {
      story:
        "Using the function 'nextStep', you can go to the next step. There are 3 ways to go to the next step:  <ul> <li> nextStep(true): will mark current step as done and move to next step </li>       <li> nextStep(false): will mark current step as not done adn move to next step </li>       <li> nextStep(): go to next step without changing current step status</li></ul>",
    },
  },
}
