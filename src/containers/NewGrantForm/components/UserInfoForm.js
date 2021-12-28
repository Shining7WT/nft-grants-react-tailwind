import React from "react";
import { Controller } from 'react-hook-form';
import ReactSelect from "react-select";
import { countries } from 'countries-list';
import "./userInfo.scss";

const UserInfoForm = ({ register, errors, control, grant }) => {
  return (
    <div className="my-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label htmlFor="GithubIssueLink" className="block text-sm font-medium text-gray-700">
          Github Issue Link
        </label>
        <div className="mt-1">
          <input
            id="GithubIssueLink"
            name="GithubIssueLink"
            value={grant && grant.github_issue_url}
            ref={register({ required: "Github issue link is required" })}
            errors={errors}
            disabled
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-5 block w-full sm:text-sm border ${errors && errors.GithubIssueLink && errors.GithubIssueLink.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          />
          {errors && errors.GithubIssueLink && errors.GithubIssueLink.message ? <span className="p-1 text-red-600 text-sm">{errors.GithubIssueLink.message}</span> : <></>}
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="firstName"
            id="firstName"
            ref={register({ required: "First name is required" })}
            errors={errors}
            autoComplete="given-name"
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-5 block w-full sm:text-sm border ${errors && errors.firstName && errors.firstName.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          />
          {errors && errors.firstName && errors.firstName.message ? <span className="p-1 text-red-600 text-sm">{errors.firstName.message}</span> : <></>}
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="lastName"
            id="lastName"
            ref={register({ required: "Last name is required" })}
            errors={errors}
            autoComplete="family-name"
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-5 block w-full sm:text-sm border ${errors && errors.lastName && errors.lastName.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          />
          {errors && errors.lastName && errors.lastName.message ? <span className="p-1 text-red-600 text-sm">{errors.lastName.message}</span> : <></>}
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "This is not a valid email",
              },
            })}
            errors={errors}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-5 block w-full sm:text-sm border ${errors && errors.email && errors.email.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          />
          {errors && errors.email && errors.email.message ? <span className="p-1 text-red-600 text-sm">{errors.email.message}</span> : <></>}
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <div className="mt-1">
          <Controller
            as={<ReactSelect />}
            options={Object.entries(countries).map(c => ({ label: c[1].name, value: c[0] }))}
            name="country"
            id="country"
            classNamePrefix="react-select"
            placeholder=""
            isClearable
            control={control}
            onChange={([selected]) => {
              return { value: selected };
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="companyName"
            id="companyName"
            ref={register()}
            errors={errors}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-5 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
