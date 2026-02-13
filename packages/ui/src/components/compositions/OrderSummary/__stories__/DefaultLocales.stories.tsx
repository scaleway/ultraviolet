import { Snippet } from '../../../Snippet'
import locales from '../locales/en'

export const DefaultLocales = () => (
  <Snippet prefix="lines" rows={10}>
    {JSON.stringify(locales, null, 4)}
  </Snippet>
)

DefaultLocales.parameters = {
  docs: {
    description: {
      story:
        'Those are the default locales for the `OrderSummary` for the props `locales`. If you want to change them, to another language for example, you can copy those in a file and you can use the `locales` prop.',
    },
  },
}
