import { useTheme } from '@ultraviolet/themes'
import { Stack, Tabs } from '@ultraviolet/ui'
import type { ReactElement } from 'react'
import { Children, isValidElement, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula'
import oneLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light'
import styles from '../../styles/component.module.scss'

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
    <Stack className={styles.copyBox} gap={2}>
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
    </Stack>
  )
}

type CommandProps = {
  command: string
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
