import { Button, Stack } from '@scaleway/ui'

const GithubAndDocumentationButtons = () => (
  <Stack gap={2} direction="row">
    <Button
      variant="secondary"
      icon="github"
      iconSize={28}
      href="https://github.com/scaleway/scaleway-ui"
      aria-label="github"
    />
    <Button
      href="https://storybook.ui.scaleway.com/"
      size="medium"
      aria-label="documentation"
    >
      Documentation
    </Button>
  </Stack>
)

export default GithubAndDocumentationButtons
