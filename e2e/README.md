# E2E Testing

This project uses playwright to run end-to-end tests. As we are testing a library we need to setup a test environment 
for rendering the component and the test file for each test case.

> [!WARNING]  
> Not all components needs a e2e test. We only want to test specific interaction that are not covered by the unit tests.
> E2E tests can be used for testing a mix of component and see their interaction. Example: select input within a modal and vice versa.

## Structure
```
e2e
├── tests
│   ├── useCase1
│   │   ├── render.tsx # This file will render the component. File name is important!
│   │   └── test.spec.ts # This file will contain the test cases
│   ├── useCase2
│   │   ├── render.tsx
│   │   └── test.spec.ts
└── playwright.config.ts
```

What you need to understand is that for each test case you need to create a file `render.tsx` that will render the component.
And a file `test.spec.ts` that will contain the test cases run by playwright.

## Running the tests

> [!CAUTION]  
> As we are in a monorepository this project needs others projects to be built. We recommend running `pnpm test:e2e` at root level which will build all the projects and run the tests without needing to run the server.

**Please read the above caution**. You can still need to run locally especially to check the render of your component. To do so you can run the following commands:

```bash
pnpm build # at root level

cd e2e && pnpm start # This will start the server with all the components you can check the render of your own component

# In another terminal if you want to run the tests suite
cd e2e pnpm e2e # This will start the render server and run the tests

# OR
cd e2e && pnpm e2e:debug # This will run the tests in debug mode with the interface
```

> [!NOTE]  
> Test are always run on 3 different browsers: `chromium`, `firefox` and `webkit` to ensure compatibility.

## Writing E2E Tests

To write the tests and ease your life we made a template. You can copy and paste the `template` folder from `tests/template` and rename the pasted folder to the name of your test case following camelCase.

- `render.tsx`: this will be rendered in the browser and will contain the component / combination of components you want to test.
- `test.spec.ts`: this will contain the playwright test cases.
  - Do not forget to change ```await page.goto(`${baseURL}/template`)```. Where `template` is the exact same folder name this file is contained into.
  - You should export default your Render component so routing will be correctly done.
