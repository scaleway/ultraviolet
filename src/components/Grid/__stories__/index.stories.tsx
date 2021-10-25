import { Meta, Story } from '@storybook/react'
import React from 'react'
import Grid, { GridProps } from '../Grid'
import Row from '../Row'
import ColWithBackground from './ColWithBackground'

export default {
  component: Grid,
  title: 'Components/Foundation/Grid',
} as Meta

const Template: Story<GridProps> = args => <Grid {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription:
      'These three component are built to organize your content \n\n- `Grid` allow you to create a container with some padding.\n\n- `Row` is a flex container that allow you to create a row with some margin left and right.\n\n- `Col` allow you to create a col where you can place your content.',
  },
}
Default.decorators = [
  () => (
    <Grid>
      <Row>
        <ColWithBackground>One</ColWithBackground>
        <ColWithBackground>Two</ColWithBackground>
        <ColWithBackground>Three</ColWithBackground>
      </Row>
    </Grid>
  ),
]

export const Fluid = Template.bind({})
Fluid.parameters = {
  docs: {
    storyDescription:
      'If you pass the `fluid` prop the grid will take the full width of its container',
  },
}
Fluid.decorators = [
  () => (
    <Grid fluid>
      <Row>
        <ColWithBackground>One</ColWithBackground>
        <ColWithBackground>Two</ColWithBackground>
        <ColWithBackground>Three</ColWithBackground>
      </Row>
    </Grid>
  ),
]

export const Gutter = Template.bind({})
Gutter.parameters = {
  docs: {
    storyDescription:
      'If you pass the `gutter` prop the component will have more padding and margin',
  },
}
Gutter.decorators = [
  () => (
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
  ),
]

export const Responsive = Template.bind({})
Responsive.parameters = {
  docs: {
    storyDescription: 'A complex responsive example',
  },
}
Responsive.decorators = [
  () => (
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
  ),
]
