import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import {
	Button,
	CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

interface ModalProps {
	children: React.ReactNode;
	title?: string;
	onClose: () => void;
}

interface ModalOverlayProps {
	children: React.ReactNode;
	onClose: () => void;
}

interface ModalContentProps {
	children: React.ReactNode;
	title?: string;
	onClose: () => void;
}

interface ModalHeaderProps {
	title?: string;
	onClose: () => void;
}

export const Modal = ({ children, title, onClose }: ModalProps) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	return createPortal(
		<ModalOverlay onClose={onClose}>
			<ModalContent title={title} onClose={onClose}>
				{children}
			</ModalContent>
		</ModalOverlay>,
		modalRoot
	);
};

const ModalOverlay = ({ onClose, children }: ModalOverlayProps) => {
	return (
		<div id={"modal_window_overlay"} className={styles.modal_overlay} onClick={onClose}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	);
};

const ModalContent = ({ title, onClose, children }: ModalContentProps) => {
	return (
		<div id={"modal_window_content"} className={`${styles.modal_content} pl-10 pt-10 pr-10 pb-15`}>
			<ModalHeader title={title} onClose={onClose} />
			{children}
		</div>
	);
};

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
	return (
		<div className={styles.modal_header}>
			<p className='text text_type_main-large'>{title}</p>
			<Button
				id={"modal_close_btn"}
				type='secondary'
				htmlType='button'
				onClick={onClose}
				style={{ cursor: 'pointer' }}>
				<CloseIcon type={'primary'}></CloseIcon>
			</Button>
		</div>
	);
};
