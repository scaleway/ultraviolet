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
        {Array.from(Array(5), (__, i) => steps(i + 1))}
      </Stepper>
    ))}
  </Container>
)

export const Default = Template.bind({})

export const WithAnimation = Template.bind({})
WithAnimation.parameters = {
  docs: {
    storyDescription:
      'Stepper Component with animation by passing `animated={true}` ',
  },
}
WithAnimation.decorators = [
  () => (
    <Stepper selected={1} animated>
      <span>Step 1</span>
      <span>Step 2</span>
      <span>Step 3</span>
      <span>Step 4</span>
      <span>Step 5</span>
    </Stepper>
  ),
]
