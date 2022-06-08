import styled from 'styled-components';

export const UploadShowPopup = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1040;
	width: 100vw;
	height: 100vh;
	background-color: #000;
	display: block;
	opacity: ${({ show }) => `${show ? '.5' : '0'}`};
	visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1060;
	visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	outline: 0;
	display: block;
	transition: opacity 0.15s linear;

	.modal-dialog {
		position: relative;
		width: auto;
		pointer-events: none;
		transition: transform 0.3s ease-out;
		transform: translate(0, -50px);
		margin: 0.5rem;

		${({ show }) => (show ? 'transform: none;' : '')}

		@media (min-width: 576px) {
			max-width: 500px;
			margin: 1.75rem auto;
		}

		@media (min-width: 992px) {
			max-width: 800px;
		}

		@media (min-width: 1200px) {
			max-width: 1140px;
		}

		.modal-content {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			pointer-events: auto;
			background: white;
			background-clip: padding-box;
			border: 1px solid rgba(0, 0, 0, 0.2);
			border-radius: 0.3rem;
			outline: 0;

			.modal-header {
				display: flex;
				flex-shrink: 0;
				align-items: center;
				justify-content: space-between;
				padding: 1rem 1rem;
				border-bottom: 1px solid #dee2e6;
				border-top-left-radius: calc(0.3rem - 1px);
				border-top-right-radius: calc(0.3rem - 1px);

				.title {
					font-size: 1rem !important;
					text-align: center !important;
					width: 100%;
					margin-top: 0;
					font-weight: 500;
					margin-bottom: 0;
					line-height: 1.5;
				}

				.close-btn {
					text-transform: none;
					cursor: pointer;
					margin: 0;
					font-family: inherit;
					font-size: inherit;
					line-height: inherit;
					width: auto;
					max-width: 60px;
					aspect-ratio: 1;

					.sr {
						position: absolute;
						width: 1px;
						height: 1px;
						padding: 0;
						margin: -1px;
						overflow: hidden;
						clip: rect(0, 0, 0, 0);
						border: 0;
					}
				}
			}

			.modal-body {
				position: relative;
				flex: 1 1 auto;
				padding: 1rem;
				height: 450px;
				overflow-x: auto;

				.modal-wrapper {
					display: flex;
					flex-wrap: wrap;

					.row > * {
						flex-shrink: 0;
						width: 100%;
						max-width: 100%;
						padding-right: calc(var(--bs-gutter-x) * 0.5);
						padding-left: calc(var(--bs-gutter-x) * 0.5);
						margin-top: var(--bs-gutter-y);
					}

					.upload-box {
						text-align: center;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 10px;
						width: 195px;
						height: 310px;
						padding: 20px;
						border: 1px dotted black;
						box-shadow: 0px 0px 10px rgb(0 0 0 / 30%);

						.icon {
							font-size: 3em;
							display: inline-block;
							font: normal normal normal 14px/1 FontAwesome;
							text-rendering: auto;
							-webkit-font-smoothing: antialiased;
							color: #6c757d !important;
							margin: 0.5rem !important;

							&::before {
								content: '\f093';
								width: 50px;
								aspect-ratio: 1;
							}
						}

						.upload-form {
							margin: 0;
							font-family: inherit;
							font-size: inherit;
							line-height: inherit;
							width: 105px;
						}
					}
				}
			}
		}
	}
`;

export const UploadBoxTitle = styled.p`
	max-width: 300px;
	font-weight: 500;

	@media (min-width: 768px) {
		flex: 0 0 auto;
		width: 66.66666667%;
	}

	.row > * {
		flex-shrink: 0;
		width: 100%;
		max-width: 100%;
		padding-right: calc(var(--bs-gutter-x) * 0.5);
		padding-left: calc(var(--bs-gutter-x) * 0.5);
		margin-top: var(--bs-gutter-y);
	}
`;

export const PrevPrjWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	cursor: pointer;
`;

