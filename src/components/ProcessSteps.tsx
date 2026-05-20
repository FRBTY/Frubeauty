import { StaggerGroup, StaggerItem } from './StaggerGroup';

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  // 3 lépéses változat: centrált 3 oszlopos rács (a 4 oszlopos default
  // a 3 elemnél balra húzná a tartalmat). 4 lépés: 4 oszlop, default.
  const isThree = steps.length === 3;
  const gridClass = isThree
    ? 'grid sm:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto'
    : 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8';

  return (
    <StaggerGroup className={gridClass} staggerDelay={0.07}>
      {steps.map((s) => (
        <StaggerItem key={s.step}>
          <div>
            <p className="font-display text-5xl font-light text-gold mb-4">{s.step}</p>
            <h3 className="font-medium text-lg mb-2 text-cream">{s.title}</h3>
            <p className="text-creamSoft leading-[1.7] text-[15px]">{s.body}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
