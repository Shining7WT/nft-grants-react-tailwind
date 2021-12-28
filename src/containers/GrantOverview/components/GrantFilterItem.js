import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";

const GrantFilterItem = ({ title, options }) => {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    console.log("initialied component", options);
  }, []);

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="bg-bgGray flex-1 rounded-lg">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full rounded-lg shadow-sm pl-3 pr-4 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm">
                <Listbox.Label className="block font-normal text-lbGray text-xs">
                  {title}
                </Listbox.Label>
                <span className="mt-1 flex items-center relative">
                  <span className="block truncate text-lbBlack font-semibold text-sm">
                    {selected.name}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
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
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute w-5 h-5 mt-2 right-5 bg-dropdownBGColor transform rotate-45 rounded"></div>
                <Listbox.Options className="absolute z-10 mt-4 w-full bg-dropdownBGColor max-h-56 rounded-xl py-4 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white lg:bg-black" : "text-dropdownTextColor",
                          "cursor-default select-none relative py-2 pl-5 pr-5"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center justify-between">
                            <span
                              className={classNames(
                                selected ? "font-semibold text-white" : "font-medium text-dropdownTextColor",
                                "ml-1 block truncate"
                              )}
                            >
                              {option.name}
                            </span>
                            <span
                              className={classNames(
                                selected ? "font-semibold text-white" : "font-medium text-dropdownTextColor",
                                "block truncate"
                              )}
                            >
                              {option.val}
                            </span>
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
  );
};

export default GrantFilterItem;
