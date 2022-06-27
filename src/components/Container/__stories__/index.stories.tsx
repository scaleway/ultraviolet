import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Container from '..'
import { Button } from '../../index'

export default {
  component: Container,
  title: 'Components/Container/Container',
} as Meta

const Template: Story<ComponentProps<typeof Container>> = args => (
  <Container {...args}>Hello</Container>
)

export const Default = Template.bind({})

export const Title = Template.bind({})
Title.parameters = {
  docs: {
    storyDescription:
      'You can specify `title` prop to add a title to the container.',
  },
}
Title.decorators = [
  () => <Container title="Hello there">General Kenobi</Container>,
]

export const RightTitle = Template.bind({})
RightTitle.decorators = [
  () => (
    <Container title="Hello" rightTitle="There">
      General Kenobi
    </Container>
  ),
]

export const SubTitle = Template.bind({})
SubTitle.decorators = [
  () => (
    <Container title="Hello there" subtitle="(To: General Grievous)">
      General Kenobi
    </Container>
  ),
]

export const CustomHeader = Template.bind({})
CustomHeader.parameters = {
  docs: {
    storyDescription:
      'Use `header` properties to add a component under title of your container. In this example we added a button.',
  },
}
CustomHeader.decorators = [
  () => (
    <Container
      title="Hello there"
      header={<Button size="small" icon="auto-fix" />}
    >
      General Kenobi
    </Container>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription:
      'Disabled properties will only disable children of the container. Title, sub-title and header will remain unchanged.',
  },
}
Disabled.decorators = [
  () => (
    <Container title="Hello there" disabled>
      General Kenobi
    </Container>
  ),
]

export const Small = Template.bind({})
Small.decorators = [
  () => (
    <Container title="Hello there" small>
      General Kenobi
    </Container>
  ),
]

export const Edition = Template.bind({})
Edition.decorators = [
  () => (
    <Container title="Hello there" edition>
      General Kenobi
    </Container>
  ),
]
