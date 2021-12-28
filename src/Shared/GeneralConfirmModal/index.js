import React from 'react';

export default function GeneralConfirmModal({
  title,
  message,
  closeModal,
  open,
  handleAction,
  cancelButtonText,
  okButtonText,
}) {
  return (
    <div
      className={`flex h-full w-full fixed top-0 left-0 bg-black bg-opacity-80 justify-center items-center z-20 ${!open ? 'hidden' : ''}`}
    >
      <div className="block bg-white mx-auto w-11/12 md:w-1/3 lg:1/4 p-8 overflow-y-auto relative rounded-lg">
        <button
            onClick={closeModal}
            className="absolute top-0 right-0 p-4 focus:outline-none"
          >
            <svg width="24" height="24">
              <rect width="24" height="24" fill="none" rx="0" ry="0" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.3345 3.77817C18.7487 3.19239 17.799 3.19239 17.2132 3.77817L11.5563 9.43503L5.89948 3.77817C5.31369 3.19239 4.36395 3.19239 3.77816 3.77817C3.19237 4.36396 3.19237 5.31371 3.77816 5.89949L9.43502 11.5563L3.77816 17.2132C3.19238 17.799 3.19237 18.7487 3.77816 19.3345C4.36395 19.9203 5.3137 19.9203 5.89948 19.3345L11.5563 13.6777L17.2132 19.3345C17.799 19.9203 18.7487 19.9203 19.3345 19.3345C19.9203 18.7487 19.9203 17.799 19.3345 17.2132L13.6777 11.5563L19.3345 5.89949C19.9203 5.31371 19.9203 4.36396 19.3345 3.77817Z"
                fill="#a0aec0"
              />
            </svg>
          </button>
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-700 pb-5">
              {title}
            </h2>
            <div className="flex flex-wrap flex-col items-stretch px-4 py-2 bg-white">
              <div>
                <p className="mt-4 text-center text-lg leading-5 text-gray-600">
                  {message}
                </p>
                <div className="mt-5 px-6 sm:mt-6 sm:grid sm:grid-cols-2 gap-3 md:gap-9 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-indigo-600 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 text-sm md:text-lg"
                    onClick={handleAction}
                  >
                    {okButtonText}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 text-sm md:text-lg"
                    onClick={closeModal}
                  >
                    {cancelButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}