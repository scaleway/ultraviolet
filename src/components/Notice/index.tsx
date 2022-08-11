import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Icon from '../Icon'
import MarkDown from '../MarkDown'

const Container = styled.div`
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};
`

type NoticeProps = {
  children: ReactNode
  className?: string
}

const Notice = ({ children, className }: NoticeProps) => (
  <Container className={className}>
    <Icon name="information-outline" verticalAlign="top" size={20} />
    {typeof children === 'string' ? (
      <MarkDown source={children} linkTarget="_blank" />
    ) : null}
  </Container>
)

export default Notice