export const PrevPrjImg = styled.div`
	position: relative;

	video {
		padding: 0px;
		border-radius: 5px;
		width: 200px;
		min-height: 350px;
		max-height: 350px;
		margin: 10px;
		box-shadow: 1px 1px 5px rgb(0 0 0 / 30%);
		object-fit: cover;
		vertical-align: middle;
	}

	img {
		padding: 0px;
		border-radius: 5px;
		width: 200px;
		min-height: 350px;
		max-height: 350px;
		margin: 10px;
		box-shadow: 1px 1px 5px rgb(0 0 0 / 30%);
		object-fit: cover;
		vertical-align: middle;
	}

	.menu {
		position: absolute;
		right: 18px;
		top: 17px;
		color: white;
		background: transparent;
		transition: 0.4s ease;
		cursor: pointer;
	}

	.status {
		position: absolute;
		background-color: rgba(85, 85, 85, 0.7);
		padding: 3px 8px;
		border-radius: 5px;
		font-size: 0.7rem;
		left: 18px;
		top: 17px;
		color: white;
	}
`;

export const UploadBoxContent = styled.div`
	cursor: pointer;

	.video_name {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;

		p {
			font-weight: 600;
		}

		input {
			border-radius: 10px;
		}
	}

	.info_box {
		border: 1px solid black;
		border-radius: 10px;
		padding: 10px;

		.info {
			display: flex;
			gap: 5px;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.name {
				color: ${({ color }) => color};
				font-size: ${({ size }) => size}px;
				border-radius: 10px;
				border: 2px solid black;
			}

			label {
				font-weight: 600;
			}

			input {
				border-radius: 5px;
				border: 2px solid black;
			}
		}
	}

	label {
		button {
			border-radius: 5px;
			letter-spacing: 1px;
			color: white;
			padding: 6px 15px;
			font-size: 0.8rem;
			border: none;
			padding: 6px 25px;
			background-color: rgba(75, 75, 226, 0.808);
			transition: ease 0.8s;
			box-shadow: 2px 2px 10px rgb(0 0 0 / 30%);

			&:hover {
				background-color: rgba(75, 75, 226, 9);
			}
		}
	}
`;

export const UploadBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: 2px dotted black;
	box-shadow: 0px 0px 10px rgb(0 0 0 / 30%);
	padding: 20px;
`;

export const UploadedImageWrapper = styled.div`
	position: relative;

	&:hover .menu {
		opacity: 1;
		background-color: gray;
		cursor: pointer;
	}

	.menu {
		position: absolute;
		right: 13px;
		bottom: 13px;
		color: white;
		padding: 3px 8px;
		border-radius: 100%;
		background-color: var(--light-shade-bg);
		opacity: 0;
		transition: var(--transition-fast);
	}

	.mdl-ftr-prv-img {
		width: 195px;
		min-height: 310px;
		max-height: 310px;
		margin: 10px;
		box-shadow: 1px 1px 5px rgb(0 0 0 / 30%);
		object-fit: cover;
		vertical-align: middle;
	}

	.fa {
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
	}

	&.mdl-ftr-img-wraper::-webkit-scrollbar {
		height: 5px;
	}

	&.mdl-ftr-img-wraper::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	&.mdl-ftr-img-wraper::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: rgba(136, 136, 136, 0.63);
	}
`;

export const ModalFtrWrapper = styled.div`
	height: 45px;
	width: 65%;
	flex-grow: 1;
	overflow-y: hidden;
	overflow-x: auto;
	white-space: nowrap;

	.modal-footer > * {
		margin: 0.25rem;
	}
`;

export const ModalFtrBtn = styled.button`
	border-radius: 5px;
	letter-spacing: 1px;
	color: white;
	font-size: 0.8rem;
	border: none;
	padding: 6px 25px;
	background-color: rgba(75, 75, 226, 0.808);
	transition: ease 0.8s;
	box-shadow: 2px 2px 10px rgb(0 0 0 / 30%);
`;
