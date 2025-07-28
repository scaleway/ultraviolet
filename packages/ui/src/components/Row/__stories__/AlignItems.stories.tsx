import type { StoryFn } from '@storybook/react-vite'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Row } from '..'
import { DivWithBackground } from './DivWithBackground'

export const AlignItems: StoryFn = args => (
  <Stack gap={2}>
    <Text as="p" variant="bodyStrong">
      alignItems=&ldquo;start&ldquo;
    </Text>
    <Row {...args} alignItems="start" gap={1} templateColumns="repeat(3, 1fr)">
      <DivWithBackground style={{ height: '100px' }}>1fr</DivWithBackground>
      <DivWithBackground style={{ height: '50px' }}>1fr</DivWithBackground>
      <DivWithBackground>1fr</DivWithBackground>
    </Row>
    <Separator />
    <Text as="p" variant="bodyStrong">
      alignItems=&ldquo;center&ldquo;
    </Text>
    <Row {...args} alignItems="center" gap={1} templateColumns="repeat(3, 1fr)">
      <DivWithBackground style={{ height: '100px' }}>1fr</DivWithBackground>
      <DivWithBackground style={{ height: '50px' }}>1fr</DivWithBackground>
      <DivWithBackground>1fr</DivWithBackground>
    </Row>
    <Separator />
    <Text as="p" variant="bodyStrong">
      alignItems=&ldquo;end&ldquo;
    </Text>
    <Row {...args} alignItems="end" gap={1} templateColumns="repeat(3, 1fr)">
      <DivWithBackground style={{ height: '100px' }}>1fr</DivWithBackground>
      <DivWithBackground style={{ height: '50px' }}>1fr</DivWithBackground>
      <DivWithBackground>1fr</DivWithBackground>
    </Row>
  </Stack>
)

AlignItems.parameters = {
  docs: {
    description: {
      story: 'You can use the prop `alignItems` to align each row elements',
    },
  },
}
