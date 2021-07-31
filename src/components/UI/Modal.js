import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
	return (
		<div onClick={props.onHideModal} className={classes.backdrop}></div>
	);
};

const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElemtnet = document.getElementById('overlays');

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDom.createPortal(
				<Backdrop onHideModal={props.onHideModal} />,
				portalElemtnet
			)}
			{ReactDom.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElemtnet
			)}
		</Fragment>
	);
};

export default Modal;
