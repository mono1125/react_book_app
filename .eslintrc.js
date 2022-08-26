module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 順番には意味があるので注意
    // 設定ルールの値が衝突したら後に記述されたものが優先される
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks'],
  root: true,
  rules: {
    // ESLintの組み込みルールの一覧: https://eslint.org/docs/rules

    // 定義前の変数の使用を禁じるESLint, TypeScript ESLintのルール
    // -> import React from 'react'でエラーが出るのを回避
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // 式としてのvoid演算子の使用を禁止するルール
    // -> EffectHook内で非同期処理を記述する際に@typescript-eslint/no-floating-promises
    // ルールに抵触してしまうのを回避するのにvoid文を記述する必要があるため文としての使用を許可をしている。
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    // 任意の構文の間に区切りの空行を入れるかどうかを定義するルール
    // -> return文の前に常に空行を入れるように設定
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    // 使用していない変数の定義を許さないルール
    // -> 変数名を_にしたときのみ許容するように変更
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '_',
        ignoreRestSiblings: false,
        varsIgnorePattern: '_',
      },
    ],
    // インポートの際にファイル拡張子を記述するかを定義するルール
    // -> npmパッケージ以外のファイルについて.js, .jsx, .ts. ,tsxのファイルのみ拡張子を省略し
    // 他のファイルは拡張子を記述させるように設定
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // JSXのファイルファイル拡張子を制限するルール
    // -> eslint-config-airbnbで.jsxのみに限定されているため.tsxを追加
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    // JSXでコンポネントを呼ぶときのpropsの記述にスプレッド構文を許さないルール
    // -> eslint-config-airbnbにてすべて禁止されているが、<Foo {...{bar, baz}} />のように
    // 個々のpropsを明記する書き方のみ許容するように変更
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
      },
    ],
    // JSX記述を使用する場合にreactモジュールをReactとしてインポートすることを強制するルール
    // -> 新しいJSX変換形式を用いる場合はインポートが不要になるためこの設定を無効化する
    'react/react-in-jsx-scope': 'off',
    // 関数コンポネントの関数タイプに関するルール
    // namedComponents, unnamedComponentsにそれぞれ使用する関数宣言タイプを指定する
    // (Default) namedComponent: function-declaration
    // (Default) unnamedComponents: function-expression
    // -> 明示的に arrow-functionとすることでアロー関数でのコンポネント宣言を適用する
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        // コンポネントのpropsに型チェックを行うためのpropTypesプロパティの定義を強制するルール
        // -> TypeScriptでは無効に設定
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    // tsconfig.jsonでsrc/配下のファイルを絶対パスでインポートできるように設定したが
    // eslint-plugin-importがその絶対パスを解決できずにエラーを出す。
    // そのため、eslint-plugin-importが内部で使用しているeslint-import-resolver-nodeという
    // モジュール解決プラグインに対してパスにsrcを追加している
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
