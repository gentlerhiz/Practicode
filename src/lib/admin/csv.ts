/**
 * CSV for spreadsheets. Cells are quoted when needed, and any cell that a spreadsheet could read as a
 * formula (starting with = + - @, a tab or a carriage return) gets a leading apostrophe first.
 */
export function csvCell(value: unknown): string {
  if (value === null || value === undefined) return ''
  let s = typeof value === 'object' ? JSON.stringify(value) : String(value)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCsv(columns: readonly string[], rows: readonly Record<string, unknown>[]): string {
  const lines = [columns.map(csvCell).join(','), ...rows.map((r) => columns.map((c) => csvCell(r[c])).join(','))]
  // A byte-order mark so Excel opens the file as UTF-8 (names with accents, the naira sign).
  return `﻿${lines.join('\r\n')}\r\n`
}
