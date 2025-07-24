import type { StoryFn } from '@storybook/react-vite'
import { Row } from '..'
import { Stack } from '../../Stack'
import { DivWithBackground } from './DivWithBackground'

export const Padding: StoryFn = args => (
  <Stack>
    <Row {...args} templateColumns="1fr" padding="50px 0">
      <DivWithBackground>Padding-top and bottom: 50px</DivWithBackground>
    </Row>
    <Row {...args} templateColumns="1fr" padding="0 50px">
      <DivWithBackground>Padding-left and right: 50px</DivWithBackground>
    </Row>
    <Row {...args} templateColumns="1fr" padding="16px 32px 24px 8px">
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
