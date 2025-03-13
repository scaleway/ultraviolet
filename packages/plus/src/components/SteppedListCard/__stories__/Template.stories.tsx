import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { blockStorageWire } from '@ultraviolet/illustrations/products/blockStorage'
import { Button, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SteppedListCard } from '../SteppedListCard'

const StyledImage = styled.img`
  filter: invert();
`
const StyledButton = styled(Button)`
  width: fit-content;
`
export const Template: StoryFn<
  ComponentProps<typeof SteppedListCard>
> = props => {
  const theme = useTheme()

  const illustrationImage =
    theme.theme === 'light' ? (
      <StyledImage src={blockStorageWire} width={200} alt="blockStorage" />
    ) : (
      <img src={blockStorageWire} width={200} alt="blockStorage" />
    )

  return (
    <SteppedListCard {...props}>
      <SteppedListCard.Step
        stepNumber={1}
        subHeader={
          <Text as="h3" variant="headingSmallStrong" sentiment="primary">
            Welcome aboard!
          </Text>
        }
        image={illustrationImage}
      >
        {nextStep => (
          <Stack gap={2} direction="column">
            <Text as="div" variant="body">
              We are thrilled to count you as a Scaleway user! We are looking
              forward to providing you with the very best experience. To order
              resources to get started with your project, we need you to
              complete a few more steps.
            </Text>
            <StyledButton
              onClick={() => {
                nextStep(true)
              }}
            >
              Next step
            </StyledButton>
          </Stack>
        )}
      </SteppedListCard.Step>
      <SteppedListCard.Step
        stepNumber={2}
        subHeader="Second step"
        image={illustrationImage}
      >
        {nextStep => (
          <Stack gap={2} direction="column">
            Second step description
            <Stack gap={2} direction="row">
              <Button onClick={() => nextStep(false)} variant="outlined">
                Skip
              </Button>
              <Button onClick={() => nextStep(true)}>Next step</Button>
            </Stack>
          </Stack>
        )}
      </SteppedListCard.Step>
      <SteppedListCard.Step
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
      </SteppedListCard.Step>
    </SteppedListCard>
  )
}

Template.args = {
  header: 'Header',
  hideTooltipText: 'To hide the content, click on the "hide" button',
  hideText: 'Hide',
  showText: 'Show',
  showTooltipText: 'To show, click on this button',
  steps: ['Start', 'First step', 'Second step'],
}
