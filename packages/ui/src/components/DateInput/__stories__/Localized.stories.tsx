import { es, fr, ru } from 'date-fns/locale'

import { DateInput } from '..'

import { Template } from './Template'

import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

const locales = [
  { label: 'fr-FR', locale: fr },
  { label: 'es-ES', locale: es },
  { label: 'ru-RU', locale: ru },
]

export const Localized = (props: ComponentProps<typeof DateInput>) =>
  locales.map(({ label, locale }) => (
    <DateInput
      key={label}
      {...props}
      label={label}
      locale={locale}
      onChange={() => {}}
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
