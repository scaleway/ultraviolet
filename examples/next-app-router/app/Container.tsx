'use client'

import styled from '@emotion/styled'

// Limitation here you have to add "use client" on top of the file
// when using styled.
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  padding: 80px;
  grid-gap: 64px;
  gap: 64px;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.text};
`
