import type { StoryFn } from '@storybook/react'
import { Row } from '../../Row'
import { Card } from '../index'

export const Layout: StoryFn = args => (
  <Row templateColumns="repeat(2, 1fr)" gap={2}>
    <Card {...args} header="Lorem Ipsum">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit Pellentesque sit
    </Card>
    <Card header="Lorem Ipsum">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit Pellentesque sit
      amet purus nec nunc fermentum ultricies Donec auctor, nunc nec ultricies
      ultricies, nunc nunc
    </Card>
  </Row>
)

Layout.parameters = {
  docs: {
    description: {
      story:
        'You can set two cards in a row with `Row` component. The card will automatically adjust its width and height to fit the row.',
    },
  },
}
