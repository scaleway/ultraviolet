import { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { ComponentProps } from 'react'
import Tooltip from '..'

export default {
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'A simple tooltip that will create dynamically a portal into the dom when children is hovered.',
      },
      source: {
        excludeDecorators: true,
      },
    },
    loki: { skip: true },
  },
  title: 'Components/Feedback/Tooltip',
} as Meta

const Template: Story<ComponentProps<typeof Tooltip>> = args => (
  <div style={{ alignItems: 'center', display: 'flex', height: '100px' }}>
    <Tooltip {...args}>Hover Me</Tooltip>
  </div>
)

export const Default = Template.bind({})
Default.args = {
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
        flexDirection: 'column',
        gap: 38,
        height: '250px',
        justifyContent: 'center',
      }}
    >
      {['top', 'bottom', 'left', 'right'].map(placement => (
        <Tooltip
          key={placement}
          placement={placement as ComponentProps<typeof Tooltip>['placement']}
          text="Hello there"
        >
          <p>Placement on {placement}</p>
        </Tooltip>
      ))}
    </div>
  ),
]

export const MaxWidth = Template.bind({})
MaxWidth.args = {
  maxWidth: 200,
  text: 'This is a longer tooltip with a max width set to 200px',
}
