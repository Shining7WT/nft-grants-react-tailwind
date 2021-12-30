import React, { useRef,useState } from "react";
import CopyIcon from '../../../img/copyicon.svg';
import EditIcon from '../../../img/pencil.svg';
import UserImg from '../../../img/userimg.jpg';

const MyAccount = () => {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [copySuccess, setCopySuccess] = useState('Copy');
    const textAreaRef = useRef(null);
    function copyToClipboard(e) {
        textAreaRef.current.select();
        e.target.focus();
        document.execCommand('copy');
        setCopySuccess('Copied!');
    };
    const handleChange = e => {
        if (e.target.files.length) {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
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
                                    {image.preview ? (
                                        <img src={image.preview} alt="dummy" className="w-20 h-20 rounded-full object-cover" />
                                        ) : (
                                        <>
                                            <img src={UserImg} alt="dummy" className="w-20 h-20 rounded-full object-cover" />
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        id="upload-button"
                                        style={{ display: "none" }}
                                        onChange={handleChange}
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
                                <button type="submit" className="w-full heightSelect text-center rounded-lg py-3 px-5 bg-stxblue hover:bg-stxblue text-sm text-white font-semibold mb-7">                          
                                    Save My Settings
                                </button>
                            </div>
                        </div>
                    </div>   
                </form>         
            </div>
        </div>
    );
};

export default MyAccount;