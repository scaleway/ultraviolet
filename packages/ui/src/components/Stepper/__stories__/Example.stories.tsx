import type { StoryFn } from '@storybook/react-vite'
import { AutoFixIcon } from '@ultraviolet/icons/AutoFixIcon'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Stepper } from '..'

export const Example: StoryFn<typeof Stepper> = args => {
  const [selected, setStep] = useState(1)

  return (
    <Stack gap={2}>
      <Stepper {...args} interactive selected={selected}>
        <Stepper.Step
          onClick={index => (selected > 1 ? setStep(index) : null)}
          title={
            <Stack direction="row" gap={1}>
              Custom title
              <AutoFixIcon
                sentiment={selected === 1 ? 'primary' : 'neutral'}
                size="small"
              />
            </Stack>
          }
        />
        <Stepper.Step
          onClick={index => (selected > 2 ? setStep(index) : null)}
          title="Create"
        />
        <Stepper.Step
          onClick={index => (selected > 3 ? setStep(index) : null)}
          title="Continue"
        />
        <Stepper.Step
          onClick={index => (selected > 4 ? setStep(index) : null)}
          title="Last step"
        />
        <Stepper.Step
          onClick={index => (selected > 5 ? setStep(index) : null)}
          title="Done"
        />
      </Stepper>

      {selected === 5 ? (
        'All done'
      ) : (
        <Stack width="30%">
          Current index: {selected}
          <Button onClick={() => (selected < 5 ? setStep(selected + 1) : null)}>
            Next step
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

Example.parameters = {
  docs: {
    description: {
      story:
        'A more complex example with custom titles and a controllable state.',
    },
  },
}
