import { Meta, Story } from '@storybook/react'
import React, { ChangeEvent } from 'react'
import Switch, { SwitchProps } from '..'
import { Box, Icon } from '../..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  args: {
    checked: false,
    disabled: false,
    labeled: false,
    offLabel: 'NO',
    onLabel: 'YES',
    size: 'small',
    variant: 'primary',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'checked',
      name: 'checked',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'disabled',
      name: 'disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    labeled: {
      control: { type: 'select' },
      defaultValue: false,
      description: 'labeled',
      name: 'labeled',
      options: [false, true, 'left', 'right', 'inside'],
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean | left | right | inside' },
      },
      type: { name: 'select' },
    },
    offLabel: {
      defaultValue: 'NO',
      name: 'offLabel',
      table: {
        defaultValue: { summary: 'NO' },
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    onLabel: {
      defaultValue: 'YES',
      name: 'offLabel',
      table: {
        defaultValue: { summary: 'YES' },
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    size: {
      control: {
        type: 'select',
      },
      defaultValue: 'medium',
      name: 'size',
      options: ['small', 'medium'],
      table: {
        defaultValue: { summary: 'small' },
        type: { required: true, summary: 'select' },
      },
    },
    variant: {
      description: `you have the possibility between "primary | success"`,
      name: 'variant',
      options: ['primary', 'success'],
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'select' },
      },
    },
  },
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'Switch button used to give an on / off state into a form.',
      },
    },
  },
  title: 'Components/Data Entry/Switch',
} as Meta

const Template: Story<SwitchProps> = args => <Switch {...args} />

export const Default = Template.bind({})


export const CustomLabelRender = Template.bind({})
CustomLabelRender.parameters = {
  docs: {
    story: {
      description:
        'If you choose to place label near the Switch component with `labeled` you can set a custom element for the label with the `onLabel` and `offLabel` props.',
    },
  },
}
CustomLabelRender.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue<boolean> value>
          {({ value, onChange }) => (
            <Switch
              name="switch-label-left"
              labeled
              onLabel={<Icon size={24} name="check-circle-outline" />}
              offLabel={<Icon size={24} name="close-circle-outline" />}
              variant="primary"
              checked={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.checked)
              }
            />
          )}
        </ControlValue>
      </div>
      <ControlValue<boolean> value>
        {({ value, onChange }) => (
          <Switch
            name="switch-label-left"
            labeled="left"
            onLabel={
              <Box
                width={100}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <span>Enabled</span>&nbsp;
                <Icon size={24} name="check-circle-outline" />
              </Box>
            }
            offLabel={
              <Box
                width={100}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <span>Disabled</span>&nbsp;
                <Icon size={24} name="close-circle-outline" />
              </Box>
            }
            variant="primary"
            checked={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.checked)
            }
          />
        )}
      </ControlValue>
    </>
  ),
]
