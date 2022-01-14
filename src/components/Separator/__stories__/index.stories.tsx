import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Separator from '..'
import FlexBox from '../../FlexBox'

export default {
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: 'A horizontal or vertical separator.',
      },
    },
  },
  title: 'Components/Data Display/Separator',
} as Meta

const Template: Story<ComponentProps<typeof Separator>> = args => (
  <Separator {...args} />
)

export const Default = Template.bind({})

export const Thickness = Template.bind({})

Thickness.args = {
  thickness: 3,
}

Thickness.parameters = {
  docs: {
    description: {
      story: 'Set thickness using `thickness` prop.',
    },
  },
}

export const Direction: Story<ComponentProps<typeof Separator>> = args => (
  <FlexBox inline>
    <div>left part</div>
    <Separator {...args} />
    <div>right part</div>
  </FlexBox>
)

Direction.args = {
  direction: 'vertical',
  mx: 1,
}

Direction.parameters = {
  docs: {
    description: {
      story: 'Set direction using `direction` prop.',
    },
  },
}

export const Color: Story<ComponentProps<typeof Separator>> = Template.bind({})

Color.args = {
  color: 'primary',
}

Color.parameters = {
  docs: {
    description: {
      story: 'Set color using `color` prop.',
    },
  },
}

export const Icon: Story<ComponentProps<typeof Separator>> = ({ icon }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div>horizontal start</div>
      <Separator icon={icon} />
      <div>horizontal end</div>
    </div>
    <div style={{ alignItems: 'center', display: 'flex', gap: 2 }}>
      <div>vertical start</div>
      <Separator direction="vertical" icon={icon} />
      <div>vertical end</div>
    </div>
  </div>
)

Icon.args = {
  icon: 'ray-top-arrow',
}

Icon.parameters = {
  docs: {
    description: {
      story: 'Set icon using `icon` prop.',
    },
  },
}
