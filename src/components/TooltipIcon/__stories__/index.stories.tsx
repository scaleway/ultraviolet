import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { ComponentProps } from 'react'
import TooltipIcon from '..'

const StyledContainer = styled.div`
  display: flex;
`

export default {
  component: TooltipIcon,
  parameters: {
    docs: {
      description: {
        component: 'An icon with tooltip when hovered.',
      },
      source: {
        excludeDecorators: true,
      },
    },
  },
  title: 'Components/Feedback/TooltipIcon',
} as Meta

const Template: Story<ComponentProps<typeof TooltipIcon>> = args => (
  <TooltipIcon {...args} />
)

export const Default = Template.bind({})
Default.decorators = [
  DefaultStory => (
    <StyledContainer>
      <DefaultStory />
    </StyledContainer>
  ),
]
Default.args = {
  tooltip: 'Hello there',
}
Default.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const hoverElement = canvas.getByLabelText('help-circle-outline')
  if (hoverElement) {
    userEvent.click(hoverElement)
  }
}

export const Colors: Story = () => (
  <>
    <StyledContainer>
      <TooltipIcon color="primary" tooltip="Scaleway is great" />
    </StyledContainer>
    <StyledContainer>
      <TooltipIcon color="red" tooltip="Pay attention" />
    </StyledContainer>
    <StyledContainer>
      <TooltipIcon color="green" tooltip="Go ahead" />
    </StyledContainer>
  </>
)

export const Sizes: Story = () => (
  <>
    <StyledContainer>
      <TooltipIcon size={10} tooltip="I'm Joe" />
    </StyledContainer>
    <StyledContainer>
      <TooltipIcon size={30} tooltip="I'm Jack" />
    </StyledContainer>
    <StyledContainer>
      <TooltipIcon size={40} tooltip="I'm Averell" />
    </StyledContainer>
  </>
)
