import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import Box, { BoxProps } from '../Box'
import Icon from '../Icon'
import MarkDown from '../MarkDown'

const Container = styled(Box)`
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  font-size: 12px;
  display: flex;
  align-items: center;
`

type NoticeProps = {
  children: ReactNode | string
} & BoxProps

const Notice = ({ children, ...props }: NoticeProps) => (
  <Container {...props}>
    <Icon name="information-outline" verticalAlign="top" mr={1} size={20} />
    {typeof children === 'string' ? (
      <MarkDown source={children} linkTarget="_blank" />
    ) : null}
  </Container>
)

export default Notice
