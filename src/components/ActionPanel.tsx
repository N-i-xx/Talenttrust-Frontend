'use client';

import { useId } from 'react';

export type ActionKey = 'submitMilestone' | 'releaseFunds' | 'dispute' | 'viewSummary';

type ActionConfig = {
  key: ActionKey;
  label: string;
  ariaLabel: string;
  intent: 'primary' | 'secondary' | 'danger';
};

export type ActionPanelProps = {
  status: 'Active' | 'Completed' | 'Disputed' | 'Pending';
  onSubmitMilestone?: () => void;
  onDispute?: () => void;
  onReleaseFunds?: () => void;
  onViewSummary?: () => void;
  disabledReasons?: Partial<Record<ActionKey, string>>;
  errorMessage?: string;
  isLoading?: boolean;
};

const getActionButtons = (status: ActionPanelProps['status']) => {
  if (status === 'Active') {
    return ['submitMilestone', 'releaseFunds', 'dispute'] as ActionKey[];
  }
  if (status === 'Pending') {
    return ['releaseFunds', 'dispute'] as ActionKey[];
  }
  if (status === 'Disputed') {
    return ['dispute'] as ActionKey[];
  }
  return ['viewSummary'] as ActionKey[];
};

const actionConfig: Record<ActionKey, ActionConfig> = {
  submitMilestone: {
    key: 'submitMilestone',
    label: 'Submit Milestone',
    ariaLabel: 'Submit milestone for approval',
    intent: 'primary',
  },
  releaseFunds: {
    key: 'releaseFunds',
    label: 'Release Funds',
    ariaLabel: 'Release funds to the contractor',
    intent: 'secondary',
  },
  dispute: {
    key: 'dispute',
    label: 'Dispute',
    ariaLabel: 'Open a dispute for this contract',
    intent: 'danger',
  },
  viewSummary: {
    key: 'viewSummary',
    label: 'View Summary',
    ariaLabel: 'View contract summary details',
    intent: 'secondary',
  },
};

const actionClassNames: Record<ActionConfig['intent'], string> = {
  primary:
    'bg-blue-700 text-white hover:bg-blue-800 focus-visible:outline-blue-900 disabled:bg-blue-200 disabled:text-blue-950',
  secondary:
    'border border-slate-400 bg-white text-slate-950 hover:border-slate-600 focus-visible:outline-blue-900 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500',
  danger:
    'bg-rose-700 text-white hover:bg-rose-800 focus-visible:outline-rose-950 disabled:bg-rose-200 disabled:text-rose-950',
};

const getActionHandler = (
  key: ActionKey,
  handlers: Pick<ActionPanelProps, 'onSubmitMilestone' | 'onDispute' | 'onReleaseFunds' | 'onViewSummary'>
) => {
  const handlerMap: Record<ActionKey, (() => void) | undefined> = {
    submitMilestone: handlers.onSubmitMilestone,
    releaseFunds: handlers.onReleaseFunds,
    dispute: handlers.onDispute,
    viewSummary: handlers.onViewSummary,
  };

  return handlerMap[key];
};

const ActionPanel = ({
  status,
  onSubmitMilestone,
  onDispute,
  onReleaseFunds,
  onViewSummary,
  disabledReasons = {},
  errorMessage,
  isLoading = false,
}: ActionPanelProps) => {
  const actions = getActionButtons(status);
  const panelId = useId();
  const headingId = `${panelId}-heading`;

  return (
    <aside
      aria-labelledby={headingId}
      className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <p className="text-sm text-slate-500 uppercase tracking-[0.24em]">Action Panel</p>
        <h2 id={headingId} className="mt-2 text-xl font-semibold text-slate-900">
          What would you like to do?
        </h2>
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-900"
        >
          {errorMessage}
        </p>
      )}

      <div className="space-y-3">
        {actions.map((actionKey) => {
          const action = actionConfig[actionKey];
          const handler = getActionHandler(actionKey, {
            onSubmitMilestone,
            onDispute,
            onReleaseFunds,
            onViewSummary,
          });
          const unavailableReason = disabledReasons[actionKey] ?? 'This action is unavailable right now.';
          const disabledReason = isLoading ? 'Action is disabled while contract data is loading.' : unavailableReason;
          const isDisabled = isLoading || !handler || Boolean(disabledReasons[actionKey]);
          const descriptionId = isDisabled ? `${panelId}-${action.key}-reason` : undefined;

          return (
            <div key={action.key}>
              <button
                type="button"
                onClick={handler}
                disabled={isDisabled}
                aria-label={action.ariaLabel}
                aria-describedby={descriptionId}
                className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${actionClassNames[action.intent]}`}
              >
                {action.label}
              </button>
              {descriptionId && (
                <p id={descriptionId} className="sr-only">
                  {disabledReason}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default ActionPanel;
