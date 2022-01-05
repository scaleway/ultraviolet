import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import VolumeSize from '..'

export default {
  component: VolumeSize,
  title: 'Components/Data Display/VolumeSize',
} as Meta

const Template: Story<ComponentProps<typeof VolumeSize>> = ({
  maxSize = 30,
  minSize = 10,
  value = 20,
  unit = 'KB',
  ...props
}) => (
  <VolumeSize
    maxSize={maxSize}
    minSize={minSize}
    value={value}
    unit={unit}
    {...props}
  />
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: `A beautiful component to show a bar with limits`,
    },
  },
}

export const MinMaxSize = Template.bind({})
MinMaxSize.parameters = {
  docs: {
    description: {
      story: 'You can set max and min size with `maxSize` and `minSize`.',
    },
  },
}
MinMaxSize.args = { maxSize: 70, minSize: 30 }

export const SizeTooSmall = Template.bind({})
SizeTooSmall.args = { maxSize: 70, minSize: 30, value: 20 }

export const SizeTooLarge = Template.bind({})
SizeTooLarge.args = { maxSize: 70, minSize: 30, value: 80 }

export const MinSizeOnly = Template.bind({})
MinSizeOnly.args = { minSize: 30, value: 80 }

export const MinSizeOnlyAndTooSmall = Template.bind({})
MinSizeOnlyAndTooSmall.args = { minSize: 30, value: 25 }

export const Sizes: Story = () => (
  <>
    {(
      ['xsmall', 'small', 'medium', 'large', 'xlarge'] as ComponentProps<
        typeof VolumeSize
      >['size'][]
    ).map(size => (
      <div key={size} style={{ marginTop: '8px' }}>
        {size}:
        <VolumeSize minSize={30} unit="KB" value={30} size={size} />
      </div>
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    description: {
      story: 'You can choose the component size by using `size` prop.',
    },
  },
}
