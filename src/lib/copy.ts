export const copyToClipboard = async (text: string, setCopiedAll: (copied: boolean) => void) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);

    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
