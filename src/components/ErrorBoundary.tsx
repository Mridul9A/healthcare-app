import React from "react";

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error("App crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
          <h1 className="text-xl font-bold text-red-500">
            Something went wrong 🚨
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}