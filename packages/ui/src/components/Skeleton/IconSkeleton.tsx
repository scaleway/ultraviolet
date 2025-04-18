'use client'

import styled from '@emotion/styled'

export const IconSkeleton = styled.div`
  margin-right: ${({ theme }) => theme.space['1']};
  width: ${({ theme }) => theme.space['4']};
  height: ${({ theme }) => theme.space['4']};
  min-width: ${({ theme }) => theme.space['4']};
  border-radius: ${({ theme }) => theme.radii.large};
  background-color: ${({ theme }) => theme.colors.neutral.borderWeak};
`
