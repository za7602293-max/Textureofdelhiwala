import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Texture of Delhi Wala:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0B0B] text-[#F8F5EE] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full border border-[#C9A24B]/40 bg-[#C9A24B]/10 flex items-center justify-center mb-6">
            <span className="text-[#C9A24B] text-2xl font-serif">TD</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EE] mb-3">
            Texture of Delhi Wala
          </h1>
          <p className="text-sm text-[#F8F5EE]/70 max-w-md mb-6 leading-relaxed">
            Royal Luxury Wall Textures & Finishes by Muhammad Arif.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#E5C378] text-[#0B0B0B] font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#C9A24B]/20"
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
