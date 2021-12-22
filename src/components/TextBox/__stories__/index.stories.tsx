import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import TextBox, { textBoxSizes } from '..'
import ErrorTransition from '../../../__stories__/components/ErrorTransition'
import UncontrolledTextBox from './UncontrolledTextBox'

export default {
  component: TextBox,
  parameters: {
    docs: {
      description: {
        component: 'An enhanced text box.',
      },
    },
  },
  title: 'Components/Data Entry/TextBox',
} as Meta

const Template: Story<ComponentProps<typeof TextBox>> = args => (
  <div style={{ display: 'flex', gap: 8 }}>
    <UncontrolledTextBox label="First Name" {...args} />
  </div>
)

export const Default = Template.bind({})

export const NoLabel: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <UncontrolledTextBox label="First Name" noTopLabel />
    <UncontrolledTextBox
      label="First Name"
      defaultValue="James Bond"
      noTopLabel
    />
  </div>
)

NoLabel.parameters = {
  docs: {
    description: {
      story:
        'You can hide the label and but it in `aria-label` attribute of the input by passing `noTopLabel` to the component',
    },
  },
}

export const Placeholder = Template.bind({})
Placeholder.parameters = {
  docs: {
    description: {
      story:
        'Set a placeholder using `placeholder` property. It is only visibled if the `TextBox` has been visited (an input is considered as visited after the first focus).',
    },
  },
}

Placeholder.args = {
  label: 'First Name',
  placeholder: 'Type your name',
}

export const Size: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        placeholder={`Size ${size}`}
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

Size.parameters = {
  docs: {
    description: {
      story: 'Set size using `size` property.',
    },
  },
}

export const Disabled: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        disabled
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        disabled
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        disabled
        defaultValue="Default value"
        label="Label"
      />
    ))}
    <UncontrolledTextBox
      size="medium"
      disabled
      defaultValue="Default value"
      label="Label"
      random="textbox"
    />
  </div>
)

Disabled.parameters = {
  docs: {
    description: {
      story: 'Mark `TextBox` as disabled using `disabled` property.',
    },
  },
}

export const ReadOnly: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        readOnly
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        readOnly
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        readOnly
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

ReadOnly.parameters = {
  docs: {
    description: {
      story: 'Mark `TextBox` as read only using `readOnly` property.',
    },
  },
}

export const Required: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        required
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        required
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        required
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

Required.parameters = {
  docs: {
    description: {
      story: 'Add a required mark using `required` property.',
    },
  },
}

export const Valid: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        valid
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        valid
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        valid
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

Valid.parameters = {
  docs: {
    description: {
      story: 'Add a check mark using `valid` property.',
    },
  },
}

export const Error: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <ErrorTransition
        key={size}
        size={size}
        error="An error"
        placeholder="Placeholder"
        Component={UncontrolledTextBox}
      />
    ))}
    {textBoxSizes.map(size => (
      <ErrorTransition
        key={size}
        size={size}
        error="An error"
        placeholder="Placeholder"
        label="Label"
        Component={UncontrolledTextBox}
      />
    ))}
    {textBoxSizes.map(size => (
      <ErrorTransition
        key={size}
        size={size}
        error="An error"
        defaultValue="Default value"
        label="Label"
        Component={UncontrolledTextBox}
      />
    ))}
  </div>
)

Error.parameters = {
  docs: {
    description: {
      story: 'Fill `TextBox` error using `error` property.',
    },
  },
}

export const Notice: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        notice="A notice"
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        notice="A notice"
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        notice="A notice"
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

Notice.parameters = {
  docs: {
    description: {
      story: 'Display an information under `TextBox` using `notice` property.',
    },
  },
}

export const ToggleablePassword: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        type="toggleable-password"
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        type="toggleable-password"
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        type="toggleable-password"
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

ToggleablePassword.parameters = {
  docs: {
    description: {
      story:
        'Set type to `toggleable-password` adds a eye toggle to display typed password **This behaviour is dangerous, use it only when the user fills a new password.**',
    },
  },
}

export const Unit: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        unit="px"
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        unit="px"
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        unit="px"
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

Unit.parameters = {
  docs: {
    description: {
      story: 'Specify a unit using `unit` prop.',
    },
  },
}

export const Randomize: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        random="prefix"
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        random="prefix"
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        random="prefix"
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

Randomize.parameters = {
  docs: {
    description: {
      story: 'Set `random` prop adds a randomize button.',
    },
  },
}

export const ForceEditMode: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        edit
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        edit
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        edit
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

ForceEditMode.parameters = {
  docs: {
    description: {
      story:
        'It is possible to force edit mode (label at the top) using `edit` property. The principal use-case is to be compatible with browser autocomplete.',
    },
  },
}

export const Multiline: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        multiline
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        multiline
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        multiline
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

Multiline.parameters = {
  docs: {
    description: {
      story: 'Enable multiline mode using `multiline` property.',
    },
  },
}

export const DisableResize: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        multiline
        resizable={false}
        placeholder="Placeholder"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        multiline
        resizable={false}
        placeholder="Placeholder"
        label="Label"
      />
    ))}
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        key={size}
        size={size}
        multiline
        resizable={false}
        defaultValue="Default value"
        label="Label"
      />
    ))}
  </div>
)

DisableResize.parameters = {
  docs: {
    description: {
      story: 'Disable resize in multiline mode using `resizable` prop.',
    },
  },
}

export const TabIndex: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <UncontrolledTextBox
      label="First Name"
      defaultValue="Tabulation is ok here"
    />
    <UncontrolledTextBox
      label="No name"
      tabIndex={-1}
      defaultValue="No tabulation in this field"
    />
    <UncontrolledTextBox
      label="Last Name"
      defaultValue="Tabulation is ok here"
    />
  </div>
)

TabIndex.parameters = {
  docs: {
    description: {
      story: 'Can disable tabulation on field with `tabIndex=&quot;-1&quot;`',
    },
  },
}
