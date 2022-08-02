import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Box from '..'

export default {
  component: Box,
  parameters: {
    deprecated: true,
    deprecatedReason:
      'Please use div/styled/whatever. Box is still here for internal usage while we gradually migrate to another solution and should not be used',
  },
  title: 'Components/Container/Box',
} as Meta

const Template: Story<ComponentProps<typeof Box>> = args => (
  <Box {...args}>Box</Box>
)

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
