import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  spacing?: { top?: string; bottom?: string };
  title?: string;
  subtitle?: string;
  anchorId?: string;
  className?: string;
}

const spacingClasses = {
  none: '',
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-16',
  xl: 'py-24',
};

export function Section({
  children,
  spacing,
  title,
  subtitle,
  anchorId,
  className,
}: SectionProps) {
  const topSpacing = spacing?.top || 'md';
  const bottomSpacing = spacing?.bottom || 'md';

  return (
    <section
      id={anchorId}
      className={cn(
        spacingClasses[topSpacing as keyof typeof spacingClasses],
        spacingClasses[bottomSpacing as keyof typeof spacingClasses],
        className
      )}
    >
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
