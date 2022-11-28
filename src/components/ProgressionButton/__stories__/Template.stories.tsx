import { ComponentStory, Story } from '@storybook/react'
import ProgressionButton from '..'

export const Template: Story<
  ComponentStory<typeof ProgressionButton>
> = props => <ProgressionButton {...props}>Progressing...</ProgressionButton>
