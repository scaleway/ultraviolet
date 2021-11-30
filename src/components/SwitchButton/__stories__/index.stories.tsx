import { Meta, Story } from '@storybook/react'
import React, { ChangeEvent } from 'react'
import SwitchButton, { SwitchButtonProps } from '..'
import { Col, Grid, Row } from '../..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  args: {
    checked: false,
    children: 'This is a children',
    disabled: false,
    name: 'default',
    onChange: (value: any) => console.log(value),
    tooltip: undefined,
    value: 'a',
    variant: undefined,
  },
  argTypes: {
    children: {
      defaultValue: 'This is a children',
      name: 'children',
      table: {
        defaultValue: { summary: 'This is a children' },
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    variant: {
      description: `you have the possibility between "undefined | segment"`,
      name: 'variant',
      options: [undefined, 'segment'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'select' },
      },
    },
  },
  component: SwitchButton,
  parameters: {
    docs: {
      description: {
        component:
          'SwitchButton is an advanced version of Switch component made out of two different buttons.',
      },
    },
  },
  title: 'Components/Data Entry/SwitchButton',
} as Meta

const Template: Story<SwitchButtonProps> = args => <SwitchButton {...args} />

Template.args = {
  checked: false,
  children: 'This is a children',
  disabled: false,
  name: 'default',
  onChange: value => console.log(value),
  tooltip: undefined,
  value: 'a',
  variant: undefined,
}

export const Default = Template.bind({})

const DefaultShowcase: Story<{
  controlValue: string | number
  variant?: 'segment'
  disabled: boolean
}> = ({ controlValue = 'a', disabled = false, variant }) => (
  <ControlValue value={controlValue}>
    {({ value, onChange }) => (
      <Grid m={2}>
        <Row>
          <Col pr={0}>
            <Row>
              <Col xsmall={4} pr={1}>
                <SwitchButton
                  name="switch"
                  value="a"
                  disabled={disabled}
                  variant={variant}
                  checked={value === 'a'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(e.currentTarget.value)
                  }
                >
                  This is A
                </SwitchButton>
              </Col>
              <Col xsmall={4} pl={1}>
                <SwitchButton
                  name="switch"
                  value="b"
                  disabled={disabled}
                  variant={variant}
                  checked={value === 'b'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(e.currentTarget.value)
                  }
                >
                  This is B
                </SwitchButton>
              </Col>
              <Col xsmall={4} pl={1}>
                <SwitchButton
                  name="switch"
                  value="c"
                  disabled={disabled}
                  variant={variant}
                  checked={value === 'c'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(e.currentTarget.value)
                  }
                >
                  This is C
                </SwitchButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )}
  </ControlValue>
)

export const Showcase = DefaultShowcase.bind({})

Showcase.parameters = {
  docs: {
    description: {
      story: 'This is a showcase of SwitchButton with two SwitchButton',
    },
  },
}
