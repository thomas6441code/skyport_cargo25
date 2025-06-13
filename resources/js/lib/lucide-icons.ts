import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export const getLucideIcon = (iconName: string) => {
    const icons = LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>;
    return icons[iconName];
};