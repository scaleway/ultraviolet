import type { StoryFn } from '@storybook/react-vite'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Row } from '..'
import { divWithBackground } from './DivWithBackground.css'

export const AlignItems: StoryFn = args => (
  <Stack gap={2}>
    <Text as="p" variant="bodyStrong">
      alignItems=&ldquo;start&ldquo;
    </Text>
    <Row
      {...args}
      alignItems="flex-start"
      gap={1}
      templateColumns="repeat(3, 1fr)"
    >
      <div style={{ height: '100px' }}>1fr</div>
      <div className={divWithBackground} style={{ height: '50px' }}>
        1fr
      </div>
      <div className={divWithBackground}>1fr</div>
    </Row>
    <Separator />
    <Text as="p" variant="bodyStrong">
      alignItems=&ldquo;center&ldquo;
    </Text>
    <Row {...args} alignItems="center" gap={1} templateColumns="repeat(3, 1fr)">
      <div className={divWithBackground} style={{ height: '100px' }}>
        1fr
      </div>
      <div className={divWithBackground} style={{ height: '50px' }}>
        1fr
      </div>
      <div className={divWithBackground}>1fr</div>
    </Row>
    <Separator />
    <Text as="p" variant="bodyStrong">
      alignItems=&ldquo;end&ldquo;
    </Text>
    <Row
      {...args}
      alignItems="flex-end"
      gap={1}
      templateColumns="repeat(3, 1fr)"
    >
      <div className={divWithBackground} style={{ height: '100px' }}>
        1fr
      </div>
      <div className={divWithBackground} style={{ height: '50px' }}>
        1fr
      </div>
      <div className={divWithBackground}>1fr</div>
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
