import { Meta, Story } from '@storybook/react'
import React from 'react'
import ProgressionButton, { ProgressionButtonProps } from '..'

export default {
  component: ProgressionButton,
  title: 'Components/Button/ProgressionButton',
} as Meta

const Template: Story<ProgressionButtonProps> = args => (
  <ProgressionButton height={40} {...args}>
    Progressing...
  </ProgressionButton>
)

export const Default = Template.bind({})

export const Custom = Template.bind({})
Custom.parameters = {
  docs: {
    storyDescription: `The \`creation\` props indicates the starting time of the progression, by
default it's the time of when the object is mounted.

The \`duration\` props indicates an approximation of the progression duration in
seconds, by default it's \`120\`

You can chose the color of the Progression using the \`color\` props`,
  },
}
Custom.decorators = [
  () => (
    <>
      <ProgressionButton
        creation={new Date(new Date().setSeconds(new Date().getSeconds() + 10))}
        duration={20}
        color="beta"
        height={40}
        mb={2}
      >
        I&apos;m going to start in 10 seconds and take 20 seconds to complete
      </ProgressionButton>
      <ProgressionButton
        creation={new Date(new Date().setSeconds(new Date().getSeconds() - 60))}
        duration={90}
        color="primary"
        height={40}
        mb={2}
      >
        I was supposed to start one minute ago and take 90 seconds (meaning I
        only have 30s left and start at 66%)
      </ProgressionButton>
      <ProgressionButton
        creation={new Date(new Date().setSeconds(new Date().getSeconds() - 90))}
        duration={90}
        color="info"
        height={40}
      >
        I was supposed to start 90 seconds ago and take 90 seconds (meaning
        I&apos;m already done)
      </ProgressionButton>
    </>
  ),
]
