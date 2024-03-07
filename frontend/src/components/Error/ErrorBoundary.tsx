import { Component, ErrorInfo, ReactNode } from "react";
import ErrorMessage from "./ErrorMessage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(errorInfo);
    this.setState({ hasError: true, error: error });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorMessage message={this.state.error?.message}></ErrorMessage>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
