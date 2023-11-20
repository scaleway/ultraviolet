import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Stack } from '../Stack'

type GlobalAlertProps = {
  children: ReactNode
  sentiment?: 'info' | 'danger' | 'promotional'
}

const Container = styled(Stack)`
  width: 100%;
  height: 56px;
  padding: 0 ${({ theme }) => theme.space['2']};

  &[data-sentiment='info'] {
    background-color: ${({ theme }) => theme.colors.info.background};
  }

  &[data-sentiment='danger'] {
    background-color: ${({ theme }) => theme.colors.danger.background};
  }

  &[data-sentiment='promotional'] {
    background-color: ${({ theme }) =>
      theme.colors.other.gradients.background.aqua};
  }
`

export const GlobalAlert = ({
  children,
  sentiment = 'info',
}: GlobalAlertProps) => (
  <Container
    justifyContent="center"
    alignItems="center"
    flex={1}
    data-sentiment={sentiment}
  >
    {children}
  </Container>
)
