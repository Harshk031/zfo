import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Error caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>

          <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full text-left overflow-auto border border-gray-800 mb-8">
            <p className="font-mono text-yellow-400 mb-2">ERROR:</p>
            <pre className="text-red-400 whitespace-pre-wrap mb-4 font-mono text-sm">
              {this.state.error && this.state.error.toString()}
            </pre>
            <p className="font-mono text-yellow-400 mb-2">STACK:</p>
            <pre className="text-gray-400 whitespace-pre-wrap font-mono text-xs">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export class MediaErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-900 rounded-lg flex items-center justify-center p-8 text-gray-500">
          <p>Failed to load media</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;