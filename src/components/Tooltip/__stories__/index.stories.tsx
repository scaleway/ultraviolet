import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Tooltip from '..'
import Box from '../../Box'
import Button from '../../Button'
import FlexBox from '../../FlexBox'

export default {
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'Displays a tooltip on mouse hover.',
      },
      source: {
        excludeDecorators: true,
      },
    },
  },
  title: 'Components/Feedback/Tooltip',
} as Meta

const Template: Story<ComponentProps<typeof Tooltip>> = args => (
  <Tooltip {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Hover Me',
  text: 'Hello there',
}

Default.decorators = [
  DefaultStory => (
    <FlexBox>
      <DefaultStory />
    </FlexBox>
  ),
]

export const Children: Story = () => (
  <>
    <Box
      borderRadius={20}
      border="2px solid #333"
      p={4}
      width="max-content"
      display="inline-flex"
      m={1}
    >
      <Tooltip text="tooltip">Tooltip around the text</Tooltip>
    </Box>
    <Box
      borderRadius={20}
      border="2px solid #333"
      p={4}
      width="max-content"
      display="inline-flex"
      m={1}
    >
      <Tooltip text="tooltip">
        <Button width={220} onClick={() => alert()}>
          Should be fired on click
        </Button>
      </Tooltip>
      <Box mt={2}>
        <Tooltip text="tooltip">
          <Button width={220} disabled onClick={() => alert()}>
            Should not be fired on click
          </Button>
        </Tooltip>
      </Box>
    </Box>
    <Box
      borderRadius={20}
      border="2px solid #333"
      p={4}
      width="max-content"
      display="inline-flex"
      m={1}
    >
      <Tooltip text="tooltip">
        <div>
          <div>I&apos;m a nested element</div>
        </div>
      </Tooltip>
    </Box>
    <Box
      borderRadius={20}
      border="2px solid #333"
      p={4}
      width="max-content"
      display="inline-flex"
      m={1}
    >
      <Tooltip text="tooltip" backgroundColor="red">
        <div>I&apos;m a customized tooltip</div>
      </Tooltip>
    </Box>
    <Box
      borderRadius={20}
      border="2px solid #333"
      p={4}
      width="max-content"
      display="inline-flex"
      m={1}
    >
      <Tooltip
        width={150}
        text="I have a very very very very very very very very very very very very very very long text"
      >
        <div>I&apos;m a long tooltip</div>
      </Tooltip>
    </Box>
    <Box
      borderRadius={20}
      border="2px solid #333"
      p={4}
      width="max-content"
      display="inline-flex"
    >
      <Tooltip text="empty div">
        <div style={{ backgroundColor: 'red', height: 10, width: 10 }} />
      </Tooltip>
    </Box>
    <Box
      borderRadius={20}
      border="2px solid #333"
      p={4}
      width="max-content"
      display="inline-flex"
    >
      <Tooltip text="tooltip" backgroundColor="red">
        <div>I&apos;m the first children</div>
        <div>I&apos;m the second children</div>
        <div>I&apos;m the third children</div>
      </Tooltip>
    </Box>
  </>
)

Children.parameters = {
  docs: {
    description: {
      story:
        'Here is a set of examples so you see different type of components having a tooltip.',
    },
  },
}

export const Placement: Story = () => (
  <FlexBox justifyContent="space-evenly">
    {(
      ['left', 'top', 'bottom', 'right'] as ComponentProps<
        typeof Tooltip
      >['placement'][]
    ).map(placement => (
      <Box key={placement} p={2}>
        <Tooltip text="tooltip" placement={placement}>
          {placement}
        </Tooltip>
      </Box>
    ))}
  </FlexBox>
)

Placement.parameters = {
  docs: {
    description: {
      story: 'Set placement using `placement` prop.',
    },
  },
}

export const Variants: Story = () => (
  <Box display="flex" backgroundColor="black" justifyContent="space-evenly">
    {(
      ['left', 'top', 'bottom', 'right'] as ComponentProps<
        typeof Tooltip
      >['placement'][]
    ).map(placement => (
      <Box key={placement} p={2} color="white">
        <Tooltip text="tooltip" variant="white" placement={placement}>
          {placement}
        </Tooltip>
      </Box>
    ))}
  </Box>
)

export const EmptyText: Story = () => (
  <>
    <Box pb={2}>
      <Tooltip text="">
        Here you should not see a tooltip because text is empty
      </Tooltip>
    </Box>
    <FlexBox>
      <Tooltip text="You see me">
        Here you should see it because there a text
      </Tooltip>
    </FlexBox>
  </>
)

EmptyText.parameters = {
  docs: {
    description: {
      story: 'With an empty text it will only show children and no tooltip.',
    },
  },
}
