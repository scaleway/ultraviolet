import type { StoryFn } from '@storybook/react'
// @ts-expect-error can't import ultraviolet/illustration in ui (cyclic dependencies)
import { accountExperienceContent } from '@ultraviolet/illustrations/products/accountExperience'
import { Modal } from '..'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Image: StoryFn = props => (
  <Modal
    image={accountExperienceContent as string}
    disclosure={<Button>Open Modal with lot of content</Button>}
    {...props}
  >
    <Stack direction="column" gap="2">
      <Badge sentiment="warning" prominence="strong">
        Beta
      </Badge>
      <Text as="p" variant="heading" sentiment="neutral" prominence="strong">
        This is a title
      </Text>
      <Text as="p" variant="body" sentiment="neutral">
        <strong>Content</strong>
        <br />
        Description
      </Text>
    </Stack>
  </Modal>
)
Image.parameters = {
  docs: {
    description: {
      story: 'Add an image at the top of the modal',
    },
  },
}
