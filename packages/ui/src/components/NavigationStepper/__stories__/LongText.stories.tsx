import type { Story } from '@storybook/react'
import NavigationStepper from '..'

export const LongText: Story = props => (
  <NavigationStepper {...props} step={2}>
    <NavigationStepper.Step>
      Elit adipisicing anim aliquip velit.
    </NavigationStepper.Step>
    <NavigationStepper.Step>
      Excepteur sit et do cupidatat exercitation.
    </NavigationStepper.Step>
    <NavigationStepper.Step>
      Duis nisi id ipsum sint non aute ea sit est consectetur amet.
    </NavigationStepper.Step>
  </NavigationStepper>
)
