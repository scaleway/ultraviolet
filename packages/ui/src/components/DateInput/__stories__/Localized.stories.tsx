import type { DecoratorFunction } from '@storybook/addons'
import { es, fr, ru } from 'date-fns/locale'
import type { ComponentProps } from 'react'
import { DateInput } from '..'

const locales = [
  { label: 'fr-FR', locale: fr },
  { label: 'es-ES', locale: es },
  { label: 'ru-RU', locale: ru },
]

export const Localized = (props: ComponentProps<typeof DateInput>) =>
  locales.map(({ label, locale }) => (
    <DateInput {...props} onChange={() => {}} label={label} locale={locale} />
  ))

Localized.parameters = {
  docs: {
    storyDescription:
      'You can import locale from `date-fns/locale` package and pass it as `locale` prop to localize the input.',
  },
}

Localized.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', gap: 16 }}>
      <StoryComponent />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]
