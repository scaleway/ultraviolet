import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react-vite'
import { Text } from '../index'

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.space['2']};
  margin-top: ${({ theme }) => theme.space['1']};
  width: 200px;
  background: ${({ theme }) => theme.colors.info.background};
  padding: ${({ theme }) => theme.space['1']};
`

export const OneLine: StoryFn<typeof Text> = args => (
  <>
    <strong>Without ellipsis</strong>
    <Container>
      <Text {...args} as="div" variant="body">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </Container>
    <strong>With ellipsis (a tooltip is displayed on hover)</strong>
    <Container>
      <Text {...args} as="div" variant="body" oneLine>
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </Container>
  </>
)

OneLine.parameters = {
  docs: {
    description: {
      story:
        ' `oneLine` prop will force text to be display on a single line by adding `...` after cropped text and will display a tooltip with full text when hovered.',
    },
  },
}
