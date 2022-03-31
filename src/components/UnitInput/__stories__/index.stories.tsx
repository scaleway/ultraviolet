import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import UnitInput from '..'

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

const Template: Story<ComponentProps<typeof UnitInput>> = args => (
  <UnitInput name="test" {...args} />
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: `UnitInput provide data as follows:

\`\`\`js
{
    unit: [string],
    value: [string]
}
\`\`\``,
    },
  },
}

export const CustomOptions = Template.bind({})
CustomOptions.parameters = {
  docs: {
    description: {
      story: `You can customize options by passing an array of object. Be careful objects should have following structure:

\`\`\`js
{
    label: [string],
    value: [string]
}
\`\`\`

Where label is text shown in RichSelect component and value the value that will be given back by component in the name \`unit\`.`,
    },
  },
}
CustomOptions.args = {
  defaultOption: {
    label: 'GB',
    value: 'gb',
  },
  defaultValue: 100,
  options: [
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
  ],
}

export const Sizes: Story = () => (
  <>
    {['small', 'medium', 'large'].map(size => (
      <div key={size} style={{ marginTop: '8px' }}>
        {size}:
        <UnitInput name="basic-time" size={size} />
      </div>
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    description: {
      story:
        'You can change the original size with the `size` prop. It allow the following values : `small`, `medium`, `large`',
    },
  },
}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    description: {
      story: 'You can disable the input by passing `disabled` prop.',
    },
  },
}
Disabled.args = { disabled: true }
