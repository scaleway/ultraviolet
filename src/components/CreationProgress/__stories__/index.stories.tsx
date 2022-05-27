import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import CreationProgress from '..'

export default {
  component: CreationProgress,
  title: 'Components/Navigation/CreationProgress',
} as Meta

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const steps = (count: number) => `Step ${count}`
const Template: Story<ComponentProps<typeof CreationProgress>> = args => (
  <Container>
    {Array.from(Array(5), (_, index) => (
      <CreationProgress selected={index} {...args}>
        {Array.from(Array(5), (__, i) => (
          <CreationProgress.Step key={i}>{steps(i + 1)}</CreationProgress.Step>
        ))}
      </CreationProgress>
    ))}
  </Container>
)

export const Default = Template.bind({})

export const WithoutAnimation = Template.bind({})
WithoutAnimation.parameters = {
  docs: {
    storyDescription:
      'CreationProgress Component without animation (static) by passing `animated={false}` ',
  },
}
WithoutAnimation.decorators = [
  () => (
    <CreationProgress selected={1} animated={false}>
      <CreationProgress.Step>Step 1</CreationProgress.Step>
      <CreationProgress.Step>Step 2</CreationProgress.Step>
      <CreationProgress.Step>Step 3</CreationProgress.Step>
      <CreationProgress.Step>Step 4</CreationProgress.Step>
      <CreationProgress.Step>Step 5</CreationProgress.Step>
    </CreationProgress>
  ),
]
