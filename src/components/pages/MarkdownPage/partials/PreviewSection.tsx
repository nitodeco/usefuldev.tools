import React from 'react';

interface PreviewSectionProps {
  html: string;
  label: string;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  html,
  label,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div 
        className="w-full h-96 px-4 py-3 border rounded-lg overflow-auto bg-background prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};