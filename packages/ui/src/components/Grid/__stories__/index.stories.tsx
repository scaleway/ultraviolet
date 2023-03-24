import type { Meta, Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import Row from '../Row'
import ColWithBackground from './ColWithBackground'

export default {
  parameters: {
    deprecated: true,
    deprecatedReason:
      'This component is deprecated please use Stack/RowV2 combo instead.',
    docs: {
      description: {
        component:
          'These three component are built to organize your content \n\n- `Row` is a flex container that allow you to create a row with some margin left and right.\n\n- `Col` allow you to create a col where you can place your content.',
      },
    },
  },
  title: 'Components/Layout/Grid',
} as Meta

const Template: Story<ComponentProps<typeof Row>> = () => (
  <Row>
    <ColWithBackground>One</ColWithBackground>
    <ColWithBackground>Two</ColWithBackground>
    <ColWithBackground>Three</ColWithBackground>
  </Row>
)

export const Default = Template.bind({})

export const Gutter: Story = () => (
  <div>
    <Row>
      <ColWithBackground>One</ColWithBackground>
      <ColWithBackground>Two</ColWithBackground>
      <ColWithBackground>Three</ColWithBackground>
    </Row>
    <Row gutter={2}>
      <ColWithBackground>One</ColWithBackground>
      <ColWithBackground>Two</ColWithBackground>
      <ColWithBackground>Three</ColWithBackground>
    </Row>
    <Row>
      <ColWithBackground gutter={2}>One</ColWithBackground>
      <ColWithBackground>Two</ColWithBackground>
      <ColWithBackground>Three</ColWithBackground>
    </Row>
  </div>
)
Gutter.args = { fluid: true }
Gutter.parameters = {
  docs: {
    description: {
      story:
        'If you pass the `gutter` prop the component will have more padding and margin',
    },
  },
}

export const Responsive: Story = () => (
  <div>
    <Row>
      <ColWithBackground
        xsmall={12}
        medium={8}
      >{`xsmall={12} medium={8}`}</ColWithBackground>
      <ColWithBackground
        xsmall={6}
        medium={4}
      >{`xsmall={6} medium={4}`}</ColWithBackground>
    </Row>
    <Row>
      <ColWithBackground xsmall={6} medium={4}>
        {`xsmall={6} medium={4}`}
      </ColWithBackground>
      <ColWithBackground xsmall={6} medium={4}>
        {`xsmall={6} medium={4}`}
      </ColWithBackground>
      <ColWithBackground xsmall={6} medium={4}>
        {`xsmall={6} medium={4}`}
      </ColWithBackground>
    </Row>
    <Row>
      <ColWithBackground xsmall={6}>{`xsmall={6}`}</ColWithBackground>
      <ColWithBackground xsmall={6}>{`xsmall={6}`}</ColWithBackground>
    </Row>
  </div>
)

Responsive.parameters = {
  docs: {
    description: {
      story: 'A complex responsive example',
    },
  },
}
