import type { StoryFn } from '@storybook/react-vite'
import type { Locale } from 'date-fns'
import { enGB } from 'date-fns/locale/en-GB'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { SelectInput } from '../../SelectInput'
import { DateInput } from '..'

const locales = ['en', 'fr', 'es', 'de', 'ru'] as const

type LocalSupportedType = (typeof locales)[number]

const isLocales = (locale: string): locale is LocalSupportedType =>
  locales.includes(locale as LocalSupportedType)

const loadDateFNS = async (locale: LocalSupportedType) =>
  ({
    de: (await import('date-fns/locale/de')).de,
    en: (await import('date-fns/locale/en-GB')).enGB,
    es: (await import('date-fns/locale/es')).es,
    fr: (await import('date-fns/locale/fr')).fr,
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
      <SelectInput
        label="Switch Locale"
        name="locale-switcher"
        // oxlint-disable-next-line typescript/no-misused-promises
        onChange={onChange}
        options={localesOptions}
        searchable={false}
        value={currentLocale}
      />

      <DateInput
        {...args}
        label={currentLocale}
        locale={dateFns}
        onChange={v => {
          setValue(v)
        }}
        selectsRange={false}
        value={value}
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

I18n.decorators = [
  StoryComponent => (
    <div style={{ height: '500px' }}>
      <StoryComponent />
    </div>
  ),
]
