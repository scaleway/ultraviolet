import styled from '@emotion/styled'

export const DivWithBackground = styled.div`
  padding: ${({ theme }) => theme.space[1]};
  background: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.primary.text};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.primary.border};
  display: flex;
  align-items: center;
  justify-content: center;
  &[data-width-full="true"] {
    width: 100%;
  }
`
