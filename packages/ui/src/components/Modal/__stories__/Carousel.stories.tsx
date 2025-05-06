import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
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
      image={IMAGES_STEP[step]}
      size="medium"
      disclosure={
        <Button onClick={() => setStep(0)}>Open Carousel Modal</Button>
      }
      {...props}
    >
      {({ close }) => (
        <Stack direction="column" gap="2">
          <Text as="p" variant="body" sentiment="neutral">
            {TEXT_STEP[step]}
          </Text>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="end"
          >
            <Text
              as="span"
              variant="bodySmall"
              sentiment="neutral"
              prominence="weak"
            >
              {step + 1} of {IMAGES_STEP.length}
            </Text>
            <Button
              onClick={() => {
                if (!isLastStep) {
                  setStep(step + 1)
                } else {
                  close()
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
      story: 'Add an image at the top of the modal.',
    },
  },
}
