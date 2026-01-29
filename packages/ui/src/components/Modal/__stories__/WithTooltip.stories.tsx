import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Modal } from '../index'

export const WithTooltip: StoryFn = props => (
  <Modal {...props} disclosure={<Button>With a Tooltip</Button>}>
    <Row alignItems="center" templateColumns="4fr 2fr 2fr 1fr">
      <Text as="span" oneLine variant="body">
        This-is-a-really-long-file-name-that-will-be-truncated.svg
      </Text>

      <Stack alignItems="flex-end" justifyContent="center">
        <Text as="span" variant="body">
          130.5 MB
        </Text>
      </Stack>

      <Stack alignItems="flex-end" justifyContent="center">
        <Text as="span" variant="body">
          Uploaded
        </Text>
      </Stack>
    </Row>
  </Modal>
)
