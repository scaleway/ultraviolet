import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Breadcrumbs, { Item, breadcrumbsVariants } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  component: Breadcrumbs,
  subcomponents: { Item },
  title: 'Components/Navigation/Breadcrumbs',
} as Meta

const Template: Story<ComponentProps<typeof Breadcrumbs>> = args => (
  <Breadcrumbs {...args}>
    <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/step1/step2">Step 2</Breadcrumbs.Item>
    <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
  </Breadcrumbs>
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: `
      Creates a Breadcrumbs of hierarchical pages.
      Link are automatically supported with \`to\` prop using the \`linkComponent\` from
      your theme configuration.
    `,
  },
}

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}
Variants.decorators = [
  () => (
    <>
      {breadcrumbsVariants.map(variant => (
        <>
          <b>{variant}:</b>
          <Breadcrumbs key={variant} selected={1} variant={variant}>
            <Breadcrumbs.Item>Step 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Step 2</Breadcrumbs.Item>
            <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
          </Breadcrumbs>
          <br />
        </>
      ))}
    </>
  ),
]

export const Selected = Template.bind({})
Selected.parameters = {
  docs: {
    storyDescription:
      'Selected is automatically determined as the last element. One can be specified using `selected` prop.',
  },
}

export const To = Template.bind({})
To.parameters = {
  docs: {
    storyDescription: `
      You can make \`Breadcrumbs.Item\` content be render as \`a\` tag with \`to\` prop.
      For relative url the \`linkComponent\` from your theme configuration is used.
    `,
  },
}
To.decorators = [
  () => (
    <Breadcrumbs variant="link">
      <Breadcrumbs.Item to="/">Step 1</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/">Step 2</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/">Step 3</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
]

export const OnClick = Template.bind({})
OnClick.parameters = {
  docs: {
    storyDescription: `
      You can make \`Breadcrumbs.Item\` clickable with \`onClick\` handler which pass
      \`(event, stepClicked)\` params. You can also disabled the onClick handler by
      using \`disabled\` prop
      `,
  },
}
OnClick.decorators = [
  () => (
    <ControlValue value={1}>
      {({ value, onChange }) => (
        <Breadcrumbs variant="bubble" selected={value}>
          <Breadcrumbs.Item onClick={(_, step) => onChange(step)}>
            Step 1
          </Breadcrumbs.Item>
          <Breadcrumbs.Item onClick={(_, step) => onChange(step)}>
            Step 2
          </Breadcrumbs.Item>
          <Breadcrumbs.Item disabled onClick={(_, step) => onChange(step)}>
            Step 3
          </Breadcrumbs.Item>
        </Breadcrumbs>
      )}
    </ControlValue>
  ),
]
