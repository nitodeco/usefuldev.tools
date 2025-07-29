<div align="center">
  <img src="public/favicon-192.png" alt="Useful Dev Tools Logo" width="120" height="120">
  
# Useful Dev Tools
  
  **A collection of useful, client-side tools for developers**
  
  [![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black.svg)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  
  [🌐 Live Demo](https://usefuldev.tools) | [📱 Report Bug](https://github.com/nitodeco/usefuldev.tools/issues) | [✨ Request Feature](https://github.com/nitodeco/usefuldev.tools/issues)
</div>

## 🚀 Features

Useful Dev Tools provides a comprehensive suite of developer utilities, all running client-side for privacy and speed:

- **Hash Generator** - Generate MD5, SHA-256, SHA-512, bcrypt, and xxHash hashes
- **Base64 Converter** - Encode/decode text and files to/from Base64
- **UUID Generator** - Generate UUIDs in multiple versions (v1, v4, v6, v7)
- **Regex Tester** - Test regular expressions with real-time validation and character analysis
- **CSV/JSON Converter** - Convert between CSV and JSON formats with customizable options
- **Markdown Converter** - Convert between Markdown and HTML with live preview
- **URL Encoder/Decoder** - Encode and decode URLs with component-level encoding options

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.4.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1.11](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) + Custom components
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode)
- **Testing**: [Vitest](https://vitest.dev/)
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher (latest LTS recommended)
- [pnpm](https://pnpm.io/) package manager (recommended)

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/nitodeco/usefuldev.tools.git
   cd usefuldev.tools
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 🏗️ Project Structure

```bash
usefuldev.tools/
├── public/ # Static assets
├── src/
│ ├── app/ # Next.js App Router pages
│ ├── components/ # React components
│ │ ├── atoms/ # Basic UI components
│ │ ├── molecules/ # Composed components
│ │ ├── organisms/ # Complex components
│ │ ├── pages/ # Page-specific components
│ │ ├── providers/ # Context providers
│ │ └── ui/ # Shadcn/ui components
│ ├── config/ # Configuration files
│ ├── hooks/ # Custom React hooks
│ ├── i18n/ # Internationalization
│ ├── lib/ # Utility functions
│ ├── messages/ # Translation files
│ └── types/ # Type definitions
├── package.json
└── ...config files
```

## 🚀 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm reset` - Clean install (removes node_modules, .next, dist)

## 🔧 Development

### Code Quality

- **ESLint** with Next.js, TypeScript, and Tailwind CSS rules
- **Prettier** for consistent code formatting
- **Husky** for Git hooks
- **Commitlint** for enforcing conventional commit messages

### Testing

Tests are written using Vitest and are configured to run in different environments:

- Node.js environment for utility functions (`.test.ts`)
- jsdom environment for React components (`.test.tsx`)

### Internationalization

The project uses `next-intl` for internationalization. Currently supports:

- English (en) - Default language

Translation files are located in `src/messages/`. Contributions are welcome!

## 🌐 Deployment

The application is designed to be deployed as a static site and can be hosted on any static hosting service. Although I recommend using [Vercel](https://vercel.com/) for its ease of use and integration with the Next.js ecosystem.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow the existing code style and architecture
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages
5. Ensure all linting and tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Made with ❤️ for the developer community</strong>
</div>
