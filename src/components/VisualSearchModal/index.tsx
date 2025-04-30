import React from 'react';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ImageRetrieval from '../ImageRetrival';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisualSearchModal: React.FC<VisualSearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t('Visual Search')}
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t('Close')}
        </Button>
      ]}
    >
      <div className="visual-search-container">
        <ImageRetrieval />
      </div>
    </Modal>
  );
};

export default VisualSearchModal;