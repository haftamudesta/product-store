import { Dialog,Transition} from "@headlessui/react";
import { Fragment } from "react";
 import PropTypes from 'prop-types';


const DialogWrapper = ({isOpen,closeModal,children}) => {
        DialogWrapper.propTypes={
                isOpen:PropTypes.bool.isRequired,
                closeModal:PropTypes.func
        }
  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as ='div' className="relative z-50" onClose={closeModal}>   
                <Transition
                appear show={isOpen}
                as ={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave=" ease-in duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black/60"></div>
                </Transition>
                <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition
                        appear show={isOpen}
                        as ={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale=95"
                        enterTo="opacity-100 scale-100"
                        leave=" ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                                <div >{children}</div>
                        </Transition>
                        </div>
                </div>
        </Dialog>
    </Transition>
  )
}


export default DialogWrapper