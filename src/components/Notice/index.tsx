import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import Box, { XStyledProps } from '../Box'
import Icon from '../Icon'
import MarkDown from '../MarkDown'

const Container = styled(Box)`
  color: ${({ theme: { colorsDeprecated } }) => colorsDeprecated.gray550};
  font-size: 12px;
  display: flex;
  align-items: center;
`
type NoticeProps = {
  children: ReactNode
} & XStyledProps

const Notice: FunctionComponent<NoticeProps> = ({ children, ...props }) => (
  <Container {...props}>
    <Icon name="information-outline" verticalAlign="top" mr={1} size={20} />
    {typeof children === 'string' ? (
      <MarkDown source={children} linkTarget="_blank" />
    ) : null}
  </Container>
)
Notice.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Notice
