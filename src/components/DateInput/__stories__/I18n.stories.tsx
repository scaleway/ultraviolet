import { useI18n } from '@scaleway/use-i18n'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import DateInput from '..'
import type { SelectOption } from '../../RichSelect'
import RichSelect from '../../RichSelect'

export const I18n: Story<ComponentProps<typeof DateInput>> = () => {
  const { locales, currentLocale, switchLocale, dateFnsLocale } = useI18n()

  if (!dateFnsLocale) {
    return <>Loading</>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <RichSelect
        name="locale-switcher"
        isSearchable={false}
        value={{
          label: currentLocale,
          value: currentLocale,
        }}
        onChange={value => {
          switchLocale((value as SelectOption).value)
        }}
        noTopLabel
      >
        {locales.map(locale => (
          <RichSelect.Option value={locale} key={locale}>
            {locale}
          </RichSelect.Option>
        ))}
      </RichSelect>
      <DateInput onChange={() => {}} label={currentLocale} />
    </div>
  )
}

I18n.parameters = {
  docs: {
    storyDescription:
      'If you use our `useI18n` hook you can easily handle localization change on the input by getting `currentLocale` returned by the hook.',
  },
}
