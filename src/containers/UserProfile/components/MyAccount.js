import React, { Fragment , useRef,useState } from "react";
import CopyIcon from '../../../img/copyicon.svg';
import { Dialog, Transition } from '@headlessui/react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import EditIcon from '../../../img/pencil.svg';
import UserImg from '../../../img/userimg.jpg';

const MyAccount = () => {
    const [copySuccess, setCopySuccess] = useState('Copy');
    const textAreaRef = useRef(null);
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [image, setImage] = useState(UserImg);
    const [cropData, setCropData] = useState(image);
    const [cropper, setCropper] = useState();
    function copyToClipboard(e) {
        textAreaRef.current.select();
        e.target.focus();
        document.execCommand('copy');
        setCopySuccess('Copied!');
    };

    const onChange = (e) => {
        e.preventDefault();
        let files;        
        if (e.dataTransfer) {
          files = e.dataTransfer.files;     
          setOpen(true);    
        } else if (e.target) {
          files = e.target.files;
          setOpen(true);
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);          
        };
        if (e.target.files[0]) {
            reader.readAsDataURL(files[0]);  
        }           
    };
    const getCropData = () => {
        if (typeof cropper !== "undefined") {
          setCropData(cropper.getCroppedCanvas().toDataURL());      
          setOpen(false);    
        }
    };

    return (
        <div className="myAccount">
            <div className="myAccountInner" style={{ maxWidth: '800px',margin:'0 auto', }}>
                <form>
                    <div className="xl:flex xl:justify-between xl:space-x-3 mt-3 px-3">
                        <div className="md:flex-1">
                            <div className="lgTitle text-center md:text-left">
                                <h3 className="page-title font-medium">My Account</h3>
                            </div>
                        </div>
                    </div>
                    <div className="xl:flex mt-8 items-center text-center md:text-left xl:justify-between xl:space-x-3 mt-3 px-3">
                        <div className="flex-none">
                            <div className="userInfo">
                                <div className="w-20 h-20 bg-dropdownTextColor rounded-full ml-auto mr-auto md:ml-0 md:mr-0 relative">                                  
                                    {(typeof cropper !== "undefined") ? (
                                        <img src={cropData} alt="dummy" className="w-20 h-20 rounded-full object-cover" />
                                        ) : (
                                        <>
                                            <img src={image} alt="dummy" className="w-20 h-20 rounded-full object-cover" />
                                        </>
                                    )}                                    
                                    <input
                                        type="file"
                                        id="upload-button"
                                        style={{ display: "none" }}
                                        onChange={onChange}
                                    />
                                    <label htmlFor="upload-button" className="w-8 h-8 rounded-full flex items-center justify-center top-0 -right-2 shadow-btn absolute bg-white cursor-pointer">
                                        <img src={EditIcon} alt="Edit" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 pl-3">
                            <div className="userInfo">                     
                                <div className="userInfoMain">
                                    <h3 className="text-lg text-darkGray font-bold">Jhondoe1</h3>
                                    <span className="text-stxblue text-sm">Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-6 xl:justify-between md:space-x-6 mt-3 px-3">
                        <div className="md:flex-1">
                            <div className="formGroup">
                                <label className="block text-sm text-lbGray">
                                    First Name
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="Jhon"
                                        className="formControl rounded-lg focus:outline-none placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 mt-3 md:mt-0">
                            <div className="formGroup">
                                <label className="block text-sm text-lbGray">
                                    Last Name
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="Doe"
                                        className="formControl rounded-lg focus:outline-none placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-3 md:mt-8 xl:justify-between md:space-x-6 mt-3 px-3">
                        <div className="md:flex-1">
                            <div className="formGroup">
                                <label className="block text-sm text-lbGray">
                                    Display Name
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="Jhondoe1"
                                        className="formControl rounded-lg focus:outline-none placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 mt-3 md:mt-0">
                            <div className="formGroup">
                                <label className="block text-sm text-lbGray">
                                    Email
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Jhon.doe@abc.com"
                                        className="formControl rounded-lg focus:outline-none placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-3 md:mt-8 xl:justify-between md:space-x-3 mt-3 px-3">
                        <div className="md:flex-1">
                            <div className="formGroup">
                                <label className="block text-sm text-lbGray">
                                    Wallet Address
                                </label>
                                <div className="mt-3 relative">
                                    <input
                                        type="text"
                                        name="firstname"
                                        ref={textAreaRef}
                                        placeholder="SPZTTWJ2DFJTQWV2THMY55W2ZVD7T7G9CCBNDCQ7"
                                        className="formControl rounded-lg focus:outline-none placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                    />
                                    <div className="top-1/2 right-4 transform -translate-y-1/2 absolute px-2 md:px-0 bg-white md:bg-transparent">
                                        <button onClick={copyToClipboard} type="button" className="flex cursor-pointer">
                                            <label className="text-stxblue cursor-pointer font-medium text-sm pr-2">
                                                {copySuccess}
                                            </label>
                                            <img src={CopyIcon} alt="Copy" />
                                        </button>                                                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:flex mt-11 xl:justify-between md:space-x-3 px-3">
                        <div className="flex-1">
                            <div className="formGroup">
                                <button type="submit" className="w-full h-14 text-center rounded-lg py-3 px-5 bg-stxblue hover:bg-stxblue text-sm text-white font-semibold mb-7">                          
                                    Save My Settings
                                </button>
                            </div>
                        </div>
                    </div>   
                </form>         
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Cropper
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                guides={true}
                            />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-stxblue text-base font-medium text-white hover:bg-stxblue focus:outline-none focus:ring-stxblue focus:ring-stxblue focus:ring-stxblue sm:ml-3 sm:w-auto sm:text-sm"                            
                            onClick={getCropData}
                            >
                                Crop
                            </button>
                            <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-gray-300 focus:ring-gray-300 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                            >
                                Close
                            </button>
                        </div>
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};

export default MyAccount;