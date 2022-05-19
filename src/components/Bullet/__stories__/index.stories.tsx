import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Bullet, { bulletSizes, bulletVariants } from '..'

export default {
  component: Bullet,
  title: 'Components/Data Display/Bullet',
} as Meta

const Template: Story<ComponentProps<typeof Bullet>> = args => (
  <Bullet {...args} />
)

export const Default = Template.bind({})
Default.args = {
  text: '1',
}

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription: 'Set `size` using size property.',
  },
}
Sizes.decorators = [
  () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      {bulletSizes.map(size => (
        <div key={size}>
          <Bullet size={size} text="1" />
        </div>
      ))}
    </div>
  ),
]

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}
Variants.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {bulletVariants.map(variant => (
        <Bullet key={variant} variant={variant} text="1" />
      ))}
    </div>
  ),
]

export const Icons = Template.bind({})
Icons.parameters = {
  docs: {
    storyDescription:
      'Set `icon` using icon property (variant and size props affect icon)',
  },
}
Icons.decorators = [
  () => (
    <div style={{ alignItems: 'flex-end', display: 'flex', gap: 16 }}>
      <Bullet icon="check" />
      <Bullet icon="check" variant="success" />
      <Bullet icon="check" variant="success" size="small" />
    </div>
  ),
]

export const Text = Template.bind({})
Text.parameters = {
  docs: {
    storyDescription:
      'Set `text` using text property (variant and size props affect text)',
  },
}
Text.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {['1', '2', '3'].map(val => (
        <Bullet key={val} text={val} />
      ))}
    </div>
  ),
]

export const Tooltip = Template.bind({})
Tooltip.parameters = {
  docs: {
    storyDescription: 'Add a `tooltip` using tooltip property',
  },
}
Tooltip.decorators = [
  () => (
    <div style={{ display: 'flex' }}>
      <Bullet text="1" tooltip="tooltip text" />
    </div>
  ),
]
