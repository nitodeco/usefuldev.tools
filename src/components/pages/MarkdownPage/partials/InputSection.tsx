import React from 'react';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export const InputSection: React.FC<InputSectionProps> = ({
  value,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-96 px-3 py-2 border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};