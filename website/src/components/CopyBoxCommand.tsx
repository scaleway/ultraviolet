import styled from '@emotion/styled'
import { TabGroup } from '@scaleway/ui'
import React, { ReactElement, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from './CopyButton'

const StyledDiv = styled.div`
  box-shadow: 0 0 8px 2px rgba(178, 182, 195, 0.37);
  background-color: #0e1120;
  padding: 16px 24px;
  border-radius: 4px;
  [role='tab'][aria-selected='true'],
  [role='tab']:hover {
    color: ${({ theme }) => theme.colors.primary.textStrong};
  }
`

const StyledCopyButton = styled(CopyButton, {
  shouldForwardProp: prop => !['showCopyButton'].includes(prop.toString()),
})<{ showCopyButton: boolean }>`
  position: absolute;
  right: 16px;
  bottom: 8px;
  opacity: ${({ showCopyButton }) => (showCopyButton ? '1' : '0')};
  transition: opacity 200ms ease;
`

interface CopyBoxProps {
  onChange?: (data?: unknown) => void
  children: ReactElement<CommandProps> | ReactElement<CommandProps>[]
}

const CopyBox = ({
  onChange = () => undefined,
  children,
}: CopyBoxProps): JSX.Element => {
  const flatChild = (
    React.Children.map(children, child =>
      React.isValidElement(child) ? child : undefined,
    ) || []
  ).filter(child => !!child)
  const [showCopyButton, setShowCopyButton] = useState(false)
  const [tab, setTab] = useState(0)

  return (
    <StyledDiv
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}
    >
      {flatChild.length > 1 && (
        <TabGroup
          selected={tab}
          onChange={value => {
            if (typeof value === 'number') {
              setTab(value)
            }
            onChange(value)
          }}
          mb={3}
        >
          {flatChild.map(({ props: { title } }) => (
            <TabGroup.Tab key={`tab-${title}`}>{title}</TabGroup.Tab>
          ))}
        </TabGroup>
      )}
      {React.cloneElement(flatChild[tab], {
        showCopyButton,
      })}
    </StyledDiv>
  )
}

interface CommandProps {
  command: string
  // eslint-disable-next-line react/no-unused-prop-types
  title: string
  showCopyButton?: boolean
  showLineNumbers?: boolean
}

const Command = ({
  command,
  showCopyButton = false,
  showLineNumbers = true,
}: CommandProps): JSX.Element => (
  <>
    <SyntaxHighlighter
      language="jsx"
      style={darcula}
      customStyle={{ background: 'none', fontSize: '14px', padding: 0 }}
      showLineNumbers={showLineNumbers}
    >
      {command}
    </SyntaxHighlighter>
    <StyledCopyButton text={command} showCopyButton={showCopyButton} />
  </>
)

CopyBox.Command = Command

export default CopyBox
