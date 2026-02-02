/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in child component tree
 * Logs errors and displays fallback UI
 */

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
    // Log error to monitoring service
    console.error('[ErrorBoundary] Error caught:', error, errorInfo);
    
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `${error.toString()} ${errorInfo.componentStack}`,
        fatal: true
      });
    }

    // Attempt recovery if error count is low
    if (this.state.errorCount < 3) {
      this.attemptRecovery();
    }
  }

  attemptRecovery = () => {
    // Clear potentially corrupted cache
    try {
      sessionStorage.removeItem('zfo_cache');
      localStorage.removeItem('zfo_error_state');
    } catch (e) {
      console.warn('[ErrorBoundary] Cache clear failed:', e);
    }
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Check if custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      return (
        <div 
          className="min-h-screen flex items-center justify-center bg-black text-white p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" aria-hidden="true" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">
              Something went wrong
            </h1>
            
            <p className="text-gray-400 mb-6">
              We apologize for the inconvenience. Our team has been notified.
            </p>

            {import.meta.env.DEV && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-gray-900 rounded text-xs text-red-400 overflow-auto max-h-40">
                  {this.state.error && this.state.error.toString()}
                  {'\n'}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#ffcc00] text-black rounded-lg font-medium hover:bg-[#ffdb4d] transition-colors"
                aria-label="Try again"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                aria-label="Reload page"
              >
                Reload Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                aria-label="Go to homepage"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>

            {this.state.errorCount > 2 && (
              <p className="mt-4 text-sm text-yellow-500">
                Multiple errors detected. Please contact support if this persists.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specialized error boundary for media components
export class MediaErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[MediaErrorBoundary] Media loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="bg-gray-900 rounded-lg flex items-center justify-center p-8 text-gray-500"
          role="alert"
        >
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Failed to load media</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;