import { ComponentStory } from '@storybook/react'
import NavigationStepper from '..'

export const Template: ComponentStory<typeof NavigationStepper> = props => (
  <NavigationStepper {...props}>
    <NavigationStepper.Step>First</NavigationStepper.Step>
    <NavigationStepper.Step>Second</NavigationStepper.Step>
    <NavigationStepper.Step>Third</NavigationStepper.Step>
  </NavigationStepper>
)
