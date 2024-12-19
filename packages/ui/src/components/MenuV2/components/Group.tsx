import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Text } from '../../Text'

const Container = styled.span`
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1.5']}`};
  text-align: left;
`

type GroupProps = {
  label: string
  children: ReactNode
}

export const Group = ({ label, children }: GroupProps) => (
  <>
    <Container>
      <Text
        variant="captionStrong"
        as="span"
        prominence="weak"
        sentiment="neutral"
      >
        {label}
      </Text>
    </Container>
    {children}
  </>
)
