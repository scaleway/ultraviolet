import { Row } from '..'
import { Stack } from '../../Stack'

import { divWithBackground } from './DivWithBackground.css'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Row> = ({ ...props }) => (
  <Stack gap={1}>
    <Row gap={1} {...props} templateColumns="3fr 6fr 3fr">
      <div className={divWithBackground} data-sentiment="primary">
        3fr
      </div>
      <div className={divWithBackground} data-sentiment="success">
        6fr
      </div>
      <div className={divWithBackground} data-sentiment="danger">
        3fr
      </div>
    </Row>
    <Row gap={1} {...props} templateColumns="4fr 3fr 4fr">
      <div className={divWithBackground} data-sentiment="primary">
        4fr
      </div>
      <div className={divWithBackground} data-sentiment="success">
        3fr
      </div>
      <div className={divWithBackground} data-sentiment="danger">
        4fr
      </div>
    </Row>
  </Stack>
)
