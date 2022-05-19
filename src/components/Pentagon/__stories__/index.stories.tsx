import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Pentagon from '..'
import { colors } from '../../../theme'
import { FlexBox } from '../../index'

export default {
  component: Pentagon,
  parameters: {
    docs: {
      description: {
        component: 'Simple pentagon with different sizes and colors.',
      },
    },
  },
  title: 'Components/Data Display/Pentagon',
} as Meta

const Template: Story<ComponentProps<typeof Pentagon>> = args => (
  <Pentagon {...args} />
)

export const Default = Template.bind({})

export const Color = Template.bind({})
Color.decorators = [
  () => (
    <FlexBox inline>
      <Pentagon color={colors.info.background} />
      <Pentagon color={colors.success.background} />
      <Pentagon color={colors.warning.background} />
      <Pentagon color={colors.danger.background} />
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
