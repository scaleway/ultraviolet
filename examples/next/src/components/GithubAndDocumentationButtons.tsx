import { GithubIcon } from '@ultraviolet/icons'
import { Button, Stack } from '@ultraviolet/ui'

const GithubAndDocumentationButtons = () => (
  <Stack gap={2} direction="row">
    <Button
      variant="filled"
      sentiment="neutral"
      href="https://github.com/scaleway/ultraviolet"
      aria-label="github"
    >
      <GithubIcon size="large" />
    </Button>
    <Button
      href="https://storybook.ultraviolet.scaleway.com/"
      aria-label="documentation"
    >
      Documentation
    </Button>
  </Stack>
)

export default GithubAndDocumentationButtons
