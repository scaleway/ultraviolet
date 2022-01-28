import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import useClipboard from 'react-use-clipboard'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'

const CopyButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary.textWeak};
  display: inline-block;
  padding: 0 ${({ theme }) => theme.space[1]};
  line-height: 1;
  opacity: 0;
  z-index: 100;

  &:focus {
    opacity: 1;
  }
`

const UnselectableSpan = styled.span`
  user-select: none;
`

const StyledContainer = styled.div`
  display: block;
  position: relative;

  &:hover ${CopyButton} {
    opacity: 1;
    cursor: pointer;
  }
`

type StealthCopiableProps = {
  children: ReactNode
  side?: 'left' | 'right'
  copyText?: string
  copiedText?: string
  hide?: boolean
}

const StealthCopiable: FunctionComponent<StealthCopiableProps> = ({
  children,
  side = 'right',
  copyText = 'Copy',
  copiedText = 'Copied',
  hide = false,
}) => {
  const string = recursivelyGetChildrenString(children)

  const [isCopied, setCopied] = useClipboard(string, {
    successDuration: 5000,
  })

  if (hide) return <StyledContainer>{children}</StyledContainer>

  return (
    <StyledContainer>
      {side === 'right' && children}
      <UnselectableSpan>
        <CopyButton
          onClick={setCopied}
          tabIndex={0}
          type="button"
          aria-live="polite"
        >
          {isCopied ? copiedText : copyText}
        </CopyButton>
      </UnselectableSpan>
      {side === 'left' && children}
    </StyledContainer>
  )
}

StealthCopiable.propTypes = {
  children: PropTypes.node.isRequired,
  copiedText: PropTypes.string,
  copyText: PropTypes.string,
  hide: PropTypes.bool,
  side: PropTypes.oneOf(['left', 'right']),
}

export default StealthCopiable
