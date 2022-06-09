import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Stepper from '..'

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
        {Array.from(Array(5), (__, i) => (
          <Stepper.Step key={i}>{steps(i + 1)}</Stepper.Step>
        ))}
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
      <Stepper.Step>Step 1</Stepper.Step>
      <Stepper.Step>Step 2</Stepper.Step>
      <Stepper.Step>Step 3</Stepper.Step>
      <Stepper.Step>Step 4</Stepper.Step>
      <Stepper.Step>Step 5</Stepper.Step>
    </Stepper>
  ),
]
