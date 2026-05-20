// PatternFour — ✅ Composition via named props
// Page (Server) importerer alt, sender Server Components som header/sidebar/content

import { ComponentWrapper } from '@ssr-workshop/shared'
import { PatternFourClientLayout } from './PatternFourClientLayout'

function ServerHeader() {
  return (
    <ComponentWrapper type="server" label="🔵 SERVER — header-prop">
      <p className="text-xs font-mono" style={{ color: 'var(--server-text)' }}>
        Header — Server Component sendt som <code>header</code>-prop
      </p>
    </ComponentWrapper>
  )
}

function ServerSidebar() {
  return (
    <ComponentWrapper type="server" label="🔵 SERVER — sidebar-prop">
      <p className="text-xs font-mono" style={{ color: 'var(--server-text)' }}>
        Sidebar — Server Component sendt som <code>sidebar</code>-prop
      </p>
    </ComponentWrapper>
  )
}

function ServerContent() {
  const serverTime = new Date().toLocaleTimeString('no-NO')
  return (
    <ComponentWrapper type="server" label="🔵 SERVER — content-prop">
      <p className="text-xs font-mono" style={{ color: 'var(--server-text)' }}>
        Innhold rendret på server kl. {serverTime}. Sendt som <code>content</code>-prop.
      </p>
    </ComponentWrapper>
  )
}

const ownSnippet = `\
import { PatternFourClientLayout } from './PatternFourClientLayout'
// ...

export function PatternFour() {
  // ...
  return (
    <ComponentWrapper type="server" label="🔵 SERVER — Page">
      {/* ... */}
      <PatternFourClientLayout
        header={<ServerHeader />}
        sidebar={<ServerSidebar />}
        content={<ServerContent />}
        sourceCode={layoutSourceCode}
      />
    </ComponentWrapper>
  )
}`

const layoutSnippet = `\
'use client'

import { useState } from 'react'
// ...

interface ClientLayoutProps {
  header: React.ReactNode
  sidebar: React.ReactNode
  content: React.ReactNode
  sourceCode?: string
}

export function PatternFourClientLayout({ header, sidebar, content, sourceCode }: ClientLayoutProps) {
  // ...
  return (
    <ComponentWrapper type="client" sourceCode={sourceCode}>
      {/* ... */}
      <div className="flex flex-col gap-2">
        {headerOpen && <div>{header}</div>}
        <div className="flex gap-2">
          {sidebarOpen && <div>{sidebar}</div>}
          {contentOpen && <div>{content}</div>}
        </div>
      </div>
    </ComponentWrapper>
  )
}`

export function PatternFour() {
  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — Page (composer)"
      sourceCode={ownSnippet}
      componentName="PatternFour.tsx"
    >
      <p className="text-xs font-mono mb-3" style={{ color: 'var(--server-text)' }}>
        Page importerer alle Server Components og sender dem som named props til ClientLayout.
        ClientLayout importerer ingen av dem.
      </p>
      <PatternFourClientLayout
        header={<ServerHeader />}
        sidebar={<ServerSidebar />}
        content={<ServerContent />}
        sourceCode={layoutSnippet}
      />
    </ComponentWrapper>
  )
}
