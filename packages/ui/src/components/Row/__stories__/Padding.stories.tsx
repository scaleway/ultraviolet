import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Row } from '..'
import { DivWithBackground } from './DivWithBackground'

export const Padding: StoryFn = args => (
  <Stack>
    <Row {...args} padding="50px 0" templateColumns="1fr">
      <DivWithBackground>Padding-top and bottom: 50px</DivWithBackground>
    </Row>
    <Row {...args} padding="0 50px" templateColumns="1fr">
      <DivWithBackground>Padding-left and right: 50px</DivWithBackground>
    </Row>
    <Row {...args} padding="16px 32px 24px 8px" templateColumns="1fr">
      <DivWithBackground>
        Padding-left: 8px, padding-right: 32px, padding-top: 16px,
        padding-bottom: 24px;
      </DivWithBackground>
    </Row>
  </Stack>
)

Padding.parameters = {
  docs: {
    description: {
      story: 'You can use the prop `padding` to add a padding',
    },
  },
}
