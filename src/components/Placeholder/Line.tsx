import styled from '@emotion/styled'

const sizes = [80, 120, 160, 200]

const randomSize = () => sizes[Math.floor(Math.random() * sizes.length) + 1]

const Line = styled.div`
  height: 12px;
  width: ${() => randomSize()}px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.background};
`

export default Line
