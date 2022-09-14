import { Button } from '@scaleway/ui'

const GithubAndDocumentationButtons = (): JSX.Element => (
  <>
    <Button
      variant="secondary"
      icon="github"
      iconSize={24}
      href="https://github.com/scaleway/scaleway-ui"
    />
    <Button href="https://main.ui.scaleway.com/" mx="2" size="medium">
      Documentation
    </Button>
  </>
)

export default GithubAndDocumentationButtons
