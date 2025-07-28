import { Markdown } from '@storybook/addon-docs/blocks'
import { useState } from 'react'
import ChangelogMdForm from '../../../../form/CHANGELOG.md?raw'
import ChangelogMdIcons from '../../../../icons/CHANGELOG.md?raw'
import ChangelogMdThemes from '../../../../themes/CHANGELOG.md?raw'
import ChangelogMdComponents from '../../../CHANGELOG.md?raw'
import { Stack, Tabs } from '../../components'

export const Changelog = () => {
  const [selected, setSelected] = useState<string | number>('components')
  const onChangeHandler = (e: string | number) => setSelected(e)

  return (
    <Stack gap={2}>
      <Tabs selected={selected} onChange={onChangeHandler}>
        <Tabs.Tab value="components">Components</Tabs.Tab>
        <Tabs.Tab value="form">Form</Tabs.Tab>
        <Tabs.Tab value="themes">Themes</Tabs.Tab>
        <Tabs.Tab value="icons">Icons</Tabs.Tab>
      </Tabs>

      {selected === 'components' && (
        <Markdown>{ChangelogMdComponents}</Markdown>
      )}
      {selected === 'form' && <Markdown>{ChangelogMdForm}</Markdown>}
      {selected === 'themes' && <Markdown>{ChangelogMdThemes}</Markdown>}
      {selected === 'icons' && <Markdown>{ChangelogMdIcons}</Markdown>}
    </Stack>
  )
}
