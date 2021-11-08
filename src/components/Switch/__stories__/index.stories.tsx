/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Meta, Story } from '@storybook/react'
import React from 'react'
import Switch, { SwitchProps } from '..'
import { Box, Icon } from '../..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
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

const Template: Story<SwitchProps> = args => (
  <ControlValue value={false}>
    {({ value, onChange }) => (
      <Switch
        checked={value}
        name="switch-basic"
        onChange={e => {
          onChange(e.target.checked)
        }}
        {...args}
      />
    )}
  </ControlValue>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription:
      'Set variant using `variant` prop. Available variants: `primary`, `success`',
  },
}
Variants.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value>
          {({ value, onChange }) => (
            <Switch
              variant="primary"
              name="switch-variant-primary"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <ControlValue value>
        {({ value, onChange }) => (
          <Switch
            variant="success"
            name="switch-variant-success"
            checked={value}
            onChange={e => onChange(e.target.checked)}
          />
        )}
      </ControlValue>
    </>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'Set disabled using `disabled` prop.',
  },
}
Disabled.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value={false}>
          {({ value, onChange }) => (
            <Switch
              variant="primary"
              name="switch-disabled"
              checked={value}
              disabled
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <ControlValue value>
        {({ value, onChange }) => (
          <Switch
            variant="primary"
            name="switch-disabled-checked"
            checked={value}
            disabled
            onChange={e => onChange(e.target.checked)}
          />
        )}
      </ControlValue>
    </>
  ),
]

export const Size = Template.bind({})
Size.parameters = {
  docs: {
    storyDescription:
      '`Switch` has two sizes, modifying slightly his design. Use the prop `size` with `small` or `medium`. You can also customize its on/off labels using the `onLabel`, `offLabel` props and the `width` prop to adjust it with the text.',
  },
}
Size.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value={false}>
          {({ value, onChange }) => (
            <Switch
              variant="primary"
              name="switch-variant"
              size="small"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value={false}>
          {({ value, onChange }) => (
            <Switch
              name="switch-variant-width"
              variant="primary"
              size="small"
              width={65}
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value={false}>
          {({ value, onChange }) => (
            <Switch
              name="switch-variant-medium"
              variant="primary"
              size="medium"
              width={120}
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <ControlValue value={false}>
        {({ value, onChange }) => (
          <Switch
            name="switch-variant-medium-width"
            variant="primary"
            size="medium"
            checked={value}
            onChange={e => onChange(e.target.checked)}
          />
        )}
      </ControlValue>
    </>
  ),
]

export const Labeled = Template.bind({})
Labeled.parameters = {
  docs: {
    storyDescription:
      "Add the `labeled` prop you can choose where you want to put the label in the Switch. Possible positions are `left`, `right` or `inside` (it's the default label position when labeled is `true`). The width is automatically calculated. But you can override it by passing the `width` prop.",
  },
}
Labeled.decorators = [
  () => (
    <ControlValue value={false}>
      {({ value, onChange }) => (
        <Switch
          name="switch-label"
          labeled
          variant="primary"
          checked={value}
          onChange={e => onChange(e.target.checked)}
        />
      )}
    </ControlValue>
  ),
]

export const CustomOnOffTexts = Template.bind({})
CustomOnOffTexts.parameters = {
  docs: {
    storyDescription:
      'Default label placement is inside the Switch. you can customize the text with `onLabel` and `offLabel`props.',
  },
}
CustomOnOffTexts.decorators = [
  () => (
    <ControlValue value>
      {({ value, onChange }) => (
        <Switch
          name="switch-label-custom"
          labeled
          onLabel="YES"
          offLabel="NO"
          variant="primary"
          checked={value}
          onChange={e => onChange(e.target.checked)}
        />
      )}
    </ControlValue>
  ),
]

export const LabelPlacement = Template.bind({})
LabelPlacement.parameters = {
  docs: {
    storyDescription:
      'By setting the `labelPlacement` prop you can choose where you want to put the label. By setting the label on `left` or `right` the width is automatically calculated.',
  },
}
LabelPlacement.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value>
          {({ value, onChange }) => (
            <Switch
              name="switch-label-right"
              labeled
              variant="primary"
              onLabel="CHECKED"
              offLabel="NOT CHECKED"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value>
          {({ value, onChange }) => (
            <Switch
              name="switch-label-right"
              labeled="inside"
              onLabel="CHECKED"
              offLabel="NOT CHECKED"
              width={140}
              variant="primary"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ControlValue value>
          {({ value, onChange }) => (
            <Switch
              name="switch-label-left"
              labeled="left"
              onLabel="CHECKED"
              offLabel="NOT CHECKED"
              variant="primary"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
        <ControlValue value>
          {({ value, onChange }) => (
            <Switch
              name="switch-label-right"
              labeled="right"
              variant="primary"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
    </>
  ),
]

export const CustomLabelRender = Template.bind({})
CustomLabelRender.parameters = {
  docs: {
    storyDescription:
      'If you choose to place label near the Switch component with `labeled` you can set a custom element for the label with the `onLabel` and `offLabel` props.',
  },
}
CustomLabelRender.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value>
          {({ value, onChange }) => (
            <Switch
              name="switch-label-left"
              labeled
              onLabel={<Icon size={24} name="check-circle-outline" />}
              offLabel={<Icon size={24} name="close-circle-outline" />}
              variant="primary"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </ControlValue>
      </div>
      <ControlValue value>
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
            onChange={e => onChange(e.target.checked)}
          />
        )}
      </ControlValue>
    </>
  ),
]
