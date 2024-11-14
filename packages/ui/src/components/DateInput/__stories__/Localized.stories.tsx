import type { Decorator } from '@storybook/react'
import { es, fr, ru } from 'date-fns/locale'
import type { ComponentProps } from 'react'
import { DateInput } from '..'
import { Template } from './Template'

const locales = [
  { label: 'fr-FR', locale: fr },
  { label: 'es-ES', locale: es },
  { label: 'ru-RU', locale: ru },
]

export const Localized = (props: ComponentProps<typeof DateInput>) =>
  locales.map(({ label, locale }) => (
    <DateInput
      {...props}
      key={label}
      onChange={() => {}}
      label={label}
      locale={locale}
    />
  ))

Localized.args = Template.args

Localized.parameters = {
  docs: {
    description: {
      story:
        'You can import locale from `date-fns/locale` package and pass it as `locale` prop to localize the input.',
    },
  },
}

Localized.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', gap: 16, height: '400px' }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]
