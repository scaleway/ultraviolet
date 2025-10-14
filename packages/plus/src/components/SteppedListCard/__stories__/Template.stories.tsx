import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react-vite'
import { blockStorageWire } from '@ultraviolet/illustrations/products/blockStorage'
import { useTheme } from '@ultraviolet/themes'
import { Button, Snippet, Stack, Text } from '@ultraviolet/ui'
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
      <StyledImage alt="blockStorage" src={blockStorageWire} width={200} />
    ) : (
      <img alt="blockStorage" src={blockStorageWire} width={200} />
    )

  return (
    <SteppedListCard {...props}>
      <SteppedListCard.Step
        image={illustrationImage}
        stepNumber={1}
        subHeader={
          <Text as="h3" sentiment="primary" variant="headingSmallStrong">
            Welcome aboard!
          </Text>
        }
      >
        {nextStep => (
          <Stack direction="column" gap={2}>
            <Snippet {...props}>
              pnpm add @ultraviolet/ui; pnpm install; pnpm start; pnpm build;
              pnpm test:unit; pnpm test:visual; pnpm build:storybook;
            </Snippet>
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
        image={illustrationImage}
        stepNumber={2}
        subHeader="Second step"
      >
        {nextStep => (
          <Stack direction="column" gap={2}>
            Second step description
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
        image={illustrationImage}
        stepNumber={3}
        subHeader="Last step"
      >
        {nextStep => (
          <Stack gap={2}>
            Second step description
            <Stack direction="row" gap={2}>
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
  hideText: 'Hide',
  hideTooltipText: 'To hide the content, click on the "hide" button',
  showText: 'Show',
  showTooltipText: 'To show, click on this button',
  steps: ['Start', 'First step', 'Second step'],
}
