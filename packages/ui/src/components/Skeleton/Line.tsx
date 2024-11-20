import styled from '@emotion/styled'

const sizes = ['5rem', '7.5rem', '10rem', '12.5rem']

const randomSize = () => sizes[Math.floor(Math.random() * sizes.length)]

export const Line = styled.div`
  height: ${({ theme }) => theme.sizing['150']};
  width: ${() => randomSize()};
  max-width: 100%;
  border-radius: ${({ theme }) => theme.radii.large};
  background-color: ${({ theme }) => theme.colors.neutral.borderWeak};
`
