import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import image from './assets/illustration.webp'
import imageCorrectFormat from './assets/illustrationCorrectFormat.webp'

export const Image: StoryFn = props => (
  <Stack gap={2} direction="row">
    <Modal
      image={image}
      size="medium"
      disclosure={<Button>Open Modal with image (incorrect ratio)</Button>}
      {...props}
    >
      <Stack direction="column" gap="2">
        <Badge sentiment="warning" prominence="strong">
          Beta
        </Badge>
        <Text as="p" variant="heading" sentiment="neutral" prominence="strong">
          Incorrect ratio
        </Text>
        <Text as="p" variant="body" sentiment="neutral">
          <strong>Content</strong>
          <br />
          When the image does not have the correct ratio, it is cropped.
        </Text>
      </Stack>
    </Modal>
    <Modal
      image={imageCorrectFormat}
      size="xsmall"
      disclosure={<Button>Open Modal with image (correct ratio)</Button>}
      {...props}
    >
      <Stack direction="column" gap="2">
        <Badge sentiment="warning" prominence="strong">
          Beta
        </Badge>
        <Text as="p" variant="heading" sentiment="neutral" prominence="strong">
          Correct ratio
        </Text>
        <Text as="p" variant="body" sentiment="neutral">
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
