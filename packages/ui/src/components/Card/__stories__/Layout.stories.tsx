import type { StoryFn } from '@storybook/react-vite'
import { Row } from '../../Row'
import { Card } from '../index'

export const Layout: StoryFn = args => (
  <Row gap={2} templateColumns="repeat(2, 1fr)">
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
