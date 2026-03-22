import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-[#FDF8F0]">
          <div className="flex flex-col items-center w-full max-w-md text-center">
            <AlertTriangle
              size={48}
              className="text-[#C4785B] mb-6 flex-shrink-0"
            />

            <h2 className="font-serif text-2xl text-[#1A3C34] mb-3">
              Что-то пошло не так
            </h2>

            <p className="text-[#1A3C34]/60 mb-8">
              Произошла непредвиденная ошибка. Попробуйте обновить страницу.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1A3C34] text-white hover:bg-[#152F29] transition-colors cursor-pointer"
            >
              <RotateCcw size={16} />
              Обновить страницу
            </button>

            <a
              href="https://t.me/aleksa_fvva"
              className="mt-4 text-[#C4785B] hover:underline text-sm"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
