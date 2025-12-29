import { Markdown } from '@storybook/addon-docs/blocks'
import { Stack, Tabs } from '@ultraviolet/ui'
import { useState } from 'react'
import ChangelogMdForm from '../../../../packages/form/CHANGELOG.md?raw'
import ChangelogMdIcons from '../../../../packages/icons/CHANGELOG.md?raw'
import ChangelogMdPlus from '../../../../packages/plus/CHANGELOG.md?raw'
import ChangelogMdThemes from '../../../../packages/themes/CHANGELOG.md?raw'
import ChangelogMdUi from '../../../../packages/ui/CHANGELOG.md?raw'

export const Changelog = () => {
  const [selected, setSelected] = useState<string | number>('components')
  const onChangeHandler = (e: string | number) => setSelected(e)

  return (
    <Stack gap={2}>
      <Tabs onChange={onChangeHandler} selected={selected}>
        <Tabs.Tab value="components">Components</Tabs.Tab>
        <Tabs.Tab value="form">Form</Tabs.Tab>
        <Tabs.Tab value="themes">Themes</Tabs.Tab>
        <Tabs.Tab value="icons">Icons</Tabs.Tab>
        <Tabs.Tab value="plus">Plus</Tabs.Tab>
      </Tabs>

      {selected === 'ui' ? <Markdown>{ChangelogMdUi}</Markdown> : null}
      {selected === 'form' ? <Markdown>{ChangelogMdForm}</Markdown> : null}
      {selected === 'themes' ? <Markdown>{ChangelogMdThemes}</Markdown> : null}
      {selected === 'icons' ? <Markdown>{ChangelogMdIcons}</Markdown> : null}
      {selected === 'plus' ? <Markdown>{ChangelogMdPlus}</Markdown> : null}
    </Stack>
  )
}

export default Changelog
