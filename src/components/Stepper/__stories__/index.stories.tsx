import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Stepper from '..'
import Typography from '../../Typography'

export default {
  component: Stepper,
  title: 'Components/Navigation/Stepper',
} as Meta

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const steps = (count: number) => `Step ${count}`
const Template: Story<ComponentProps<typeof Stepper>> = args => (
  <Container>
    {Array.from(Array(5), (_, index) => (
      <Stepper selected={index} {...args}>
        {Array.from(Array(5), (__, i) => steps(i + 1))}
      </Stepper>
    ))}
  </Container>
)

export const Default = Template.bind({})

export const WithoutAnimation = Template.bind({})
WithoutAnimation.parameters = {
  docs: {
    storyDescription:
      'Stepper Component without animation (static) by passing `animated={false}` ',
  },
}
WithoutAnimation.decorators = [
  () => (
    <Stepper selected={1} animated={false}>
      <Typography>Step 1</Typography>
      <Typography>Step 2</Typography>
      <Typography>Step 3</Typography>
      <Typography>Step 4</Typography>
      <Typography>Step 5</Typography>
    </Stepper>
  ),
]
