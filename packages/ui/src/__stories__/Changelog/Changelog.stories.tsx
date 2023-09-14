import { Markdown } from '@storybook/blocks'
import { useState } from 'react'
// eslint-disable-next-line import/no-relative-packages
import ChangelogMdForm from '../../../../form/CHANGELOG.md'
// eslint-disable-next-line import/no-relative-packages
import ChangelogMdIcons from '../../../../icons/CHANGELOG.md'
// eslint-disable-next-line import/no-relative-packages
import ChangelogMdThemes from '../../../../themes/CHANGELOG.md'
import ChangelogMdComponents from '../../../CHANGELOG.md'
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
