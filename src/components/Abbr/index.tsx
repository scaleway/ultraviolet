import styled from '@emotion/styled'
import React from 'react'

// See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr#default_styling
// for the default styling of the <abbr> element.
const StyledAbbr = styled.abbr`
  font-variant: none;
`

export type AbbrProps = {
  children: string
  title?: string
}

const Abbr = ({ children, title }: AbbrProps): JSX.Element => (
  <StyledAbbr title={title}>{children}</StyledAbbr>
)

export default Abbr
