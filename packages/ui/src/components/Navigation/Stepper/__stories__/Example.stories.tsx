import type { StoryFn } from '@storybook/react-vite'
import { AutoFixIcon } from '@ultraviolet/icons/AutoFixIcon'
import { useState } from 'react'
import { Stepper } from '..'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'

export const Example: StoryFn<typeof Stepper> = args => {
  const [selected, setStep] = useState(1)

  return (
    <Stack gap={2}>
      <Stepper {...args} interactive selected={selected}>
        <Stepper.Step
          onClick={index => {
            if (selected > 1) {
              setStep(index)
            }
          }}
          title={
            <Stack direction="row" gap={1}>
              Custom title
              <AutoFixIcon sentiment={selected === 1 ? 'primary' : 'neutral'} size="small" />
            </Stack>
          }
        />
        <Stepper.Step
          onClick={index => {
            if (selected > 2) {
              setStep(index)
            }
          }}
          title="Create"
        />
        <Stepper.Step
          onClick={index => {
            if (selected > 3) {
              setStep(index)
            }
          }}

          title="Continue"
        />
        <Stepper.Step
          onClick={index => {
            if (selected > 4) {
              setStep(index)
            }
          }}
          title="Last step"
        />
        <Stepper.Step
          onClick={index => {
            if (selected > 5) {
              setStep(index)
            }
          }}
          title="Done"
        />
      </Stepper>

      {selected === 5 ? (
        'All done'
      ) : (
        <Stack width="30%">
          Current index: {selected}
          <Button
            onClick={() => {
              if (selected < 5) {
                setStep(selected + 1)
              }
            }}
          >
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
      story: 'A more complex example with custom titles and a controllable state.',
    },
  },
}
