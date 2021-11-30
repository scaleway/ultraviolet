import { Meta, Story } from '@storybook/react'
import React from 'react'
import Box, { BoxProps } from '..'

export default {
  component: Box,
  title: 'Components/Container/Box',
} as Meta

const Template: Story<BoxProps> = args => <Box {...args}>Box</Box>

export const Default = Template.bind({})

Default.parameters = {
  docs: {
    storyDescription: `
      Box is based on [xstyled](https://xstyled.dev/docs/) \`x.div\`. You can use a
      \`Box\` for wrapping your components in it and apply style on them.
      In the example we have a \`Box\` with primary background, a height of \`100px\`,
      margin x \`auto\` and padding of \`16px\`
    `,
  },
}

export const Bordered = Template.bind({})
Bordered.parameters = {
  docs: {
    storyDescription:
      'Using prop `bordered` you can add a border and some padding on a Box.',
  },
}
Bordered.decorators = [() => <Box bordered>This is a bordered box</Box>]

export const OtherElement = Template.bind({})
OtherElement.parameters = {
  docs: {
    storyDescription:
      'Using prop `as` you can specify another html or React element instead of the default div.',
  },
}
OtherElement.decorators = [
  () => <Box as="span">This is a Box as a span tag</Box>,
]
