/**
 * copy - safely copy text to clipboard with fallback and error handling
 * @param {string} text
 * @returns {Promise<void>}
 */
export default async function copy(text: string): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    // fallback for SSR or older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // prevent scroll-jump
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (!successful) throw new Error('Fallback: Copy command failed');
    } catch (err) {
      document.body.removeChild(textArea);
      return Promise.reject(err);
    }

    return Promise.resolve();
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    return Promise.reject(new Error('Clipboard API failed: ' + (err as Error).message));
  }
}
