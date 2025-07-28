import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Modal } from '..'
import image from './assets/illustration.webp'
import imageCorrectFormat from './assets/illustrationCorrectFormat.webp'

export const Image: StoryFn = props => (
  <Stack direction="row" gap={2}>
    <Modal
      disclosure={<Button>Open Modal with image (incorrect ratio)</Button>}
      image={image}
      size="medium"
      {...props}
    >
      <Stack direction="column" gap="2">
        <Badge prominence="strong" sentiment="warning">
          Beta
        </Badge>
        <Text as="p" prominence="strong" sentiment="neutral" variant="heading">
          Incorrect ratio
        </Text>
        <Text as="p" sentiment="neutral" variant="body">
          <strong>Content</strong>
          <br />
          When the image does not have the correct ratio, it is cropped.
        </Text>
      </Stack>
    </Modal>
    <Modal
      disclosure={<Button>Open Modal with image (correct ratio)</Button>}
      image={imageCorrectFormat}
      size="xsmall"
      {...props}
    >
      <Stack direction="column" gap="2">
        <Badge prominence="strong" sentiment="warning">
          Beta
        </Badge>
        <Text as="p" prominence="strong" sentiment="neutral" variant="heading">
          Correct ratio
        </Text>
        <Text as="p" sentiment="neutral" variant="body">
          <strong>Content</strong>
          <br />
          When the image does have the correct ratio, it fills the entire
          container and it is not cropped.
        </Text>
      </Stack>
    </Modal>
  </Stack>
)
Image.parameters = {
  docs: {
    description: {
      story: 'Add an image at the top of the modal.',
    },
  },
}
