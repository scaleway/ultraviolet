import { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { ComponentProps, ReactNode } from 'react'
import Tooltip from '..'
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
Default.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const hoverElement = canvas.getByText('Hover Me')
  if (hoverElement) {
    userEvent.click(hoverElement)
  }
}

Default.decorators = [
  DefaultStory => (
    <FlexBox>
      <DefaultStory />
    </FlexBox>
  ),
]

const TooltipContainer = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      border: '2px solid #333',
      borderRadius: 20,
      display: 'inline-flex',
      margin: 8,
      padding: 32,
      width: 'max-content',
    }}
  >
    {children}
  </div>
)

export const Children: Story = () => (
  <>
    <TooltipContainer>
      <Tooltip text="tooltip">Tooltip around the text</Tooltip>
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip text="tooltip">
        <Button width={220} onClick={() => alert()}>
          Should be fired on click
        </Button>
      </Tooltip>
      <div style={{ marginTop: 16 }}>
        <Tooltip text="tooltip">
          <Button width={220} disabled onClick={() => alert()}>
            Should not be fired on click
          </Button>
        </Tooltip>
      </div>
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip text="tooltip">
        <div>
          <div>I&apos;m a nested element</div>
        </div>
      </Tooltip>
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip text="tooltip" backgroundColor="red">
        <div>I&apos;m a customized tooltip</div>
      </Tooltip>
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip
        width={150}
        text="I have a very very very very very very very very very very very very very very long text"
      >
        <div>I&apos;m a long tooltip</div>
      </Tooltip>
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip text="empty div">
        <div style={{ backgroundColor: 'red', height: 10, width: 10 }} />
      </Tooltip>
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip text="tooltip" backgroundColor="red">
        <div>I&apos;m the first children</div>
        <div>I&apos;m the second children</div>
        <div>I&apos;m the third children</div>
      </Tooltip>
    </TooltipContainer>
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
  <div style={{ display: 'flex', gap: 16, justifyContent: 'space-evenly' }}>
    {(
      ['left', 'top', 'bottom', 'right'] as ComponentProps<
        typeof Tooltip
      >['placement'][]
    ).map(placement => (
      <Tooltip key={placement} text="tooltip" placement={placement}>
        {placement}
      </Tooltip>
    ))}
  </div>
)

Placement.parameters = {
  docs: {
    description: {
      story: 'Set placement using `placement` prop.',
    },
  },
}

export const Variants: Story = () => (
  <div
    style={{
      display: 'flex',
      gap: 8,
      justifyContent: 'space-evenly',
    }}
  >
    {(['black', 'white'] as ComponentProps<typeof Tooltip>['variant'][]).map(
      variant => (
        <Tooltip
          key={variant}
          text="tooltip"
          variant={variant}
          placement="bottom"
        >
          {variant}
        </Tooltip>
      ),
    )}
  </div>
)

export const EmptyText: Story = () => (
  <>
    <div style={{ paddingBottom: 16 }}>
      <Tooltip text="">
        Here you should not see a tooltip because text is empty
      </Tooltip>
    </div>
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
