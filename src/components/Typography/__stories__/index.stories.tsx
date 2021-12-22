import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Typography, { typographyVariants } from '..'

export default {
  component: Typography,
  parameters: {
    docs: {
      description: {
        component:
          'Typography allows you to style your texts using some existing standards.',
      },
    },
  },
  title: 'Components/Fondation/Typography',
} as Meta

const Template: Story<ComponentProps<typeof Typography>> = args => (
  <Typography {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'This is a basic Typography',
}

export const Variants: Story = () => (
  <>
    {typographyVariants.map(variant => (
      <Typography key={variant} variant={variant}>
        {variant}
      </Typography>
    ))}
  </>
)

Variants.parameters = {
  docs: {
    description: {
      story: 'Set variant using `variant` property.',
    },
  },
}

export const Ellipsis: Story = () => (
  <>
    <strong>Without ellipsis</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Typography>
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
    </div>
    <strong>With ellipsis (a tooltip is displayed on hover)</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Typography ellipsis>
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
    </div>
  </>
)

Ellipsis.parameters = {
  docs: {
    description: {
      story:
        ' `ellipsis` prop will force text to be display on a single line by adding `...` after cropped text and will display a tooltip with full text when hovered.',
    },
  },
}

export const MaxLines = Template.bind({})
MaxLines.args = {
  children:
    'This text is quite long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  maxLines: 2,
  width: 300,
}

MaxLines.parameters = {
  docs: {
    description: {
      story: 'Force the text to be less than n lines with the `maxLines` prop.',
    },
  },
}

export const Alignment: Story = () => (
  <>
    <Typography align="left">Text aligned to the left</Typography>
    <Typography align="center">Text center aligned</Typography>
    <Typography align="right">Text aligned to the right</Typography>
  </>
)

Alignment.parameters = {
  docs: {
    description: {
      story: 'Set the textAlign css with `align` props',
    },
  },
}

export const ColoredCommand = Template.bind({})
ColoredCommand.args = {
  align: 'left',
  backgroundColor: 'lightBlue',
  children: "I'm a colored command",
  color: 'blue',
  variant: 'command',
}

ColoredCommand.parameters = {
  docs: {
    description: {
      story:
        'Set the `color` and `backgroundColor` props to color `command` variant',
    },
  },
}
