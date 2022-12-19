import type { Story } from '@storybook/react'
import { useState } from 'react'
import NavigationStepper from '..'
import Button from '../../Button'

export const Controlled: Story = () => {
  const [value, setValue] = useState(1)

  return (
    <>
      <NavigationStepper step={value}>
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
          onClick={() => setValue(value > 1 ? value - 1 : value)}
          disabled={value === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setValue(value > 3 ? value : value + 1)}
          disabled={value > 3}
        >
          Next
        </Button>
      </div>
    </>
  )
}

Controlled.parameters = {
  docs: {
    storyDescription:
      'To make all steps checked you need to pass a step greater than your steps number.',
  },
}
