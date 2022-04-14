import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'
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
  display: flex;
  position: relative;
  min-width: 0;

  &:hover ${CopyButton} {
    opacity: 1;
    cursor: pointer;
  }
`

const StyledContent = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

type StealthCopiableProps = {
  children: ReactNode
  side?: 'left' | 'right'
  copyText?: string
  copiedText?: string
}

const StealthCopiable = ({
  children,
  side = 'right',
  copyText = 'Copy',
  copiedText = 'Copied',
}: StealthCopiableProps) => {
  const string = recursivelyGetChildrenString(children)

  const [isCopied, setCopied] = useClipboard(string, {
    successDuration: 5000,
  })

  return (
    <StyledContainer>
      {side === 'right' && <StyledContent>{children}</StyledContent>}
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
      {side === 'left' && <StyledContent>{children}</StyledContent>}
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
