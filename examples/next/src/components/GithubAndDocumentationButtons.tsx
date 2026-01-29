import { GithubIcon } from '@ultraviolet/icons/GithubIcon'
import { Button, Stack } from '@ultraviolet/ui'

const GithubAndDocumentationButtons = () => (
  <Stack direction="row" gap={2}>
    <Button
      aria-label="github"
      href="https://github.com/scaleway/ultraviolet"
      sentiment="neutral"
      variant="filled"
    >
      <GithubIcon size="large" />
    </Button>
    <Button
      aria-label="documentation"
      href="https://storybook.ultraviolet.scaleway.com/"
    >
      Documentation
    </Button>
  </Stack>
)

export default GithubAndDocumentationButtons
