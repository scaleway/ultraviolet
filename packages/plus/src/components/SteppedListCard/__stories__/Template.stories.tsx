import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { blockStorageWire } from '@ultraviolet/illustrations/products/blockStorage'
import { Button, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SteppedListContainer } from '../SteppedListContainer'

const StyledImage = styled.img`
  filter: invert();
`
const StyledButton = styled(Button)`
  width: fit-content;
`
export const Template: StoryFn<
  ComponentProps<typeof SteppedListContainer>
> = props => {
  const theme = useTheme()

  const illustrationImage =
    theme.theme === 'light' ? (
      <StyledImage src={blockStorageWire} width={200} />
    ) : (
      <img src={blockStorageWire} width={200} alt="blockStorage" />
    )

  return (
    <SteppedListContainer
      {...props}
      showComponent={setHidden => (
        <Button onClick={() => setHidden(false)}>Show</Button>
      )}
    >
      <SteppedListContainer.Step
        stepNumber={1}
        subHeader={
          <Text as="h3" variant="headingSmallStrong" sentiment="primary">
            Welcome aboard!
          </Text>
        }
        image={illustrationImage}
      >
        {setDone => (
          <Stack gap={2} direction="column">
            <Text as="div" variant="body">
              We are thrilled to count you as a Scaleway user! We are looking
              forward to providing you with the very best experience. To order
              resources to get started with your project, we need you to
              complete a few more steps.
            </Text>
            <StyledButton
              onClick={() => {
                setDone(true)
              }}
            >
              Next step
            </StyledButton>
          </Stack>
        )}
      </SteppedListContainer.Step>
      <SteppedListContainer.Step
        stepNumber={2}
        subHeader="Second step"
        image={illustrationImage}
      >
        {nextStep => (
          <Stack gap={2} direction="column">
            Second step description
            <Stack gap={2} direction="row">
              <Button onClick={() => nextStep(true)}>Next step</Button>
              <Button onClick={() => nextStep(false)} variant="outlined">
                Skip
              </Button>
            </Stack>
          </Stack>
        )}
      </SteppedListContainer.Step>
      <SteppedListContainer.Step
        stepNumber={3}
        subHeader="Last step"
        image={illustrationImage}
      >
        {nextStep => (
          <Stack gap={2}>
            Second step description
            <Stack gap={2} direction="row">
              <Button onClick={() => nextStep(true)}>Validate and close</Button>
            </Stack>
          </Stack>
        )}
      </SteppedListContainer.Step>
    </SteppedListContainer>
  )
}

Template.args = {
  header: 'Header',
  hideTooltipText: 'To show again, click on the "show" button',
  hideButtonText: 'Hide',
  steps: ['Start', 'First step', 'Second step'],
}
