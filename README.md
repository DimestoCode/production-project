## Project Launch

```
npm ci - installing dependencies
npm run start:dev or npm run start:dev:vite - launching the server + frontend project
```

----

## Scripts

- `npm run start` - Launching the project using webpack-dev-server
- `npm run start:vite` - Launching the project using vite
- `npm run start:dev` - Launching both backend and frontend parts of application using webpack-dev-server
- `npm run start:dev:vite` - Launching both backend and frontendt parts of application using vite
- `npm run start:dev:server` - Launching backend server
- `npm run build:prod` - Assembling the production bundle
- `npm run build:dev` - Assembling the dev bundle
- `npm run lint:ts` - ESLint check
- `npm run lint:ts:fix` - ESLint check + fix
- `npm run lint:scss` - Stylelint check
- `npm run lint:scss:fix` - Stylelint check + fix
- `npm run test:unit` - Run Jest unit tests
- `npm run test:ui` - Run the screenshot tests with Lost-Pixel
- `npm run test:ui:ok` - Approval the new screenshots
- `npm run storybook` - Launch the Storybook
- `npm run storybook:build` - Build Storybook artifacts
- `npm run prepare` - Pre-commit hooks
- `npm run generate:slice` - Generation FSD slice

----

## Architecture of the Project

The Project is implemented based on Feature Sliced Design.

Documentation Reference - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Translations

I18next library is used to translate the application's content. Translations are contained in public/locales folder.

The VSCode extension I18n-ally is recommended to install to enhance the developer experience.

Documentation of i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Tests

Four types of tests are used in this project:
1) Jest unit testing - `npm run test:unit`
2) Component tests using RTL -`npm run test:unit`
3) Screenshot testing with lost-pixel `npm run test:ui`
4) Cypress e2e tests - `npm run test:e2e`

You can learn more details about the project's testing here - [Testing Documentation](/docs/tests.md)

----

## Linting

ESLint is used to check Typescript code and StyleLint is applied to check files that contain styles.

The custom eslint plugin *eslint-plugin-fsd-path-checker-by-dandoniev* is used to enforce abidance the main architecture principles which underlie FSD methodology. The plugin consist of 3 rules:
1) fsd-path-checker - forbid the usage of absolute imports in the scope of one module
2) fsd-layer-imports - revise validity of layers usage from the FSD perspective 
    (e.g., widgets cannot be used in features or entity layers)
3) fsd-public-api-imports - enforce other module imports solely from the public API. Have auto-fix.

##### Launch the linters
- `npm run lint:ts` - ESLint checks ts and tsx files
- `npm run lint:ts:fix` - ESLint checks ts and tsx files + fixes them
- `npm run lint:scss` - Stylelint checks scss files
- `npm run lint:scss:fix` - Stylelint check scss file + fixes them

----
## Storybook

Storycase for each component should be described in the Storybook.
Server requests are mocked using msw and msw-storybook-addon.

Storycase files should have an extensions .stories.tsx

Execute following command to run the storybook:
- `npm run storybook`

Learn more about [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```


----

## Project configuration

Project contains 2 configs for development:
1. Webpack - ./config/build
2. vite - vite.config.ts

Both bundlers are configured for the primary features of the application.

All configurations files are stored in /config
- /config/babel - babel config
- /config/build - webpack config
- /config/jest - test environment config
- /config/storybook - storybook config

`Scripts` folder stores different stores different scripts for automated refactoring \ reports generation \ coding process simplifications etc.

----

## CI pipeline and pre commit hooks

Configuration of  github actions is stored in /.github/workflows.
CI pipeline runs all types of tests, lintings, builds the project and storybook.

Pre commit hooks runs the linters and unit tests, config is stored in /.husky

----

### Data operations

Redux Toolkit is used to manipulate data. Reused entities should be normalized with Entity Adapter, if possible.


[RTK query](/src/shared/api/rtkApi.ts) is used for requests to server.

To enforce async loading of redux reducers the following hook is introduced
[useDynamicModuleLoader](/src/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader.tsx)

----


## Entities

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features

- [AddCommentForm](/src/features/AddCommentForm)
- [ArticleEditForm](/src/features/ArticleEditForm)
- [ArticleRating](/src/features/ArticleRating)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
- [ArticleSortSelector](/src/features/ArticleSortSelector)
- [ArticleTypeTabs](/src/features/ArticleTypeTabs/)
- [EditableProfileCard](/src/features/EditableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [NotificationButton](/src/features/NotificationButton)
- [ProfileRating](/src/features/ProfileRating)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [AuthByUsername](/src/features/AuthByUsername)
