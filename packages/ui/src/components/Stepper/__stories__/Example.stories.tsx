import type { StoryFn } from '@storybook/react'
import { Icon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Stepper } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Example: StoryFn<typeof Stepper> = args => {
  const [selected, setStep] = useState(1)

  return (
    <Stack gap={2}>
      <Stepper {...args} selected={selected} interactive>
        <Stepper.Step
          index={1}
          onClick={setStep}
          title={
            <Stack direction="row" gap={1}>
              Custom title
              <Icon
                name="auto-fix"
                size="small"
                sentiment={selected === 1 ? 'primary' : 'neutral'}
              />
            </Stack>
          }
        />
        <Stepper.Step index={2} onClick={setStep} title="Create" />
        <Stepper.Step index={3} onClick={setStep} title="Continue" />
        <Stepper.Step index={4} onClick={setStep} title="Last step" />
        <Stepper.Step index={5} onClick={setStep} title="Done" />
      </Stepper>

      {selected === 6 ? (
        'All done'
      ) : (
        <Stack width="30%">
          Current step: {selected}{' '}
          <Button
            onClick={() => (selected <= 5 ? setStep(selected + 1) : null)}
          >
            Next step
          </Button>
        </Stack>
      )}
    </Stack>
  )
}
