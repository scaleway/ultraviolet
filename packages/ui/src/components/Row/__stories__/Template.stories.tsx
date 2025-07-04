import type { StoryFn } from '@storybook/react'
import { Row } from '..'
import { Stack } from '../../Stack'
import { DivWithBackground } from './DivWithBackground'

export const Template: StoryFn<typeof Row> = ({ ...props }) => (
  <Stack gap={1}>
    <Row gap={1} {...props} templateColumns="3fr 6fr 3fr">
      <DivWithBackground data-sentiment="primary">3fr</DivWithBackground>
      <DivWithBackground data-sentiment="success">6fr</DivWithBackground>
      <DivWithBackground data-sentiment="danger">3fr</DivWithBackground>
    </Row>
    <Row gap={1} {...props} templateColumns="4fr 3fr 4fr">
      <DivWithBackground data-sentiment="primary">4fr</DivWithBackground>
      <DivWithBackground data-sentiment="success">3fr</DivWithBackground>
      <DivWithBackground data-sentiment="danger">4fr</DivWithBackground>
    </Row>
  </Stack>
)
