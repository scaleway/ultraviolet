import styled from '@emotion/styled'

/**
 * @deprecated BorderedBox and Containers where quite similar they have been merged into a single component called Card, use this component instead.
 */
export const BorderedBox = styled.div`
  padding: ${({ theme }) => theme.space['3']};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
`
