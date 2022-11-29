import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Stack, Tabs } from '@scaleway/ui'
import {
  Children,
  ReactElement,
  cloneElement,
  isValidElement,
  useState,
} from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  dracula,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

const StyledDiv = styled(Stack)`
  background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  span {
    background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  }

  .react-syntax-highlighter-line-number {
    font-style: normal !important;
  }
  padding: ${({ theme }) => `${theme.space['2']} ${theme.space['3']}`};
  border-radius: ${({ theme }) => theme.radii.default};
`

interface CopyBoxProps {
  children: ReactElement<CommandProps> | ReactElement<CommandProps>[]
}

const CopyBox = ({ children }: CopyBoxProps) => {
  const flatChild = (
    Children.map(children, child =>
      isValidElement(child) ? child : undefined,
    ) || []
  ).filter(child => !!child)
  const [tab, setTab] = useState(0)

  return (
    <StyledDiv gap={2}>
      {flatChild.length > 1 && (
        <Tabs
          selected={tab + 1}
          onChange={value => {
            if (typeof value === 'number') {
              setTab(value - 1)
            }
          }}
        >
          {flatChild.map(({ props: { title } }, index) => (
            <Tabs.Tab key={`tab-${title}`} value={index + 1}>
              {title}
            </Tabs.Tab>
          ))}
        </Tabs>
      )}
      {cloneElement(flatChild[tab])}
    </StyledDiv>
  )
}

interface CommandProps {
  command: string
  // eslint-disable-next-line react/no-unused-prop-types
  title: string
  showLineNumbers?: boolean
}

const Command = ({ command, showLineNumbers = true }: CommandProps) => {
  const { theme } = useTheme()

  return (
    <div>
      <SyntaxHighlighter
        language="typescript"
        style={theme === 'light' ? oneLight : dracula}
        customStyle={{ background: 'none', fontSize: '14px', padding: 0 }}
        lineProps={{
          style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
        }}
        wrapLines
        showLineNumbers={showLineNumbers}
      >
        {command}
      </SyntaxHighlighter>
    </div>
  )
}

CopyBox.Command = Command

export default CopyBox
