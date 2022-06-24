import { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { ComponentProps } from 'react'
import TooltipIcon from '..'
import FlexBox from '../../FlexBox'

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
    loki: { skip: true },
  },
  title: 'Components/Feedback/TooltipIcon',
} as Meta

const Template: Story<ComponentProps<typeof TooltipIcon>> = args => (
  <TooltipIcon {...args} />
)

export const Default = Template.bind({})
Default.decorators = [
  DefaultStory => (
    <FlexBox>
      <DefaultStory />
    </FlexBox>
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
    <FlexBox>
      <TooltipIcon color="primary" tooltip="Scaleway is great" />
    </FlexBox>
    <FlexBox>
      <TooltipIcon color="red" tooltip="Pay attention" />
    </FlexBox>
    <FlexBox>
      <TooltipIcon color="green" tooltip="Go ahead" />
    </FlexBox>
  </>
)

export const Sizes: Story = () => (
  <>
    <FlexBox>
      <TooltipIcon size={10} tooltip="I'm Joe" />
    </FlexBox>
    <FlexBox>
      <TooltipIcon size={30} tooltip="I'm Jack" />
    </FlexBox>
    <FlexBox>
      <TooltipIcon size={40} tooltip="I'm Averell" />
    </FlexBox>
  </>
)
