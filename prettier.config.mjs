/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 120,
  quoteProps: 'consistent',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  endOfLine: 'auto',
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  requirePragma: false,

  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^next(/.*)?$',
    'next-themes',
    '@/components/ui/*',
    '@/components/*',
    '@//*',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  overrides: [
    {
      files: ['*.html', '*.hbs', '*.css', '.sass'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.json', '.prettierrc', '.swcrc'],
      options: {
        tabWidth: 4,
      },
    },
    {
      files: ['*.jsx', '*.tsx', '*.mdx'],
      options: {
        jsxSingleQuote: true,
      },
    },
    {
      files: ['Makefile', '*.mk'],
      options: {
        useTabs: true,
        tabWidth: 4,
      },
    },
  ],
};

export default config;
