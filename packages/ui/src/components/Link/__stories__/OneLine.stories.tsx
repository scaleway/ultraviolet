import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { Link } from '../index'

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.space['2']};
  margin-top: ${({ theme }) => theme.space['1']};
  width: 200px;
  background: ${({ theme }) => theme.colors.info.background};
  padding: ${({ theme }) => theme.space['1']};
`

export const OneLine: StoryFn<typeof Link> = () => (
  <>
    <strong>Without ellipsis</strong>
    <Container>
      <Link href="https://scaleway.com">
        This link is quite long and is displayed on two lines.
      </Link>
    </Container>
    <strong>With ellipsis (a tooltip is displayed on hover)</strong>
    <Container>
      <Link href="https://scaleway.com" oneLine>
        This link is quite long and is cut in order to avoid two lines.
      </Link>
    </Container>
  </>
)

OneLine.parameters = {
  docs: {
    description: {
      story:
        ' `oneLine` prop will force link to be display on a single line by adding `...` after cropped text and will display a tooltip with full text when hovered.',
    },
  },
}
