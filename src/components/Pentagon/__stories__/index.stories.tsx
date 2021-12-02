import { Meta, Story } from '@storybook/react'
import React from 'react'
import Pentagon, { PentagonProps } from '..'
import { colorsDeprecated } from '../../../theme'
import { FlexBox } from '../../index'

export default {
  component: Pentagon,
  parameters: {
    docs: {
      description: {
        component: 'Simple pentagon with different sizes and colorsDeprecated.',
      },
    },
  },
  title: 'Components/Data Display/Pentagon',
} as Meta

const Template: Story<PentagonProps> = args => <Pentagon {...args} />

export const Default = Template.bind({})

export const Color = Template.bind({})
Color.decorators = [
  () => (
    <FlexBox inline>
      <Pentagon color={colorsDeprecated.zumthor} />
      <Pentagon color={colorsDeprecated.foam} />
      <Pentagon color={colorsDeprecated.serenade} />
      <Pentagon color={colorsDeprecated.pippin} />
    </FlexBox>
  ),
]

export const Size = Template.bind({})
Size.decorators = [
  () => (
    <FlexBox inline>
      <Pentagon size="50px" />
      <Pentagon size="100px" />
      <Pentagon size="150px" />
      <Pentagon size="200px" />
    </FlexBox>
  ),
]
