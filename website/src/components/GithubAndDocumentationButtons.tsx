import { Button } from '@scaleway/ui'
import React from 'react'

const GithubAndDocumentationButtons = (): JSX.Element => (
  <>
    <Button
      variant="secondary"
      icon="github"
      iconSize={40}
      size="medium"
      href="https://github.com/scaleway/scaleway-ui"
      target="_blank"
      p={0}
    />
    <Button
      href="https://main.ui.scaleway.com/"
      target="_blank"
      mx={2}
      size="medium"
    >
      Documentation
    </Button>
  </>
)

export default GithubAndDocumentationButtons
