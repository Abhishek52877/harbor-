import { Check } from 'lucide-react';

type TimelineStep = {
  label: string;
  completed: boolean;
};

type TimelineViewProps = {
  currentStep: number;
};

export function TimelineView({ currentStep }: TimelineViewProps) {
  const steps: TimelineStep[] = [
    { label: 'Listed', completed: currentStep >= 0 },
    { label: 'Matched', completed: currentStep >= 1 },
    { label: 'Picked', completed: currentStep >= 2 },
    { label: 'Paid', completed: currentStep >= 3 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="mb-6">Progress Timeline</h3>

      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center relative z-10 flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                step.completed
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.completed ? (
                <Check className="w-6 h-6" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <p className={`text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
              {step.label}
            </p>

            {index < steps.length - 1 && (
              <div
                className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 transition-colors ${
                  steps[index + 1].completed ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
