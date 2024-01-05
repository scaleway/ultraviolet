import { useI18n } from '@scaleway/use-i18n'
import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateInput } from '..'
import type { SelectOption } from '../../SelectInput'
import { SelectInput } from '../../SelectInput'

export const I18n: StoryFn<ComponentProps<typeof DateInput>> = args => {
  const { locales, currentLocale, switchLocale, dateFnsLocale } = useI18n()

  if (!dateFnsLocale) {
    return <>Loading</>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SelectInput
        name="locale-switcher"
        isSearchable={false}
        value={{
          label: currentLocale,
          value: currentLocale,
        }}
        onChange={value => {
          switchLocale((value as SelectOption).value)
            .then()
            .catch(() => null)
        }}
        noTopLabel
      >
        {locales.map(locale => (
          <SelectInput.Option value={locale} key={locale}>
            {locale}
          </SelectInput.Option>
        ))}
      </SelectInput>
      <DateInput
        {...args}
        locale={dateFnsLocale}
        onChange={() => {}}
        label={currentLocale}
      />
    </div>
  )
}

I18n.parameters = {
  docs: {
    description: {
      story:
        'If you use our `useI18n` hook you can easily handle localization change on the input by getting `currentLocale` returned by the hook.',
    },
  },
}
