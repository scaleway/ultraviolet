import type { StoryFn } from '@storybook/react-vite'
import { MinusIcon } from '@ultraviolet/icons/MinusIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { SteppedListCard } from '..'
import { Button } from '../../../Button'
import { Expandable } from '../../../Expandable'
import { Text } from '../../../Text'
import { Stack } from '../../../Stack'
import { blockStorageWire } from '../__mocks__/blockStorageWire'

export const OnClickHide: StoryFn<
  ComponentProps<typeof SteppedListCard>
> = props => {
  const [visible, setVisible] = useState(true)

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? <MinusIcon /> : <PlusIcon />}
        Click to {visible ? 'completely hide' : 'show'} the component.
      </Button>
      <Expandable opened={visible}>
        <SteppedListCard {...props} onClickHide={() => setVisible(!visible)}>
          <SteppedListCard.Step
            image={blockStorageWire}
            stepNumber={1}
            subHeader={
              <Text as="h3" sentiment="primary" variant="headingSmallStrong">
                First step
              </Text>
            }
          >
            {nextStep => (
              <Stack direction="column" gap={2}>
                <Text as="div" variant="body">
                  First step description
                </Text>
                <Stack direction="row" gap={2}>
                  <Button onClick={() => nextStep(false)} variant="outlined">
                    Skip
                  </Button>
                  <Button onClick={() => nextStep(true)}>Next step</Button>
                </Stack>
              </Stack>
            )}
          </SteppedListCard.Step>
          <SteppedListCard.Step
            image={blockStorageWire}
            stepNumber={2}
            subHeader="Second step"
          >
            {nextStep => (
              <Stack gap={2}>
                Step description
                <Stack direction="row" gap={2}>
                  <Button onClick={() => nextStep(true)}>
                    Validate and close. It will trigger
                    &quot;onClickHidden&quot;
                  </Button>
                </Stack>
              </Stack>
            )}
          </SteppedListCard.Step>
        </SteppedListCard>
      </Expandable>
    </>
  )
}

OnClickHide.args = {
  header: 'Header',
  hideText: 'custom hide text',
  hideTooltipText: 'It will trigger "onClickHide"',
  showText: 'custom show text',
  steps: ['Start', 'First step'],
}

OnClickHide.parameters = {
  docs: {
    description: {
      story:
        'It is possible to define a custom "hiding" action with prop `OnClickHide`. The custom action replaces the default one.',
    },
  },
}
