import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import NavigationStepper, { Step } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import Button from '../../Button'

export default {
  component: NavigationStepper,
  parameters: {
    docs: {
      description: {
        component: 'NavigationStepper display a navigation with steps',
      },
    },
  },
  subcomponents: { Step },
  title: 'Components/Navigation/NavigationStepper',
} as Meta

const Template: Story<ComponentProps<typeof NavigationStepper>> = args => (
  <NavigationStepper {...args}>
    <NavigationStepper.Step>First</NavigationStepper.Step>
    <NavigationStepper.Step>Second</NavigationStepper.Step>
    <NavigationStepper.Step>Third</NavigationStepper.Step>
  </NavigationStepper>
)

export const Default = Template.bind({})

export const LongText = Template.bind({})
LongText.decorators = [
  () => (
    <NavigationStepper step={2}>
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
  ),
]

export const LoadingStep = Template.bind({})
LoadingStep.parameters = {
  docs: {
    storyDescription:
      'You can put `isLoading` on a step to display an ActivityIndicator on current step.',
  },
}
LoadingStep.decorators = [
  () => (
    <NavigationStepper step={2}>
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
  ),
]

export const Controlled = Template.bind({})
Controlled.parameters = {
  docs: {
    storyDescription:
      'To make all steps checked you need to pass a step greater than your steps number.',
  },
}
Controlled.decorators = [
  () => (
    <ControlValue value={1}>
      {({ value, onChange }) => (
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
  ),
]

export const Condensed = Template.bind({})
Condensed.decorators = [
  () => (
    <ControlValue value={1}>
      {({ value, onChange }) => (
        <>
          <NavigationStepper condensed step={value}>
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
  ),
]
