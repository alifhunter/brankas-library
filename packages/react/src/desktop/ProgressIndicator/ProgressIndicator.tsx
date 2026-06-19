import { cn } from '../../lib/cn.js';
import type {
  ProgressIndicatorProps,
  ProgressIndicatorStep,
  ProgressIndicatorStepStatus,
} from './ProgressIndicator.types';
import './ProgressIndicator.css';

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path
        d="M2.5 6.2l2.2 2.2L9.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resolveStatus(
  step: ProgressIndicatorStep,
  index: number,
  currentStep: number,
): ProgressIndicatorStepStatus {
  if (step.status) return step.status;
  const oneIndexed = index + 1;
  if (oneIndexed < currentStep) return 'completed';
  if (oneIndexed === currentStep) return 'current';
  return 'upcoming';
}

export function ProgressIndicator({
  steps,
  currentStep,
  onStepClick,
  className,
  ...rest
}: ProgressIndicatorProps) {
  return (
    <nav
      {...rest}
      aria-label="Progress"
      className={cn('ui-progress-indicator', className)}
    >
      <ol className="ui-progress-indicator__list">
        {steps.map((step, index) => {
          const status = resolveStatus(step, index, currentStep);
          const interactive = Boolean(onStepClick) && status !== 'upcoming';
          const stepNumber = index + 1;
          const key = step.id ?? `step-${index}`;

          const inner = (
            <>
              <span className="ui-progress-indicator__marker" aria-hidden="true">
                {status === 'completed' ? <CheckIcon /> : stepNumber}
              </span>
              <span className="ui-progress-indicator__label">{step.label}</span>
            </>
          );

          return (
            <li
              key={key}
              className={cn(
                'ui-progress-indicator__step',
                `ui-progress-indicator__step--${status}`,
                interactive && 'ui-progress-indicator__step--interactive',
              )}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              {interactive ? (
                <button
                  type="button"
                  className="ui-progress-indicator__trigger"
                  onClick={() => onStepClick?.(stepNumber)}
                >
                  {inner}
                </button>
              ) : (
                <span className="ui-progress-indicator__trigger">{inner}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
