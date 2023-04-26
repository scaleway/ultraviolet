import type { Meta, Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import type { Sizes as SizesType } from '..'
import { StepList } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export default {
  component: StepList,
  parameters: {
    docs: {
      description: {
        component: 'Make a list with sub components in it.',
      },
    },
    experimental: true,
  },
  title: 'Components/Data Display/StepList',
} as Meta

const Template: Story<ComponentProps<typeof StepList>> = args => (
  <StepList {...args}>
    <StepList.Item bulletText="1">First</StepList.Item>
    <StepList.Item bulletText="2">Second</StepList.Item>
    <StepList.Item bulletText="3">Third</StepList.Item>
  </StepList>
)

export const Default = Template.bind({})

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    story: {
      description: 'Set `size` using size property.',
    },
  },
}
Sizes.decorators = [
  () => (
    <StepList>
      {['small', 'medium'].map((size, index) => (
        <StepList.Item
          bulletText={(index + 1).toString()}
          size={size as SizesType}
        >
          {size}
        </StepList.Item>
      ))}
    </StepList>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    story: {
      description: 'Set a disable state using `disabled` property.',
    },
  },
}
Disabled.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletText="A" disabled>
        disabled
      </StepList.Item>
      <StepList.Item bulletText="A">active</StepList.Item>
    </StepList>
  ),
]

export const Variant = Template.bind({})
Variant.parameters = {
  docs: {
    story: {
      description: 'Set a bullet variant state using `variant` property.',
    },
  },
}
Variant.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletText="A" variant="success">
        success
      </StepList.Item>
      <StepList.Item bulletText="A">default</StepList.Item>
    </StepList>
  ),
]

export const BulletIcon = Template.bind({})
BulletIcon.parameters = {
  docs: {
    story: {
      description: 'Set a bullet icon state using `bulletIcon` property.',
    },
  },
}
BulletIcon.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletIcon="check" variant="success">
        check success
      </StepList.Item>
      <StepList.Item bulletIcon="check">check default</StepList.Item>
    </StepList>
  ),
]

export const ComplexChild = Template.bind({})
BulletIcon.parameters = {
  docs: {
    story: {
      description: 'With complex child bullet will stay aligned',
    },
  },
}
ComplexChild.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletIcon="check" variant="success">
        <Stack gap={1}>
          <Text as="h4" variant="headingSmall">
            Lorem ipsum
          </Text>
          <Text as="p" variant="body">
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum
          </Text>
        </Stack>
      </StepList.Item>
      <StepList.Item bulletIcon="check">
        <Stack gap={1}>
          <Text as="h4" variant="headingSmall">
            Sed ut perspiciatis
          </Text>
          <Text as="p" variant="body">
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur
          </Text>
        </Stack>
      </StepList.Item>
    </StepList>
  ),
]
