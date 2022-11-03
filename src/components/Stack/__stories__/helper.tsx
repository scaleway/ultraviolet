import styled from '@emotion/styled'

const Child = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.space['0.5']};
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
  <FirstChild>1</FirstChild>,
  <SecondChild>2</SecondChild>,
  <ThirdChild>3</ThirdChild>,
]
