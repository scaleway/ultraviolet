import { Table } from '@ultraviolet/ui'

export const ThemeProviderVersionsComparison = () => (
  <Table
    columns={[{ label: '' }, { label: 'v1 (@ultraviolet/themes)' }, { label: 'v2 (@ultraviolet/themes/v2)' }]}
    bordered
    stripped
  >
    <Table.Body>
      <Table.Row id="1">
        <Table.Cell>
          <strong>CSS variables</strong>
        </Table.Cell>
        <Table.Cell>
          Injected at runtime by the provider (a <code>{'<style>'}</code> tag is appended to <code>{'<head>'}</code>)
        </Table.Cell>
        <Table.Cell>
          Provided by the static CSS files (<code>light.css</code>, <code>dark.css</code>, <code>darker.css</code>) that
          must be manually imported
        </Table.Cell>
      </Table.Row>
      <Table.Row id="2">
        <Table.Cell>
          <code>theme</code> prop
        </Table.Cell>
        <Table.Cell>
          User passes the theme object, e.g. <code>consoleLightTheme</code> (<strong>required</strong>)
        </Table.Cell>
        <Table.Cell>
          Replaced by <code>initialTheme</code> (<code>light</code> / <code>dark</code> / <code>darker</code> /
          <code>system</code>). The provider manages theme internally.
        </Table.Cell>
      </Table.Row>
      <Table.Row id="3">
        <Table.Cell>
          <code>useTheme()</code> return value
        </Table.Cell>
        <Table.Cell>
          The <strong>theme object</strong> (all the CSS variables)
        </Table.Cell>
        <Table.Cell>
          <code>{'{ theme, isSystem, setTheme }'}</code> where <code>theme</code> is a string (<code>light</code>,{' '}
          <code>dark</code> or <code>darker</code>), <code>isSystem</code> a boolean (whether the theme follows user
          system), and <code>setTheme</code> a function to update the applied theme
        </Table.Cell>
      </Table.Row>
      <Table.Row id="4">
        <Table.Cell>Persistence</Table.Cell>
        <Table.Cell>None</Table.Cell>
        <Table.Cell>
          Via the <code>storageKey</code> prop (default <code>uv-theme</code>)
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)
