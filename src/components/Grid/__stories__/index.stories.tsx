import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Grid from '../Grid'
import Row from '../Row'
import ColWithBackground from './ColWithBackground'

export default {
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          'These three component are built to organize your content \n\n- `Grid` allow you to create a container with some padding.\n\n- `Row` is a flex container that allow you to create a row with some margin left and right.\n\n- `Col` allow you to create a col where you can place your content.',
      },
    },
  },
  title: 'Components/Foundation/Grid',
} as Meta

const Template: Story<ComponentProps<typeof Grid>> = args => (
  <Grid {...args}>
    <Row>
      <ColWithBackground>One</ColWithBackground>
      <ColWithBackground>Two</ColWithBackground>
      <ColWithBackground>Three</ColWithBackground>
    </Row>
  </Grid>
)

export const Default = Template.bind({})

export const Fluid = Template.bind({})
Fluid.args = { fluid: true }
Fluid.parameters = {
  docs: {
    description: {
      story:
        'If you pass the `fluid` prop the grid will take the full width of its container',
    },
  },
}

export const Gutter: Story = () => (
  <Grid fluid gutter={2}>
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
  </Grid>
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
  <Grid>
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
  </Grid>
)

Responsive.parameters = {
  docs: {
    description: {
      story: 'A complex responsive example',
    },
  },
}
