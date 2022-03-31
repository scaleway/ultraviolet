import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FunctionComponent } from 'react'
import { down, up } from '../utilities'

export const WithStyled = styled.div`
  background-color: red;
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: center;

  ${down(
    'large',
    `
    background-color: blue;
  `,
  )}

  ${down(
    'medium',
    `
    background-color: green;
  `,
  )}

  ${down(
    'small',
    `
    background-color: yellow;
  `,
  )}
`

const responsiveClass = css`
  background-color: red;
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: center;

  ${up(
    'small',
    `
    background-color: blue;
  `,
  )}

  ${up(
    'medium',
    `
    background-color: green;
  `,
  )}

  ${up(
    'large',
    `
    background-color: yellow;
  `,
  )}
`

export const WithCss: FunctionComponent = props => (
  <div css={responsiveClass} {...props} />
)
