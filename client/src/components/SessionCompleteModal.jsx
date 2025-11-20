// modal shown after finishing a session
import { useState, useEffect } from 'react';
import Modal from './Modal';

function SessionCompleteModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialActivity, 
  initialNotes, 
  duration 
}) {
  const [activity, setActivity] = useState(initialActivity);
  const [notes, setNotes] = useState(initialNotes || '');

  const activities = [
    { value: 'work', label: 'work', emoji: '💼' },
    { value: 'study', label: 'study', emoji: '📚' },
    { value: 'read', label: 'read', emoji: '📖' },
    { value: 'code', label: 'code', emoji: '💻' },
    { value: 'write', label: 'write', emoji: '✍️' }
  ];

  // update state when modal opens with new data
  useEffect(() => {
    if (isOpen) {
      setActivity(initialActivity);
      setNotes(initialNotes || '');
    }
  }, [isOpen, initialActivity, initialNotes]);

  const handleSave = () => {
    onSave({ activity, notes });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="session complete! 🎉">
      <div className="session-complete-content">
        <p className="session-duration">
          you worked for <strong>{duration} minutes</strong>
        </p>

        {/* activity selector */}
        <div className="form-group">
          <label>activity</label>
          <select 
            value={activity} 
            onChange={(e) => setActivity(e.target.value)}
            className="form-select"
          >
            {activities.map(act => (
              <option key={act.value} value={act.value}>
                {act.emoji} {act.label}
              </option>
            ))}
          </select>
        </div>

        {/* notes field */}
        <div className="form-group">
          <label>notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="what did you accomplish?"
            rows="4"
            maxLength="500"
            className="form-textarea"
          />
        </div>

        {/* action buttons */}
        <div className="modal-actions">
          <button className="modal-btn modal-btn-secondary" onClick={onClose}>
            cancel
          </button>
          <button className="modal-btn modal-btn-primary" onClick={handleSave}>
            save session
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SessionCompleteModal;