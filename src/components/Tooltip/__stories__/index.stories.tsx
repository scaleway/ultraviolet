import { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { ComponentProps } from 'react'
import Tooltip from '..'

export default {
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'Displays a tooltip on mouse hover.',
      },
      source: {
        excludeDecorators: true,
      },
    },
  },
  title: 'Components/Feedback/Tooltip',
} as Meta

const Template: Story<ComponentProps<typeof Tooltip>> = args => (
  <div style={{ alignItems: 'center', display: 'flex', height: '150px' }}>
    <Tooltip {...args}>
      <p>Oui bonjour je suis un test pour verifier que ça marche</p>
    </Tooltip>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  children: 'Hover Me',
  text: 'Hello there',
}
Default.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const hoverElement = canvas.getByText('Hover Me')
  if (hoverElement) {
    userEvent.click(hoverElement)
  }
}

export const Placement = Template.bind({})
Placement.decorators = [
  () => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '250px',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 38,
      }}
    >
      {['top', 'bottom', 'left', 'right'].map(placement => (
        <Tooltip
          key={placement}
          placement={placement}
          text="Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there "
        >
          <p>Placement on {placement}</p>
        </Tooltip>
      ))}
    </div>
  ),
]
