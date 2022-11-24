import styled from '@emotion/styled'
import { Button } from '@scaleway/ui'

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']};
`

const GithubAndDocumentationButtons = () => (
  <ButtonsContainer>
    <Button
      variant="secondary"
      icon="github"
      iconSize={24}
      href="https://github.com/scaleway/scaleway-ui"
    />
    <Button href="https://storybook.ui.scaleway.com/" size="medium">
      Documentation
    </Button>
  </ButtonsContainer>
)

export default GithubAndDocumentationButtons
