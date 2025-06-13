import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const IconComponent = ({ icon }: { icon: string }) => {

    const IconCompo = icon
        ? (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[icon]
        : undefined;

    if (IconCompo) {
        return (<IconCompo className='h-8 w-8' />);
    }

}

export default IconComponent;