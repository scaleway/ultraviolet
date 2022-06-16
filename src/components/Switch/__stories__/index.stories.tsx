import { Meta, Story } from '@storybook/react'
import {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import Switch from '..'
import { Icon } from '../..'
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
      type: { name: 'string' },
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

const Template: Story<ComponentProps<typeof Switch>> = ({
  checked,
  ...args
}) => {
  const [value, setValue] = useState(checked)

  useEffect(() => {
    setValue(checked)
  }, [checked])

  return (
    <Switch
      {...args}
      name="switch"
      checked={value}
      variant="success"
      onChange={event => setValue(event.target.checked)}
    />
  )
}

export const Default = Template.bind({})

const LabelContainer = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
    }}
  >
    {children}
  </div>
)

export const CustomLabelRender: Story = () => (
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
    <div style={{ marginBottom: '16px' }}>
      <ControlValue<boolean> value>
        {({ value, onChange }) => (
          <Switch
            name="switch-label-left-two"
            labeled="left"
            onLabel={
              <LabelContainer>
                <span>Enabled</span>&nbsp;
                <Icon size={24} name="check-circle-outline" />
              </LabelContainer>
            }
            offLabel={
              <LabelContainer>
                <span>Disabled</span>&nbsp;
                <Icon size={24} name="close-circle-outline" />
              </LabelContainer>
            }
            variant="primary"
            checked={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.checked)
            }
          />
        )}
      </ControlValue>
    </div>
    <div style={{ marginBottom: '16px' }}>
      <ControlValue<boolean> value>
        {({ value, onChange }) => (
          <Switch
            name="switch-label-inside-custom"
            labeled
            onLabel={
              <LabelContainer>
                <span>Enabled</span>&nbsp;
                <Icon size={24} name="check-circle-outline" />
              </LabelContainer>
            }
            offLabel={
              <LabelContainer>
                <span>Disabled</span>&nbsp;
                <Icon size={24} name="close-circle-outline" />
              </LabelContainer>
            }
            variant="primary"
            checked={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.checked)
            }
          />
        )}
      </ControlValue>
    </div>
    <div style={{ marginBottom: '16px' }}>
      <ControlValue<boolean> value>
        {({ value, onChange }) => (
          <Switch
            disabled
            name="switch-label-disabled"
            labeled="left"
            onLabel={
              <LabelContainer>
                <span>Enabled</span>&nbsp;
                <Icon size={24} name="check-circle-outline" />
              </LabelContainer>
            }
            offLabel={
              <LabelContainer>
                <span>Disabled</span>&nbsp;
                <Icon size={24} name="close-circle-outline" />
              </LabelContainer>
            }
            variant="primary"
            checked={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.checked)
            }
          />
        )}
      </ControlValue>
    </div>
  </>
)

CustomLabelRender.args = {}
CustomLabelRender.argTypes = {}
CustomLabelRender.parameters = {
  docs: {
    story: {
      description:
        'If you choose to place label near the Switch component with `labeled` you can set a custom element for the label with the `onLabel` and `offLabel` props.',
    },
  },
}
