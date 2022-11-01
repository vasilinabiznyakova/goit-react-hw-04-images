import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = props => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        props.onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  const handleOverlayClick = event => {
    console.log(event.currentTarget !== event.target);
    if (event.currentTarget !== event.target) {
      props.onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>{props.children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

// export class Modal extends Component {

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlayClick = event => {
//     if (event.currentTarget !== event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const children = this.props.children;

//     return createPortal(
//       <Overlay onClick={this.handleOverlayClick}>
//         <ModalWindow>{children}</ModalWindow>
//       </Overlay>,

//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
