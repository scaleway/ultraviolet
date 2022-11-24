import { Story } from '@storybook/react'
import NavigationStepper from '..'

export const LoadingStep: Story = props => (
  <NavigationStepper {...props} step={2}>
    <NavigationStepper.Step isLoading>
      Elit adipisicing anim aliquip velit.
    </NavigationStepper.Step>
    <NavigationStepper.Step isLoading>
      Excepteur sit et do cupidatat exercitation.
    </NavigationStepper.Step>
    <NavigationStepper.Step isLoading>
      Duis nisi id ipsum sint non aute ea sit est consectetur amet.
    </NavigationStepper.Step>
  </NavigationStepper>
)

LoadingStep.parameters = {
  docs: {
    storyDescription:
      'You can put `isLoading` on a step to display an Loader on current step.',
  },
}
