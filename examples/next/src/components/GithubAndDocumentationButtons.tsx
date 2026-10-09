import { GithubIcon } from '@ultraviolet/icons/GithubIcon'
import { Button, Stack } from '@ultraviolet/ui'

const GithubAndDocumentationButtons = () => (
  <Stack direction="row" gap={2}>
    <Button
      accessibleLabel="github"
      href="https://github.com/scaleway/ultraviolet"
      sentiment="neutral"
      variant="outlined"
    >
      <GithubIcon size="large" />
    </Button>
    <Button accessibleLabel="documentation" href="https://storybook.ultraviolet.scaleway.com/" variant="outlined">
      Documentation
    </Button>
  </Stack>
)

export default GithubAndDocumentationButtons
