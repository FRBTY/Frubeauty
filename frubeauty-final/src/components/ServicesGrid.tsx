import { ServiceCard, type ServiceCardData } from './ServiceCard';
import { StaggerGroup, StaggerItem } from './StaggerGroup';

interface ServicesGridProps {
  services: ServiceCardData[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <StaggerGroup
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      staggerDelay={0.08}
    >
      {services.map((s) => (
        <StaggerItem key={s.title} as="article" className="h-full">
          <ServiceCard service={s} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
