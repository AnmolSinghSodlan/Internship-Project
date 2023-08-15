"use client";

import { useState, useEffect } from "react";
import useStore from "../../store";
import { redirect, useRouter } from "next/navigation";

type Timeout = ReturnType<typeof setTimeout>;


export default function UpdateCustomer({ params: { id } }: any) {
  const customers = useStore((state) => state.customers);

  const updateCustomer = useStore((state) => state.updateCustomer);

  const router = useRouter();

  function setIntialFormData() {
    const selectedCustomer = customers.find(
      (customer: any) => customer.id == id
    )!;

    if (selectedCustomer) {
      const { name, email, phoneNumber } = selectedCustomer;

      return { name, email, phoneNumber };
    } else {
      redirect("/404");
    }
  }

  const [formData, setFormData] = useState(setIntialFormData);

  const [formValid, setFormValid] = useState<{
    name: null | boolean;
    email: null | boolean;
    phoneNumber: null | boolean;
  }>({
    name: true,
    email: true,
    phoneNumber: true,
  });

  const [nameValidateTimeout, setNameValidateTimeout] =
    useState<null | Timeout>(null);

  const [emailValidateTimeout, setEmailValidateTimeout] =
    useState<null | Timeout>(null);

  const [phoneNumberValidateTimeout, setPhoneNumberValidateTimeout] =
    useState<null | Timeout>(null);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const validateName = (input: string) => {
    if (input.length > 0) {
      setFormValid((prev) => ({ ...prev, name: true }));
    } else {
      setFormValid((prev) => ({ ...prev, name: false }));
    }
  };

  const validateEmail = (input: string) => {
    if (input) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const isValid = emailRegex.test(input);
      4;

      if (isValid) {
        setFormValid((prev) => ({ ...prev, email: true }));
      } else {
        setFormValid((prev) => ({ ...prev, email: false }));
      }
    }
  };

  const validatePhoneNumber = (input: string) => {
    if (input) {
      const phoneNumberRegex = /^[6-9]\d{9}$/;
      const isValid = phoneNumberRegex.test(input);

      if (isValid) {
        setFormValid((prev) => ({ ...prev, phoneNumber: true }));
      } else {
        setFormValid((prev) => ({ ...prev, phoneNumber: false }));
      }
    }
  };

  useEffect(() => {
    if (formValid.name && formValid.email && formValid.phoneNumber) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [formData, formValid]);

  const formSubmitHandler = (event: any) => {
    event.preventDefault();
    updateCustomer(id, formData);
    router.push("/");
  };

  return (
    <section>
      <h1>Update Customer</h1>
      <form
        className="mt-20 w-fit mx-auto  flex flex-col gap-6"
        onSubmit={formSubmitHandler}
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="bg-transparent border-slate-600 border-2 p-2 text-md rounded-md"
            type="text"
            id="name"
            value={formData.name}
            onChange={(event) => {
              if (nameValidateTimeout) {
                clearTimeout(nameValidateTimeout);
              }
              const timeout = setTimeout(() => {
                validateName(event.target.value);
              }, 400);

              setNameValidateTimeout(timeout);

              setFormData((prev) => ({ ...prev, name: event.target.value }));
            }}
          />

          {formValid.name === false && (
            <p className="text-red-600 font-semibold">Invalid Name</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="bg-transparent border-slate-600 border-2 p-2 text-md rounded-md"
            type="email"
            id="email"
            value={formData.email}
            onChange={(event) => {
              if (emailValidateTimeout) {
                clearTimeout(emailValidateTimeout);
              }
              const timeout = setTimeout(() => {
                validateEmail(event.target.value);
              }, 400);

              setEmailValidateTimeout(timeout);

              setFormData((prev) => ({ ...prev, email: event.target.value }));
            }}
          />

          {formValid.email === false && (
            <p className="text-red-600 font-semibold">Invalid Email</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="bg-transparent border-slate-600 border-2 p-2 text-md rounded-md"
            type="string"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(event) => {
              if (phoneNumberValidateTimeout) {
                clearTimeout(phoneNumberValidateTimeout);
              }
              const timeout = setTimeout(() => {
                validatePhoneNumber(event.target.value);
              }, 400);

              setPhoneNumberValidateTimeout(timeout);

              setFormData((prev) => ({
                ...prev,
                phoneNumber: event.target.value,
              }));
            }}
          />
          {formValid.phoneNumber === false && (
            <p className="text-red-600 font-semibold">Invalid Phone Number</p>
          )}
        </div>
        <button
          className="bg-slate-500 disabled:bg-slate-500 disabled:opacity-50 disabled:pointer-events-none"
          disabled={btnDisabled}
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
