import React, { useEffect } from 'react';

const FundingInfoForm = ({ register, errors, watch, getValues, setValue, validateMemo, setValidateMemo, setShowMemoModal }) => {
  const STX_address = [
    'SP1V21EG2APTB57VXEM9BK4TFWK1GN8NYW5DB0Q46',
    'SPX8T06E8FJQ33CX8YVR9CC6D9DSTF6JE0Y8R7DS',
    'SP3HXJJMJQ06GNAZ8XWDN1QM48JEDC6PP6W3YZPZJ',
    'SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS',
    'SP17W3ZJGX0BTMB897B96KFWHDE0PF45B0NMAE0AG',
    'SP3G2DMG5WWCP8XF1QZSEQ1XE73X639ABZC835EZV',
    'SPNBYP1MY456K29804XHT4PY5QKMSXNRBHGADTDY',
  ];

  const watchSTXWalletAddress = watch('STXWalletAddress');
  const watchMemo = watch('walletMemo')
  const watchFundWithUsd = watch('fund_with_usd')

  useEffect(() => {
    if (getValues('fund_with_usd') && getValues('STXWalletAddress')) {
      setValue('STXWalletAddress', '')
      setValue('walletMemo', '')
    }
  }, [getValues('fund_with_usd')]);

  useEffect(() => {
    if (STX_address.includes(getValues('STXWalletAddress'))) {
      setValidateMemo(true);
    } else {
      setValidateMemo(false);
    }
  }, [watchSTXWalletAddress]);

  useEffect(() => {
    if (!validateMemo) setShowMemoModal(false);
    else if (!watchMemo) setShowMemoModal(true);
    else setShowMemoModal(false);
  }, [watchMemo]);

  return (
    <div className="my-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <div className="flex justify-end">
          <a href="https://www.hiro.so/wallet" target="_blank" rel="noreferrer">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="-ml-0.5 mr-2 h-4 w-4"><i className="far fa-plus" /></span>
              Create STX Wallet
            </button>
          </a>
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="STXWalletAddress" className="block text-sm font-medium text-gray-700">
          STX Wallet Address
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="STXWalletAddress"
            id="STXWalletAddress"
            ref={!watchFundWithUsd ? register({ required: "STX wallet address required" }) : register()}
            errors={errors}
            disabled={getValues('fund_with_usd')}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-5 block w-full sm:text-sm border ${errors && errors.STXWalletAddress && errors.STXWalletAddress.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          />
          {errors && errors.STXWalletAddress && errors.STXWalletAddress.message ? <span className="p-1 text-red-600 text-sm">{errors.STXWalletAddress.message}</span> : <></>}
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="walletMemo" className="block text-sm font-medium text-gray-700">
          Wallet Memo
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="walletMemo"
            id="walletMemo"
            ref={register(validateMemo && {required: 'The STX address you used was detected as an exchange address. These require a memo.'})}
            errors={errors}
            disabled={getValues('fund_with_usd')}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-5 block w-full sm:text-sm border ${errors && errors.walletMemo && errors.walletMemo.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          />
          {errors && errors.walletMemo && errors.walletMemo.message ? <span className="p-1 text-red-600 text-sm">{errors.walletMemo.message}</span> : <></>}
        </div>
      </div>

      <div className="sm:col-span-6">
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="fund_with_usd"
              aria-describedby="comments-description"
              name="fund_with_usd"
              type="checkbox"
              ref={register()}
              errors={errors}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="fund_with_usd" className="font-medium text-gray-700">
              Fund with USD
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingInfoForm;