'use client'

import styled from '@emotion/styled'
import { Separator as UVSeparator } from '@ultraviolet/ui'

const StyledSeparator = styled(UVSeparator)`
  margin: ${({ theme }) => `${theme.space['2']} -${theme.space['2']}`};
`

export const Separator = () => <StyledSeparator />
