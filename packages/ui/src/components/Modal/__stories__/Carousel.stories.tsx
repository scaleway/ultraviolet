import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Modal } from '..'
import appleSilicon from './assets/apple-silicon-m4-content.webp'
import costManager from './assets/cost-manager-content.webp'
import image from './assets/illustration.webp'

const IMAGES_STEP = [image, appleSilicon, costManager]
const TEXT_STEP = [
  'A new feature is available here and give you a lot of interesting options.',
  'However this feature is not without any risk let me explain you why in the next step.',
  'In fact, this feature might break the production environement and should be activate with caution.',
]

export const Carousel: StoryFn = props => {
  const [step, setStep] = useState(0)
  const isLastStep = step >= IMAGES_STEP.length - 1

  return (
    <Modal
      disclosure={
        <Button onClick={() => setStep(0)}>Open Carousel Modal</Button>
      }
      image={IMAGES_STEP[step]}
      size="xsmall"
      {...props}
    >
      {({ close }) => (
        <Stack direction="column" gap="2">
          <Text as="p" sentiment="neutral" variant="body">
            {TEXT_STEP[step]}
          </Text>
          <Stack
            alignItems="flex-end"
            direction="row"
            justifyContent="space-between"
          >
            <Text
              as="span"
              prominence="weak"
              sentiment="neutral"
              variant="bodySmall"
            >
              {step + 1} of {IMAGES_STEP.length}
            </Text>
            <Button
              onClick={() => {
                if (isLastStep) {
                  close()
                } else {
                  setStep(step + 1)
                }
              }}
            >
              {isLastStep ? 'Done' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      )}
    </Modal>
  )
}

Carousel.parameters = {
  docs: {
    description: {
      story: 'It is possible to create a carousel',
    },
  },
}
