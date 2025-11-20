// reusable confirmation modal
import Modal from './Modal';

function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'confirm',
  cancelText = 'cancel',
  isDanger = false
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="confirm-modal-content">
        <p className="confirm-message">{message}</p>
        
        <div className="modal-actions">
          <button className="modal-btn modal-btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={`modal-btn ${isDanger ? 'modal-btn-danger' : 'modal-btn-primary'}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;