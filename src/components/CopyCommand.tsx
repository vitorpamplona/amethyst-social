import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** A one-line command or address with a copy button. */
export function CopyCommand({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const selectText = () => {
    const node = codeRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      selectText();
    }
  };

  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-md border border-purple-500/20 bg-purple-950/60 py-1 pl-3 pr-1">
      <code ref={codeRef} className="min-w-0 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
        {text}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : `Copy ${text}`}
        className="shrink-0 rounded p-1.5 text-muted-foreground transition-colors hover:bg-purple-500/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </span>
  );
}
