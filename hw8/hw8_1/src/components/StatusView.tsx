// FC — type of a function component with props.
import type {FC} from 'react';

// Loading component: renders the loading text while data is coming from the API.
export const Loading = () => <p className="text-slate-500">Loading…</p>;

// Props of the ErrorMessage component.
interface IErrorMessageProps {
    // Error text shown to the user (taken from the error field of the corresponding slice).
    message: string;
    // Optional request retry function: if passed, the "Try again" button appears.
    onRetry?: () => void;
}

// ErrorMessage component: renders a red block with the error text and (if onRetry is given) a retry button.
export const ErrorMessage: FC<IErrorMessageProps> = ({message, onRetry}) => (
    // Wrapper box with a red border and background.
    <div className="flex items-center gap-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700">
        {/* Error text. */}
        <span>Error: {message}</span>
        {/* The button is shown only if the parent passed the onRetry function. */}
        {onRetry && (
            // Click calls onRetry — the parent dispatches the thunk again.
            <button type="button" onClick={onRetry} className="cursor-pointer rounded bg-red-600 px-2 py-0.5 text-sm text-white">
                {/* Button text. */}
                Try again
            </button>
        )}
    </div>
);
