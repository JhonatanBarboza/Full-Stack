import './ErrorMessage.css';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      {message}
      <button onClick={onClose} className="close-error">×</button>
    </div>
  );
};

export default ErrorMessage;