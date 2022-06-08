import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Text, { textVariants } from '..'

export default {
  component: Text,
  parameters: {
    docs: {
      description: {
        component:
          'Text allows you to style your texts using some existing standards.',
      },
    },
  },
  title: 'Components/Fondation/Text',
} as Meta

const Template: Story<ComponentProps<typeof Text>> = args => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  as: 'div',
  children: 'This is a basic Text',
  variant: 'body',
}

export const Variants: Story = () => (
  <>
    {textVariants.map(variant => (
      <Text as="div" key={variant} variant={variant}>
        {variant}
      </Text>
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

export const Color = Template.bind({})
Color.args = {
  children: 'This is a colored Text',
  color: 'success',
  variant: 'body',
}
Color.parameters = {
  docs: {
    description: {
      story: 'Set a color using `color` property.',
    },
  },
}

export const Prominence = Template.bind({})
Prominence.args = {
  children: 'This is a colored text with prominence',
  color: 'danger',
  prominence: 'weak',
  variant: 'body',
}
Prominence.parameters = {
  docs: {
    description: {
      story: 'Set a prominence using `prominence` property.',
    },
  },
}

export const As = Template.bind({})
As.args = {
  as: 'p',
  children: 'This is a paragraph text',
  variant: 'body',
}
As.parameters = {
  docs: {
    description: {
      story: 'Set a different tag using `as` property.',
    },
  },
}

export const OneLine: Story = () => (
  <>
    <strong>Without ellipsis</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Text as="div" variant="body">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <strong>With ellipsis (a tooltip is displayed on hover)</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Text as="div" variant="body" oneLine>
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
  </>
)

OneLine.parameters = {
  docs: {
    description: {
      story:
        ' `oneLine` prop will force text to be display on a single line by adding `...` after cropped text and will display a tooltip with full text when hovered.',
    },
  },
}
