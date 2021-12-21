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
  padding-left: 8px;
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
  white-space: nowrap;

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
}

const StealthCopiable: FunctionComponent<StealthCopiableProps> = ({
  children,
  side = 'right',
  copyText = 'Copy',
  copiedText = 'Copied',
}) => {
  const string = recursivelyGetChildrenString(children)

  const [isCopied, setCopied] = useClipboard(string, {
    successDuration: 5000,
  })

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
  side: PropTypes.oneOf(['left', 'right']),
}

export default StealthCopiable
