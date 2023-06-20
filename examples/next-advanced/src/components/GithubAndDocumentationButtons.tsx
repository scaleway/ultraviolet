import { Button, Icon, Stack } from '@ultraviolet/ui'

const GithubAndDocumentationButtons = () => (
  <Stack gap={2} direction="row">
    <Button
      variant="filled"
      sentiment="neutral"
      href="https://github.com/scaleway/ultraviolet"
      aria-label="github"
    >
      <Icon name="github" size={32} />
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
