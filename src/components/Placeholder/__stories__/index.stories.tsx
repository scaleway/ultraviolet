import { Meta, Story } from '@storybook/react'
import React from 'react'
import Placeholder, { PlaceholderProps, variants } from '..'
import Typography from '../../Typography'

export default {
  component: Placeholder,
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder will display empty blocks with animation. It can be used for loading screen or loading components.',
      },
    },
  },
  title: 'Components/Data Display/Placeholder',
} as Meta

const Template: Story<PlaceholderProps> = args => <Placeholder {...args} />

export const Default = Template.bind({})

export const Box = Template.bind({})
Box.decorators = [
  () => (
    <Placeholder
      display="flex"
      height={130}
      width={180}
      length={4}
      variant="box"
    />
  ),
]

export const Variants = Template.bind({})
Variants.decorators = [
  () => (
    <>
      {Object.keys(variants)
        .filter(variant => variant !== 'box')
        .map(variant => (
          <div key={variant}>
            <Typography mb={2}>{variant}</Typography>
            <Placeholder key={variant} variant={variant} mr={2} mb={2}>
              {variant}
            </Placeholder>
          </div>
        ))}
    </>
  ),
]
