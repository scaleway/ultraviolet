import { Button, Icon, Stack } from '@scaleway/ui'

const GithubAndDocumentationButtons = () => (
  <Stack gap={2} direction="row">
    <Button
      variant="filled"
      sentiment="neutral"
      href="https://github.com/scaleway/scaleway-ui"
      aria-label="github"
    >
      <Icon name="github" size={32} />
    </Button>
    <Button
      href="https://storybook.ui.scaleway.com/"
      aria-label="documentation"
    >
      Documentation
    </Button>
  </Stack>
)

export default GithubAndDocumentationButtons
