import { useI18n } from '@scaleway/use-i18n'
import { Meta, Story } from '@storybook/react'
import { es, fr, ru } from 'date-fns/locale'
import { ComponentProps } from 'react'
import DateInput from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import RichSelect from '../../RichSelect'

export default {
  component: DateInput,
  decorators: [
    Stories => (
      <div style={{ height: 360 }}>
        <Stories />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A date input based on `react-datepicker.`',
      },
    },
  },
  title: 'Components/Data Entry/DateInput',
} as Meta

const Template: Story<ComponentProps<typeof DateInput>> = args => (
  <DateInput {...args} />
)

export const Default = Template.bind({})

export const Uncontrolled = Template.bind({})
Uncontrolled.parameters = {
  docs: {
    storyDescription:
      'DateInput can be used as an [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html).',
  },
}
Uncontrolled.decorators = [() => <DateInput onChange={() => {}} label="Date" />]

export const Controlled = Template.bind({})
Controlled.parameters = {
  docs: {
    storyDescription:
      'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html#controlled-components). By passing `value` and `onChange` prop you can control it.',
  },
}
Controlled.decorators = [
  () => (
    <ControlValue value={new Date('December 17, 1995 03:24:00')}>
      {({ value, onChange }) => (
        <DateInput label="Date" value={value} onChange={onChange} />
      )}
    </ControlValue>
  ),
]

export const Error = Template.bind({})
Error.parameters = {
  docs: {
    storyDescription:
      'Use `error` prop to style the input when the field is invalid.',
  },
}
Error.decorators = [
  () => (
    <DateInput onChange={() => {}} label="Error" error="This is an error" />
  ),
]

export const Disabled = Template.bind({})
Disabled.decorators = [
  () => <DateInput onChange={() => {}} label="Disabled" disabled />,
]

export const Required = Template.bind({})
Required.decorators = [
  () => <DateInput onChange={() => {}} label="Required" required />,
]

export const Localized = Template.bind({})
Localized.parameters = {
  docs: {
    storyDescription:
      'You can import locale from `date-fns/locale` package and pass it as `locale` prop to localize the input.',
  },
}
Localized.decorators = [
  () => (
    <>
      <div style={{ marginBottom: 16 }}>
        <DateInput onChange={() => {}} label="fr-FR" locale={fr} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <DateInput onChange={() => {}} label="es-ES" locale={es} />
      </div>
      <DateInput onChange={() => {}} label="ru-RU" locale={ru} />
    </>
  ),
]

export const I18n = Template.bind({})
I18n.parameters = {
  docs: {
    storyDescription:
      'If you use our `useI18n` hook you can easily handle localization change on the input by getting `currentLocale` returned by the hook.',
  },
}
I18n.decorators = [
  () => {
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
          onChange={({ value }: { value: string }) => switchLocale(value)}
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
  },
]

export const MinMax = Template.bind({})
MinMax.parameters = {
  docs: {
    storyDescription:
      'With `minDate` and `maxDate` you can define limits of the input',
  },
}
MinMax.decorators = [
  () => (
    <DateInput
      onChange={() => {}}
      label="Date"
      value={new Date('1995-12-17T03:24:00')}
      minDate={new Date('December 12, 1995 03:24:00')}
      maxDate={new Date('December 25, 1995 03:24:00')}
    />
  ),
]
