import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import {
  HomeIcon,
  InboxIcon,
  XIcon,
  VariableIcon,
  PresentationChartLineIcon,
  CreditCardIcon,
  TableIcon,
  MenuIcon,
  DesktopComputerIcon,
} from '@heroicons/react/outline';

import logo from "../../img/stacks-logo.svg";
import DefaultImage from "../../img/default_image.jpg";
import { API_ENDPOINT_URL } from '../../constants/default';

const navigation = [
  { name: 'My Dashboard', link: '/my-dashboard', icon: DesktopComputerIcon, id: "ass6" },
  { name: 'Grants', link: '/', icon: HomeIcon, id: "ass1" },
  { name: 'Payments Due', link: '/ready-for-funding', icon: CreditCardIcon, id: "ass2" },
  { name: 'Funding Ledger', link: '/funding-ledger', icon: TableIcon, id: "ass3" },
  { name: 'Reporting', link: '/report', icon: PresentationChartLineIcon, id: "ass3" },
  { name: 'Stale Grants', link: '/grants/stale', icon: InboxIcon, id: "ass4" },
  { name: 'Converter', link: '/converter', icon: VariableIcon, id: "ass5" },
  {
    name: 'sub menu', icon: VariableIcon,
    noLine: true,
    children: [
      {
        name: 'sub menu',
        children: [
          { name: 'dummy', link: '', id: "ass9" },
          {
            name: 'sub menu',
            children: [
              { name: 'dummy', link: '', },
            ], id: "ass10"
          }
        ], id: "ass8"
      },
      { name: 'dummy', link: '', id: "ass7" }
    ], id: "ass6"
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [openSubNav, setOpenSubNav] = useState([]);
  const userProfileDropdownRef = useRef(null);
  const path = window.location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem('grant_app_token');

  const handleClickOutside = (event) => {
    if (userProfileDropdownRef.current && !userProfileDropdownRef.current.contains(event.target)) {
      setShowUserDropdown(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('grant_app_token')
    navigate("/login")
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const user = jwt.decode(token)
      setUserAvatar(user.avatar_url);
      setUserName(user.name)
    }
  }, [token])

  const toggle = (id) => {
    if (openSubNav.find((aa) => { return aa === id }) === id) {
      setOpenSubNav(openSubNav.filter(item => item !== id));
    }
    else setOpenSubNav([...openSubNav, id])
  }

  const NestedNav = ({ data, classNamesaa }) => {
    return data.map(item => {
      return (
        <div>
          <Link
            key={item.name}
            to={item.children ? "" : item.link}
            className={classNames(
              (path === item.link)
                ? 'text-white'
                : 'text-gray-light hover:bg-gray-600 hover:bg-opacity-75',
              'group flex flex-col font-open-sauce text-base font-bold rounded-md relative', classNamesaa ? classNamesaa : "relative pl-3 px-2 py-3"
            )}
            onClick={() => { item.children && toggle(item.id) }}
          >
            <div className="flex items-center">
              {
                path === item.link && !classNamesaa ?
                  <div className="w-8 h-8 -left-8  absolute" style={{
                    background: "#5546FF",
                    boxShadow: "1px 0px 10px #5546FF",
                    borderRadius: "40px"
                  }} /> : null
              }
              {item.icon ?
                <item.icon className={`mr-3 flex-shrink-0 h-6 w-6 ${path === item.link ? 'text-white' : 'text-gray-light hover:bg-gray-600 hover:bg-opacity-75'}`} aria-hidden="true" />
                : null}
              <div className={`flex w-full items-center justify-between ${classNamesaa ? "px-2" : ""}`}>
                {item.name}
                {
                  item.children ? <>
                    {
                      openSubNav.find((aa) => { return aa === item.id }) === item.id ?
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 1L9 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg> : <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="#86888B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                  </> : null
                }
              </div>
            </div>
          </Link>
          <div>
            {
              item.children ?
                <div className={`flex-1 flex flex-col ${item.noLine ? "pl-10" : "ml-3 pl-3 border-l border-gray-dark"} overflow-y-auto`}>
                  {
                    openSubNav.find((aa) => { return aa === item.id }) === item.id ?
                      <NestedNav classNamesaa="absolute py-1" data={item.children} /> : null
                  }
                </div> : null
            }
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-black">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {
                  (API_ENDPOINT_URL.includes('staging')) &&
                  <div className="flex justify-between items-center w-full bg-red-600 text-sm">
                    <div className="py-4 px-3 text-white">
                      You are on the staging version.
                    </div>
                  </div>
                }
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-20 w-auto"
                      src={logo}
                      alt="Stacks Foundation"
                    />
                  </div>
                  <div className="mx-4 mt-1 mb-4">
                    <Link to="/grant-application" className="flex justify-center items-center text-white font-bold bg-stxblue w-full text-center py-3 rounded-lg">
                      <div className="">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 8.65625H16.3125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.65625 1L8.65625 16.3125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>&nbsp;&nbsp;<div className="text-sm">Add Grant Application</div>
                    </Link>
                  </div>
                  <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-900 scrollbar-thumb-gray-light scrollbar-w-2">
                    <NestedNav data={navigation} />
                  </nav>
                </div>
                <div ref={userProfileDropdownRef} className="relative p-4">
                  <div className="w-full group block">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                      <div className="w-14">
                        <img
                          className="inline-block h-9 w-9 rounded-full"
                          src={(userAvatar) || DefaultImage}
                          alt="logo"
                        />
                      </div>
                      <div className="ml-3 w-full">
                        <p className="text-md text-left font-medium text-white group-hover:text-white">{userName && userName.split(' ')[0]} </p>
                      </div>
                      <div className="text-white w-3">
                        <i className="fal fa-angle-down" />
                      </div>
                    </div>
                  </div>
                  {
                    showUserDropdown &&
                    <div className="absolute right-6 -top-16 w-64 xl:w-52 shadow-lg bg-gray-600 rounded-lg">
                      {/* <div className="flex justify-between text-white text-base px-8 py-5 border-gray-300 border-b cursor-pointer">
                        <div>Settings</div>
                        <div><i className="far fa-cog" /></div>
                      </div> */}
                      <div className="flex justify-between text-white text-base px-8 py-5 cursor-pointer" onClick={() => handleLogout()}>
                        <div>Log Out</div>
                        <div><i className="far fa-sign-out" /></div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-black">
            {
              (API_ENDPOINT_URL.includes('staging')) &&
              <div className="flex justify-between items-center w-full bg-red-600 text-sm">
                <div className="py-4 px-3 text-white">
                  You are on the staging version.
                </div>
              </div>
            }
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-20 w-auto"
                  src={logo}
                  alt="Stacks Foundation"
                />
              </div>
              <div className="mx-4 mt-1 mb-4">
                <Link to="/grant-application" className="flex justify-center items-center text-white font-bold bg-stxblue w-full text-center py-3 rounded-lg">
                  <div className="">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 8.65625H16.3125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8.65625 1L8.65625 16.3125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>&nbsp;&nbsp;<div className="text-sm">Add Grant Application</div>
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-900 scrollbar-thumb-gray-light scrollbar-w-2">
                <NestedNav data={navigation} />
              </nav>
            </div>
            <div ref={userProfileDropdownRef} className="relative p-4">
              <div className="w-full group block">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                  <div className="w-14">
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={(userAvatar) || DefaultImage}
                      alt="logo"
                    />
                  </div>
                  <div className="ml-3 w-full">
                    <p className="text-md text-left font-medium text-white group-hover:text-white">{userName && userName.split(' ')[0]} </p>
                  </div>
                  <div className="text-white w-3">
                    <i className="fal fa-angle-down" />
                  </div>
                </div>
              </div>
              {
                showUserDropdown &&
                <div className="absolute right-6 -top-16 w-64 xl:w-52 shadow-lg bg-gray-600 rounded-lg">
                  {/* <div className="flex justify-between text-white text-base px-8 py-5 border-gray-300 border-b cursor-pointer">
                    <div>Settings</div>
                    <div><i className="far fa-cog" /></div>
                  </div> */}
                  <div className="flex justify-between text-white text-base px-8 py-5 cursor-pointer" onClick={() => handleLogout()}>
                    <div>Log Out</div>
                    <div><i className="far fa-sign-out" /></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="pb-10 bg-gray-50 h-screen overflow-y-auto scrollbar scrollbar-thumb-rounded-md scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-w-3">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
};

export default Layout;
