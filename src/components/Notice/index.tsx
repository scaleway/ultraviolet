import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Icon from '../Icon'
import Markdown from '../Markdown'

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
    <Icon name="information-outline" size={20} />
    {typeof children === 'string' ? (
      <Markdown source={children} linkTarget="_blank" />
    ) : null}
  </Container>
)

export default Notice
