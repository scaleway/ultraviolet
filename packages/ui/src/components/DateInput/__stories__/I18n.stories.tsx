import type { StoryFn } from '@storybook/react'
import type { Locale } from 'date-fns'
import { enGB } from 'date-fns/locale/en-GB'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { DateInput } from '..'
import { SelectInputV2 } from '../../SelectInputV2'

const locales = ['en', 'fr', 'es', 'de', 'ru'] as const

type LocalSupportedType = (typeof locales)[number]

const isLocales = (locale: string): locale is LocalSupportedType =>
  locales.includes(locale as LocalSupportedType)

const loadDateFNS = async (locale: LocalSupportedType) =>
  ({
    en: (await import('date-fns/locale/en-GB')).enGB,
    fr: (await import('date-fns/locale/fr')).fr,
    es: (await import('date-fns/locale/es')).es,
    de: (await import('date-fns/locale/de')).de,
    ru: (await import('date-fns/locale/ru')).ru,
  })[locale] ?? (await import('date-fns/locale/en-GB')).enGB

const localesOptions = locales.map(locale => ({
  label: locale,
  value: locale,
}))

export const I18n: StoryFn<ComponentProps<typeof DateInput>> = args => {
  const [currentLocale, setCurrentLocale] = useState<LocalSupportedType>(
    locales[0],
  )
  const [value, setValue] =
    useState<ComponentProps<typeof DateInput>['value']>(undefined)

  const [dateFns, setDateFns] = useState<Locale>(enGB)

  const onChange = async (locale: string) => {
    if (isLocales(locale)) {
      setCurrentLocale(locale)
      setDateFns(await loadDateFNS(locale))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SelectInputV2
        name="locale-switcher"
        label="Switch Locale"
        searchable={false}
        options={localesOptions}
        value={currentLocale}
        onChange={onChange}
      />

      <DateInput
        {...args}
        locale={dateFns}
        value={value}
        onChange={v => {
          setValue(v as Date)
        }}
        label={currentLocale}
        selectsRange={false}
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
