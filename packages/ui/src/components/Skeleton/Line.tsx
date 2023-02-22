import styled from '@emotion/styled'

const sizes = [80, 120, 160, 200]

const randomSize = () => sizes[Math.floor(Math.random() * sizes.length)]

export const Line = styled.div`
  height: 12px;
  width: ${() => randomSize()}px;
  max-width: 100%;
  border-radius: ${({ theme }) => theme.radii.large};
  background-color: ${({ theme }) => theme.colors.neutral.borderWeak};
`
