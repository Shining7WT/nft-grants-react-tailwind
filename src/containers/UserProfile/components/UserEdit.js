import { React,Fragment, useState } from 'react'
import CopyIcon from '../../../img/copyicon.svg';
import EditIcon from '../../../img/pencil.svg';
import { Listbox, Transition } from '@headlessui/react'
import UserImg from '../../../img/userimg.jpg';
import CheckRadio from '../../../img/checkradio.svg';
import UnCheckRadio from '../../../img/uncheckradio.svg';

const role = [
    {
      id: 1,
      name: 'Project Manager',
    },
    {
      id: 2,
      name: 'Developer',
    },
    {
      id: 3,
      name: 'Project Manager',
    },
    {
      id: 4,
      name: 'Developer',
    },
    {
      id: 5,
      name: 'Project Manager',
    },
    {
      id: 6,
      name: 'Developer',
    },
    {
      id: 7,
      name: 'Designer',
    },
    {
      id: 8,
      name: 'Developer',
    },
    {
      id: 9,
      name: 'Project Manager',
    },
    {
      id: 10,
      name: 'Designer',
    },
  ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserEdit = () => {
    const [selected, setSelected] = useState(role[3])
  return (
    <div className="myAccount">
        <div className="myAccountInner" style={{ maxWidth: '800px',margin:'0 auto', }}>
            <form>
                <div className="xl:flex xl:justify-between xl:space-x-3 mt-3 px-3">
                    <div className="flex-1">
                        <div className="lgTitle">
                            <h3 className="page-title font-medium">Edit User</h3>
                        </div>
                    </div>
                </div>
                <div className="xl:flex mt-8 items-center text-center md:text-left xl:justify-between xl:space-x-3 mt-3 px-3">
                    <div className="flex-none">
                        <div className="userInfo">
                            <div className="userImg ml-auto mr-auto md:ml-0 md:mr-0 relative">
                                <img src={UserImg} alt="User" />
                                <a href="#" className="editBtn absolute bg-white">
                                    <img src={EditIcon} alt="Edit" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 pl-3">
                        <div className="userInfo">                     
                            <div className="userInfoMain">
                                <h3 className="text-lg text-darkGray font-bold">Jhondoe1</h3>
                                <span className="text-stxblue text-sm">User</span>
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
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
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
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
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
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
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
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
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
                                    placeholder="SPZTTWJ2DFJTQWV2THMY55W2ZVD7T7G9CCBNDCQ7"
                                    className="formControl rounded-lg placeholder-darkGray focus:dropdownTextColor text-sm p-4 block w-full border border-dropdownTextColor"
                                />
                                <div className="copyBtn absolute px-2 md:px-0 bg-white md:bg-transparent">
                                    <a href="#" className="flex">
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
                <div className="xl:flex mt-8 xl:justify-between xl:space-x-3 mt-3 px-3">
                    <div className="flex-1">
                        <div className="formGroup">
                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <>
                                    <label className="block text-sm text-lbGray">Assigned to</label>
                                    <div className="mt-3 relative">
                                        <Listbox.Button className="relative w-full bg-white border border-dropdownTextColor heightSelect rounded-lg pl-4 pr-10 py-2 text-left cursor-default focus:outline-none focus:dropdownTextColor focus:dropdownTextColor focus:dropdownTextColor sm:text-sm">
                                        <span className="flex items-center">
                                            <span className="block truncate">{selected.name}</span>
                                        </span>
                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </span>
                                        </Listbox.Button>

                                        <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        >
                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {role.map((role) => (
                                            <Listbox.Option
                                                key={role.id}
                                                className={({ active }) =>
                                                classNames(
                                                    active ? '' : 'text-gray-900',
                                                    'cursor-default select-none relative py-2 pl-12 pr-9'
                                                )
                                                }
                                                value={role}
                                            >
                                                {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <div className="radioCstm">
                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 left-6 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <img src={CheckRadio} alt="Checked"/>
                                                                </span>
                                                                ) : <span
                                                                        className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 left-6 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <img src={UnCheckRadio} alt="Checked"/>
                                                                    </span>
                                                            }
                                                            <label for={role.id}
                                                                className={classNames(selected ? 'font-semibold ml-1 text-stxblue' : 'ml-1 text-lightText font-normal', 'block truncate')}
                                                            >
                                                                {role.name}
                                                            </label>
                                                        </div>
                                                    </div>
                            
                                                </>
                                                )}
                                            </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                        </Transition>
                                    </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                    </div>
                </div>
                <div className="xl:flex mt-11 xl:justify-between xl:space-x-3 px-3">
                    <div className="flex-1">
                        <div className="formGroup">
                            <button type="submit" className="w-full heightSelect text-center rounded-lg py-3 px-5 bg-stxblue hover:bg-stxblue text-sm text-white font-semibold mb-7">                          
                                Update User
                            </button>
                        </div>
                    </div>
                </div>    
            </form>        
        </div>
    </div>
  );
};

export default UserEdit;