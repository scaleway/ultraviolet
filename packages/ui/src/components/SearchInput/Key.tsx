import styled from '@emotion/styled'
import { Text } from '../Text'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 0.5px solid ${({ theme }) => theme.colors.neutral.border};
  min-width: 24px;
  min-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
  }

  &[data-children-length='true'] {
    width: auto;
    padding: 0 ${({ theme }) => theme.space[1]}; // This part is to leave some space between the text and the border when text is long
  }
`

type KeyProps = {
  children: string
  disabled?: boolean
}

export const Key = ({ children, disabled }: KeyProps) => (
  <Container
    data-disabled={disabled}
    data-children-length={children.length > 1}
  >
    <Text as="span" variant="caption" sentiment="neutral" disabled={disabled}>
      {children}
    </Text>
  </Container>
)
