import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { blockStorageWire } from '@ultraviolet/illustrations/products/blockStorage'
import { Button, Expandable, Stack, Text } from '@ultraviolet/ui'
import { type ComponentProps, useState } from 'react'
import { SteppedListContainer } from '../SteppedListContainer'

const StyledImage = styled.img`
  filter: invert();
`

export const OnClickHide: StoryFn<
  ComponentProps<typeof SteppedListContainer>
> = props => {
  const theme = useTheme()

  const illustrationImage =
    theme.theme === 'light' ? (
      <StyledImage src={blockStorageWire} width={200} alt="blockStorage" />
    ) : (
      <img src={blockStorageWire} width={200} alt="blockStorage" />
    )
  const [visible, setVisible] = useState(true)

  return (
    <>
      <Button
        icon={visible ? 'minus' : 'plus'}
        onClick={() => setVisible(!visible)}
      >
        Click to {visible ? 'completely hide' : 'show'} the component.
      </Button>
      <Expandable opened={visible}>
        <SteppedListContainer
          {...props}
          onClickHide={() => setVisible(!visible)}
        >
          <SteppedListContainer.Step
            stepNumber={1}
            subHeader={
              <Text as="h3" variant="headingSmallStrong" sentiment="primary">
                First step
              </Text>
            }
            image={illustrationImage}
          >
            {nextStep => (
              <Stack gap={2} direction="column">
                <Text as="div" variant="body">
                  First step description
                </Text>
                <Stack gap={2} direction="row">
                  <Button onClick={() => nextStep(false)} variant="outlined">
                    Skip
                  </Button>
                  <Button onClick={() => nextStep(true)}>Next step</Button>
                </Stack>
              </Stack>
            )}
          </SteppedListContainer.Step>
          <SteppedListContainer.Step
            stepNumber={2}
            subHeader="Second step"
            image={illustrationImage}
          >
            {nextStep => (
              <Stack gap={2}>
                Step description
                <Stack gap={2} direction="row">
                  <Button onClick={() => nextStep(true)}>
                    Validate and close. It will trigger
                    &quot;onClickHidden&quot;
                  </Button>
                </Stack>
              </Stack>
            )}
          </SteppedListContainer.Step>
        </SteppedListContainer>
      </Expandable>
    </>
  )
}

OnClickHide.args = {
  header: 'Header',
  hideTooltipText: 'It will trigger "onClickHide"',
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
