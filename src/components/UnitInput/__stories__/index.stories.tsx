import { Meta, Story } from '@storybook/react'
import React from 'react'
import UnitInput, { UnitInputProps } from '..'

export default {
  component: UnitInput,
  parameters: {
    docs: {
      description: {
        component: `UnitInput is a component made out of 2 components: a **TextBox** and a **RichSelect**.`,
      },
    },
  },
  title: 'Components/Data Entry/UnitInput',
} as Meta

const Template: Story<UnitInputProps> = args => (
  <UnitInput name="test" {...args} />
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: `UnitInput provide data as follows:

\`\`\`js
{
    unit: [string],
    value: [string]
}
\`\`\``,
  },
}

export const CustomOptions = Template.bind({})
CustomOptions.parameters = {
  docs: {
    storyDescription: `You can customize options by passing an array of object. Be careful objects should have following structure:

\`\`\`js
{
    label: [string],
    value: [string]
}
\`\`\`

Where label is text shown in RichSelect component and value the value that will be given back by component in the name \`unit\`.`,
  },
}
CustomOptions.decorators = [
  () => (
    <UnitInput
      name="custom-options"
      options={[
        {
          label: 'KB',
          value: 'kb',
        },
        {
          label: 'MB',
          value: 'mb',
        },
        {
          label: 'GB',
          value: 'gb',
        },
      ]}
      defaultOption={{
        label: 'GB',
        value: 'gb',
      }}
      defaultValue={100}
    />
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription:
      'You can change the original size with the `size` prop. It allow the following values : `small`, `medium`, `large`',
  },
}
Sizes.decorators = [
  () => (
    <>
      {['small', 'medium', 'large'].map(size => (
        <div key={size} style={{ marginTop: '8px' }}>
          {size}:
          <UnitInput name="basic-time" size={size} />
        </div>
      ))}
    </>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'You can disable the input by passing `disabled` prop.',
  },
}
Disabled.decorators = [() => <UnitInput name="basic-time" disabled />]
