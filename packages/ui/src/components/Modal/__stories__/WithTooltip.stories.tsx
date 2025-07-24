import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Modal } from '../index'

export const WithTooltip: StoryFn = props => (
  <Modal {...props} disclosure={<Button>With a Tooltip</Button>}>
    <Row templateColumns="4fr 2fr 2fr 1fr" alignItems="center">
      <Text as="span" variant="body" oneLine>
        This-is-a-really-long-file-name-that-will-be-truncated.svg
      </Text>

      <Stack alignItems="end" justifyContent="center">
        <Text variant="body" as="span">
          130.5 MB
        </Text>
      </Stack>

      <Stack alignItems="end" justifyContent="center">
        <Text variant="body" as="span">
          Uploaded
        </Text>
      </Stack>
    </Row>
  </Modal>
)
