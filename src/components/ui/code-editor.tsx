'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react'; // Added for copy button
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { codeToHtml } from 'shiki';
import { EASE_OUT } from '@/components/shared/motion';
import { cn } from '@/utils/cn';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export type EditorTheme = {
  id: string;
  name: string;
  dark: boolean;
  bg: string;
  toolbar: string;
  border: string;
  accent: string;
};

export const EDITOR_THEMES: EditorTheme[] = [
  {
    id: 'dark-plus',
    name: 'Dark+',
    dark: true,
    bg: '#1e1e1e',
    toolbar: '#252526',
    border: 'rgba(255,255,255,0.1)',
    accent: '#569cd6'
  },
  {
    id: 'light-plus',
    name: 'Light+',
    dark: false,
    bg: '#ffffff',
    toolbar: '#f3f3f3',
    border: '#e0e0e0',
    accent: '#0070c1'
  }
];

export type EditorTab = {
  id: string;
  label: string;
  name?: string;
  lang: string;
  description?: string;
};

interface CodeEditorProps {
  code: string;
  language: string;
  filename?: string;
  className?: string;
  tabs?: EditorTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  colorName?: string;
  onColorNameChange?: (name: string) => void;
}

export function CodeEditor({
  code,
  language,
  filename,
  className,
  tabs,
  activeTab,
  onTabChange,
  colorName,
  onColorNameChange
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const [html, setHtml] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const themeId = resolvedTheme === 'dark' ? 'dark-plus' : 'light-plus';
  const activeTheme = EDITOR_THEMES.find((t) => t.id === themeId) ?? EDITOR_THEMES[0];
  const activeTabData = tabs?.find((t) => t.id === activeTab);
  const displayLang = activeTabData?.lang ?? language;
  const displayFilename = activeTabData?.label ?? filename;

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code || '// ...', { lang: displayLang, theme: themeId })
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [code, displayLang, themeId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      data-slot="code-editor"
      layout
      className={cn('group relative overflow-hidden rounded-xl font-mono text-sm', className)}
      style={{ border: `1px solid ${activeTheme.border}` }}
    >
      <div
        className="flex items-center justify-between gap-3 px-4 py-2.5"
        style={{
          backgroundColor: activeTheme.toolbar,
          borderBottom: `1px solid ${activeTheme.border}`
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="block size-3 rounded-full bg-red-500" />
            <span className="block size-3 rounded-full bg-yellow-500" />
            <span className="block size-3 rounded-full bg-green-500" />
          </div>
          {displayFilename && (
            <span className="text-muted-foreground text-sm font-medium select-none">
              {displayFilename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-muted-foreground rounded px-1.5 py-0.5 text-xs font-bold uppercase opacity-70 select-none">
            {displayLang}
          </span>
          <button
            onClick={handleCopy}
            className="hover:bg-foreground/10 flex size-7 items-center justify-center rounded-md transition-colors"
            title="Copy Code"
          >
            {isCopied ? (
              <Check
                size={14}
                className="text-green-500"
              />
            ) : (
              <Copy
                size={14}
                className="text-muted-foreground"
              />
            )}
          </button>
        </div>
      </div>

      {/* ── Sub-toolbar ── */}
      {(colorName !== undefined || (tabs && tabs.length > 0)) && (
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2"
          style={{
            backgroundColor: activeTheme.toolbar,
            borderBottom: `1px solid ${activeTheme.border}`
          }}
        >
          {colorName !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground shrink-0 text-sm font-medium select-none">
                Name:
              </span>
              <Input
                type="text"
                value={colorName}
                onChange={(e) => onColorNameChange?.(e.target.value)}
                placeholder="primary"
                className="h-8 min-w-32 bg-transparent text-sm"
              />
            </div>
          )}

          {tabs && tabs.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground mr-1 shrink-0 text-sm font-medium select-none">
                Format:
              </span>
              <Select
                value={activeTab}
                onValueChange={(val) => onTabChange?.(val as string)}
              >
                <SelectTrigger
                  size="sm"
                  className="text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tabs.map((tab) => (
                    <SelectItem
                      key={tab.id}
                      value={tab.id}
                    >
                      {tab.name ?? tab.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {activeTabData?.description && (
            <span className="text-muted-foreground ml-auto hidden text-xs font-medium select-none sm:block">
              {activeTabData.description}
            </span>
          )}
        </div>
      )}

      {/* ── Code area ── */}
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        {html ? (
          <motion.div
            key={themeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="h-full max-h-100 w-full overflow-auto [&_pre]:m-0! [&_pre]:rounded-none! [&_pre]:p-4! [&_pre]:font-mono! [&_pre]:text-[13px]! [&_pre]:leading-5!"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <motion.pre
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="m-0! h-full max-h-100 w-full rounded-none! p-4! font-mono! text-[13px]! leading-5!"
            style={{ backgroundColor: activeTheme.bg }}
          >
            {code}
          </motion.pre>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
