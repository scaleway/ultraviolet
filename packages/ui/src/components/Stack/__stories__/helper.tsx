import styled from '@emotion/styled'

const Child = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
`

const FirstChild = styled(Child)`
  background-color: ${({ theme }) => theme.colors.info.background};
  color: ${({ theme }) => theme.colors.info.text};
`

const SecondChild = styled(Child)`
  background-color: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.primary.text};
`

const ThirdChild = styled(Child)`
  background-color: ${({ theme }) => theme.colors.warning.background};
  color: ${({ theme }) => theme.colors.warning.text};
`

export const coloredChildren = [
  <FirstChild key="1">1</FirstChild>,
  <SecondChild key="2">2</SecondChild>,
  <ThirdChild key="3">3</ThirdChild>,
]
