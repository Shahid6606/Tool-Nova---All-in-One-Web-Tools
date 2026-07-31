'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/text-area'

export function FormWordCounter() {
  const [text, setText] = useState<string>('')

  // Statistics
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length

  const characters = text.length

  const charactersWithoutSpaces = text.replace(/\s/g, '').length

  const paragraphs = text
    .split('\n')
    .filter(paragraph => paragraph.trim() !== '').length

  const readingTime = words === 0 ? 0 : Math.ceil(words / 200)

  // Copy Text
  const copyText = async () => {
    if (!text.trim()) return

    try {
      await navigator.clipboard.writeText(text)
      alert('Text copied successfully!')
    } catch {
      alert('Failed to copy text.')
    }
  }

  // Remove Extra Spaces
  const removeExtraSpaces = () => {
    const cleaned = text
      .split('\n')
      .map(line => line.replace(/\s+/g, ' ').trim())
      .join('\n')

    setText(cleaned)
  }

  // Clear All Text
  const clearText = () => {
    setText('')
  }

  return (
    <div className="w-full">
      {/* Stats */}
      <div className="my-12 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5">
        <div className="rounded-md border bg-background/60 p-4 backdrop-blur-md">
          <p className="text-2xl font-semibold">{words}</p>
          <p className="text-muted-foreground">Words</p>
        </div>

        <div className="rounded-md border bg-background/60 p-4 backdrop-blur-md">
          <p className="text-2xl font-semibold">{characters}</p>
          <p className="text-muted-foreground">Characters</p>
        </div>

        <div className="rounded-md border bg-background/60 p-4 backdrop-blur-md">
          <p className="text-2xl font-semibold">
            {charactersWithoutSpaces}
          </p>
          <p className="text-muted-foreground">
            Characters without spaces
          </p>
        </div>

        <div className="rounded-md border bg-background/60 p-4 backdrop-blur-md">
          <p className="text-2xl font-semibold">{paragraphs}</p>
          <p className="text-muted-foreground">Paragraphs</p>
        </div>

        <div className="rounded-md border bg-background/60 p-4 backdrop-blur-md">
          <p className="text-2xl font-semibold">{readingTime}</p>
          <p className="text-muted-foreground">Min Read</p>
        </div>
      </div>

      {/* Textarea */}
      <Textarea
        value={text}
        maxHeight={300}
        placeholder="Type or paste your text here..."
        onChange={e => setText(e.target.value)}
      />

      {/* Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={copyText}
          disabled={!text.trim()}
          className="rounded-md border px-4 py-2 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Copy Text
        </button>

        <button
          onClick={removeExtraSpaces}
          disabled={!text.trim()}
          className="rounded-md border px-4 py-2 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Remove Extra Spaces
        </button>

        <button
          onClick={clearText}
          disabled={!text.trim()}
          className="rounded-md border px-4 py-2 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Text
        </button>
      </div>
    </div>
  )
}