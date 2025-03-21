import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import {
	Button,
	CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, title, isOpen, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose();
		};

		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	return createPortal(
		<ModalOverlay isOpen={isOpen} onClose={onClose}>
			<ModalContent title={title} onClose={onClose} children={children} />
		</ModalOverlay>,
		modalRoot
	);
};

const ModalOverlay = ({ isOpen, onClose, children }) => {
	return isOpen ? (
		<div className={styles.modal_overlay} onClick={onClose}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	) : undefined;
};

const ModalContent = ({ title, onClose, children }) => {
	return (
		<div className={`${styles.modal_content} pl-10 pt-10 pr-10 pb-15`}>
			<ModalHeader title={title} onClose={onClose} />
			{children}
		</div>
	);
};

const ModalHeader = ({ title, onClose }) => {
	return (
		<div className={styles.modal_header}>
			<p className='text text_type_main-large'>{title}</p>
			<div onClick={onClose} style={{ cursor: 'pointer' }}>
				<CloseIcon type={'primary'}></CloseIcon>
			</div>
		</div>
	);
};
