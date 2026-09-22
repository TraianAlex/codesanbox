import {createRequire} from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

const require = createRequire(import.meta.url)
const getWorkshopCode = require('@kentcdodds/react-workshop-app/codegen') as (options?: {
  cwd?: string
}) => string

function workshopCodegen() {
  return {
    name: 'workshop-codegen',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      const filename = id.split('?')[0]
      if (!filename.endsWith('/src/index.js')) return null
      if (!code.includes('codegen.macro')) return null

      const generated = getWorkshopCode({cwd: process.cwd()})
        .replace(
          'if (module.hot) module.hot.accept()',
          'if (import.meta.hot) import.meta.hot.accept()',
        )
        .replace(
          /import\("(\.\/(?:exercise|final|examples)\/[^"]+\.mdx?)"\)/g,
          (_match, relativePath: string) =>
            `import("virtual:workshop-md:${relativePath.replace(/^\.\//, 'src/')}")`,
        )

      return {
        code: `import './styles.css'\n${generated}\n`,
        map: null,
      }
    },
  }
}

function markdownToReact() {
  const prefix = 'virtual:workshop-md:'

  return {
    name: 'markdown-to-react',
    enforce: 'pre' as const,
    resolveId(source: string) {
      if (source.startsWith(prefix)) return `\0${source}`
      return null
    },
    async load(id: string) {
      if (!id.startsWith(`\0${prefix}`)) return null

      const relativePath = id.slice(`\0${prefix}`.length)
      const filename = path.join(process.cwd(), relativePath)
      const {micromark} = await import('micromark')
      const html = micromark(fs.readFileSync(filename, 'utf8'), {
        allowDangerousHtml: true,
      })

      return `
import * as React from 'react'
export default function MarkdownInstruction() {
  return React.createElement('div', {
    dangerouslySetInnerHTML: {__html: ${JSON.stringify(html)}},
  })
}
`
    },
  }
}

export default defineConfig(({mode}) => ({
  plugins: [workshopCodegen(), markdownToReact(), react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  optimizeDeps: {
    exclude: ['codegen.macro'],
    esbuildOptions: {
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode),
      },
    },
  },
}))
