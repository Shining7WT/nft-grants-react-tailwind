import React from 'react';
import CopyIcon from '../../../img/copyicon.svg';
import EditIcon from '../../../img/pencil.svg';
import UserImg from '../../../img/userimg.jpg';

const MyAccount = () => {
  return (
    <div className="myAccount">
        <div className="myAccountInner" style={{ maxWidth: '800px',margin:'0 auto', }}>
            <form>
                <div className="xl:flex xl:justify-between xl:space-x-3 mt-3 px-3">
                    <div class="md:flex-1">
                        <div className="lgTitle">
                            <h3 className="page-title font-medium">My Account</h3>
                        </div>
                    </div>
                </div>
                <div className="xl:flex mt-8 items-center xl:justify-between xl:space-x-3 mt-3 px-3">
                    <div class="flex-none">
                        <div className="userInfo">
                            <div className="userImg relative">
                                <img src={UserImg} alt="User" />
                                <a href="javascript:void(0)" className="editBtn absolute bg-white">
                                    <img src={EditIcon} alt="Edit" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 pl-3">
                        <div className="userInfo">                     
                            <div className="userInfoMain">
                                <h3 className="text-lg text-darkGray font-bold">Jhondoe1</h3>
                                <span className="text-stxblue text-sm">Admin</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex mt-6 xl:justify-between md:space-x-6 mt-3 px-3">
                    <div class="md:flex-1">
                        <div className="formGroup">
                            <label className="block text-sm text-lbGray">
                                First Name
                            </label>
                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Jhon"
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="md:flex-1 mt-3 md:mt-0">
                        <div className="formGroup">
                            <label className="block text-sm text-lbGray">
                                Last Name
                            </label>
                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Doe"
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex mt-3 md:mt-8 xl:justify-between md:space-x-6 mt-3 px-3">
                    <div class="md:flex-1">
                        <div className="formGroup">
                            <label className="block text-sm text-lbGray">
                                Display Name
                            </label>
                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Jhondoe1"
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="md:flex-1 mt-3 md:mt-0">
                        <div className="formGroup">
                            <label className="block text-sm text-lbGray">
                                Email
                            </label>
                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Jhon.doe@abc.com"
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex mt-3 md:mt-8 xl:justify-between md:space-x-3 mt-3 px-3">
                    <div class="md:flex-1">
                        <div className="formGroup">
                            <label className="block text-sm text-lbGray">
                                Wallet Address
                            </label>
                            <div className="mt-3 relative">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="SPZTTWJ2DFJTQWV2THMY55W2ZVD7T7G9CCBNDCQ7"
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                />
                                <div className="copyBtn absolute">
                                    <a href="javascript:void(0)" className="flex">
                                        <label className="text-stxblue font-medium text-sm pr-2">
                                            Copy
                                        </label>
                                        <img src={CopyIcon} alt="Copy" />
                                    </a>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:flex mt-11 xl:justify-between md:space-x-3 px-3">
                    <div class="flex-1">
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