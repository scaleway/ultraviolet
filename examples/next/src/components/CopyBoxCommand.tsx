import styled from '@emotion/styled'
import { useTheme } from '@ultraviolet/themes'
import { Stack, Tabs } from '@ultraviolet/ui'
import type { ReactElement } from 'react'
import { Children, isValidElement, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  dracula,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

const StyledStack = styled(Stack)`
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

type CopyBoxProps = {
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
    <StyledStack gap={2}>
      {flatChild.length > 1 ? (
        <Tabs
          onChange={value => {
            if (typeof value === 'number') {
              setTab(value)
            }
          }}
          selected={tab}
        >
          {flatChild.map(({ props: { title } }, index) => (
            <Tabs.Tab key={`tab-${title}`} value={index}>
              {title}
            </Tabs.Tab>
          ))}
        </Tabs>
      ) : null}
      {flatChild[tab]}
    </StyledStack>
  )
}

type CommandProps = {
  command: string
  // eslint-disable-next-line react/no-unused-prop-types
  title: string
  showLineNumbers?: boolean
}

const Command = ({ command, showLineNumbers = true }: CommandProps) => {
  const { theme } = useTheme()

  return (
    <SyntaxHighlighter
      customStyle={{ background: 'none', fontSize: '14px', padding: 0 }}
      language="typescript"
      lineProps={{
        style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
      }}
      showLineNumbers={showLineNumbers}
      style={theme === 'light' ? oneLight : dracula}
    >
      {command}
    </SyntaxHighlighter>
  )
}

CopyBox.Command = Command

export default CopyBox
