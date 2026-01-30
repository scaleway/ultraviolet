import type { StoryFn } from '@storybook/react-vite'
import { MinusIcon } from '@ultraviolet/icons/MinusIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { WireIllustration } from '@ultraviolet/illustrations'
import { Button, Expandable, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { SteppedListCard } from '../SteppedListCard'

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
            image={
              <WireIllustration height={200} name="blockStorage" width={200} />
            }
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
            image={
              <WireIllustration height={200} name="blockStorage" width={200} />
            }
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
