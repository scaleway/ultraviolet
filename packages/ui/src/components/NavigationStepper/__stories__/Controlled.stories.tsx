import { Story } from '@storybook/react'
import NavigationStepper from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import Button from '../../Button'

export const Controlled: Story = props => (
  <ControlValue value={1}>
    {({ value, onChange }) => (
      <>
        <NavigationStepper {...props} step={value}>
          <NavigationStepper.Step>
            Elit adipisicing anim aliquip velit.
          </NavigationStepper.Step>
          <NavigationStepper.Step>
            Excepteur sit et do cupidatat exercitation.
          </NavigationStepper.Step>
          <NavigationStepper.Step isLoading>
            Duis nisi id ipsum sint non aute ea sit est consectetur amet.
          </NavigationStepper.Step>
        </NavigationStepper>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Button
            onClick={() => onChange(value > 1 ? value - 1 : value)}
            disabled={value === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => onChange(value > 3 ? value : value + 1)}
            disabled={value > 3}
          >
            Next
          </Button>
        </div>
      </>
    )}
  </ControlValue>
)

Controlled.parameters = {
  docs: {
    storyDescription:
      'To make all steps checked you need to pass a step greater than your steps number.',
  },
}
