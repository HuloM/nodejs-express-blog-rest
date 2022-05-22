import {createPortal} from 'react-dom'

import {Fragment} from 'react'

const Backdrop = props => {
    return <div className='fixed top-0 left-0 z-20 h-screen w-screen block bg-black/75' onClick={props.onClick}/>
}
const ModalOverlay = props => {
    return (
        <div className='fixed p-8 bg-white max-w-lg m-auto z-50 rounded-xl top-20 inset-x-0 shadow-md'>
            <div>{props.children}</div>
        </div>
    )
}

const Modal = props => {
    return (
        <Fragment>
            {createPortal(
                <Backdrop onClick={props.onClick}/>,
                document.getElementById('overlays')
            )}
            {createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                document.getElementById('overlays')
            )}
        </Fragment>
    )
}

export default Modal