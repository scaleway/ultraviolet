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
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
}

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { ContainerId } from './ContainerId.stories'
export { ComplexChildren } from './ComplexChildren.stories'
