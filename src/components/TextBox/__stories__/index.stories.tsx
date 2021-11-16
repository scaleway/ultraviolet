import { Meta, Story } from '@storybook/react'
import React from 'react'
import TextBox, { TextBoxProps, textBoxSizes } from '..'
import ErrorTransition from '../../../__stories__/components/ErrorTransition'
import Boxer from '../../Boxer'
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

const Template: Story<TextBoxProps> = args => (
  <Boxer my={1}>
    <UncontrolledTextBox label="First Name" {...args} />
  </Boxer>
)

export const Default = Template.bind({})

export const NoLabel: Story = () => (
  <Boxer my={1}>
    <UncontrolledTextBox label="First Name" noTopLabel />
    <UncontrolledTextBox
      label="First Name"
      defaultValue="James Bond"
      noTopLabel
    />
  </Boxer>
)

NoLabel.parameters = {
  docs: {
    story: {
      description:
        'You can hide the label and but it in `aria-label` attribute of the input by passing `noTopLabel` to the component',
    },
  },
}

export const Placeholder = Template.bind({})
Placeholder.parameters = {
  docs: {
    story: {
      description:
        'Set a placeholder using `placeholder` property. It is only visibled if the `TextBox` has been visited (an input is considered as visited after the first focus).',
    },
  },
}

Placeholder.args = {
  label: 'First Name',
  placeholder: 'Type your name',
}

export const Size: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Size.parameters = {
  docs: {
    story: {
      description: 'Set size using `size` property.',
    },
  },
}

export const Disabled: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Disabled.parameters = {
  docs: {
    story: {
      description: 'Mark `TextBox` as disabled using `disabled` property.',
    },
  },
}

export const ReadOnly: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

ReadOnly.parameters = {
  docs: {
    story: {
      description: 'Mark `TextBox` as read only using `readOnly` property.',
    },
  },
}

export const Required: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Required.parameters = {
  docs: {
    story: {
      description: 'Add a required mark using `required` property.',
    },
  },
}

export const Valid: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Valid.parameters = {
  docs: {
    story: {
      description: 'Add a check mark using `valid` property.',
    },
  },
}

export const Error: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Error.parameters = {
  docs: {
    story: {
      description: 'Fill `TextBox` error using `error` property.',
    },
  },
}

export const Notice: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Notice.parameters = {
  docs: {
    story: {
      description:
        'Display an information under `TextBox` using `notice` property.',
    },
  },
}

export const ToggleablePassword: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

ToggleablePassword.parameters = {
  docs: {
    story: {
      description:
        'Set type to `toggleable-password` adds a eye toggle to display typed password **This behaviour is dangerous, use it only when the user fills a new password.**',
    },
  },
}

export const Unit: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Unit.parameters = {
  docs: {
    story: {
      description: 'Specify a unit using `unit` prop.',
    },
  },
}

export const Randomize: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Randomize.parameters = {
  docs: {
    story: {
      description: 'Set `random` prop adds a randomize button.',
    },
  },
}

export const ForceEditMode: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

ForceEditMode.parameters = {
  docs: {
    story: {
      description:
        'It is possible to force edit mode (label at the top) using `edit` property. The principal use-case is to be compatible with browser autocomplete.',
    },
  },
}

export const Multiline: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

Multiline.parameters = {
  docs: {
    storyDescription: {
      description: 'Enable multiline mode using `multiline` property.',
    },
  },
}

export const DisableResize: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

DisableResize.parameters = {
  docs: {
    story: {
      description: 'Disable resize in multiline mode using `resizable` prop.',
    },
  },
}

export const TabIndex: Story = () => (
  <Boxer my={1}>
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
  </Boxer>
)

TabIndex.parameters = {
  docs: {
    story: {
      description:
        'Can disable tabulation on field with `tabIndex=&quot;-1&quot;`',
    },
  },
}
