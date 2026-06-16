import { Toast, ToastContainer } from '..'

export default {
  component: ToastContainer,
  title: 'UI/Feedback/Toaster',
  subcomponents: {
    ToastContainer,
    'Toast.Button': Toast.Button,
    'Toast.Link': Toast.Link,
  },
  parameters: {
    a11y: false,
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
}

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { ContainerId } from './ContainerId.stories'
export { ComplexChildren } from './ComplexChildren.stories'
