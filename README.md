# Dushyant Singh - Portfolio & Blog

A minimal, high-performance portfolio and blog built with **Next.js**, **Tailwind CSS**, and **MDX**. Designed with strict typography and a focus on content.

![Preview](./public/stage-1770288100160.png)

## Features

- **Next.js 14 App Router**: Modern, efficient architecture.
- **MDX for Content**: Write blogs in Markdown with React components.
- **Tailwind CSS**: Utility-first styling with a custom design system.
- **Strict Typography**: Custom font stack featuring JetBrains Mono using Lab colors.
- **SEO Optimized**: Modular metadata management for search engine visibility.
- **Responsive Design**: Looks great on mobile and desktop.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Fonts**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) & [Montserrat](https://fonts.google.com/specimen/Montserrat)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (e.g., `BlogCard`).
- `lib/`: Utility functions and configurations (`styles.ts`, `seo.ts`, `blog.ts`).
- `blogs/`: MDX blog posts source files.
- `public/`: Static assets.

## SEO

The site uses a modular SEO approach defined in `lib/seo.ts`. Global configuration is managed in `lib/site-config.ts`. To update site-wide SEO settings (Name, URL, Description), edit `lib/site-config.ts`.

## Customization

- **Fonts & Colors**: Adjusted in `app/globals.css` and `tailwind.config.ts`.
- **Blog Styles**: Prose styling logic is centralized in `lib/styles.ts`.

---

Built with ❤️ by [Dushyant Singh](https://dushyantx.in)
