import { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'warning':
        return 'bg-alert text-white';
      case 'error':
        return 'bg-critical text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div
      className={`${getStyles()} rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-80 animate-slide-in`}
    >
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default Toast;
