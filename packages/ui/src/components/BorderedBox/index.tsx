import styled from '@emotion/styled'

export const BorderedBox = styled.div`
  padding: ${({ theme }) => theme.space['3']};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
`
