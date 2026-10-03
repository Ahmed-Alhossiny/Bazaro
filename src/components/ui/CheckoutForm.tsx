"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CreditCard,
  Hash,
  Loader2,
  type LucideIcon,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckoutFormValues, checkoutSchema } from "@/Schemas/CheckoutSchema";
import { payCash } from "@/app/api/actions/paymentActions/paycash.action";
import { payOnline } from "@/app/api/actions/paymentActions/payonline.action";

import { formatPrice, useCart } from "@/hooks/useCart";
import { toast } from "./toast";
import { AddressListResponse, AddressType } from "@/types/AddressType";
import { fetchAddresses } from "@/app/api/actions/addressActions/AddressAction";
import { CartResponseType } from "@/types/CartType";

type ShippingAddress = Omit<CheckoutFormValues, "paymentMethod">;

const NEW_ADDRESS = "new";

const fields: Record<
  keyof ShippingAddress,
  {
    label: string;
    placeholder: string;
    type: string;
    autoComplete: string;
    inputMode?: "numeric" | "tel";
    Icon: LucideIcon;
  }
> = {
  details: {
    label: "Address",
    placeholder: "Street, building, apartment",
    type: "text",
    autoComplete: "street-address",
    Icon: MapPin,
  },
  phone: {
    label: "Phone Number",
    placeholder: "e.g. 01012345678",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    Icon: Phone,
  },
  city: {
    label: "City",
    placeholder: "e.g. Cairo",
    type: "text",
    autoComplete: "address-level2",
    Icon: Building2,
  },
  postalCode: {
    label: "Postal Code",
    placeholder: "e.g. 12345",
    type: "text",
    autoComplete: "postal-code",
    inputMode: "numeric",
    Icon: Hash,
  },
};

const paymentOptions: {
  value: CheckoutFormValues["paymentMethod"];
  title: string;
  hint: string;
  Icon: LucideIcon;
}[] = [
  {
    value: "cash",
    title: "Cash on delivery",
    hint: "Pay when your order arrives",
    Icon: Banknote,
  },
  {
    value: "card",
    title: "Card",
    hint: "Pay online by credit or debit card",
    Icon: CreditCard,
  },
];

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { products, total, itemCount, isLoading } = useCart();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const { data: addressData, isLoading: addressesLoading } =
    useQuery<AddressListResponse>({
      queryKey: ["addresses"],
      queryFn: fetchAddresses,
    });

  const savedAddresses = addressData?.data ?? [];

  async function handleCashCheckout(shippingAddress: ShippingAddress) {
    const payload = await payCash(cartId, shippingAddress);

    if (payload.status == "success") {
      queryClient.setQueriesData<CartResponseType>(
        { queryKey: ["getCart"] },
        (old) =>
          old
            ? {
                ...old,
                numOfCartItems: 0,
                data: { ...old.data, products: [], totalCartPrice: 0 },
              }
            : old,
      );
      queryClient.invalidateQueries({ queryKey: ["getCart"] });

      toast.add({
        type: "success",
        description: "Order created successfully.",
      });
      router.push("/allorders");
    } else {
      toast.add({
        type: "error",
        description: "Can not create order.",
        priority: "high",
      });
    }
  }

  async function handleOnlineCheckout(shippingAddress: ShippingAddress) {
    const payload = await payOnline(cartId, shippingAddress);

    if (payload.status == "success") {
      window.location.href = payload.session.url;
    } else {
      toast.add({
        type: "error",
        description: "Can not create order.",
        priority: "high",
      });
    }
  }

  async function handleCheckout(values: CheckoutFormValues) {
    const { paymentMethod, ...shippingAddress } = values;

    if (paymentMethod === "cash") {
      await handleCashCheckout(shippingAddress);
    } else {
      await handleOnlineCheckout(shippingAddress);
    }
  }

  const formik = useFormik<CheckoutFormValues>({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
      paymentMethod: "cash",
    },
    validationSchema: toFormikValidationSchema(checkoutSchema),
    onSubmit: handleCheckout,
  });

  function selectAddress(address: AddressType) {
    setSelectedAddressId(address._id);
    formik.setValues({
      ...formik.values,
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
  }

  function selectNewAddress() {
    setSelectedAddressId(NEW_ADDRESS);
    formik.setValues({
      ...formik.values,
      details: "",
      phone: "",
      city: "",
    });
    formik.setTouched(
      { ...formik.touched, details: false, phone: false, city: false },
      false,
    );
  }

  function renderField(name: keyof ShippingAddress) {
    const { label, placeholder, type, autoComplete, inputMode, Icon } =
      fields[name];
    const error =
      formik.touched[name] && formik.errors[name]
        ? (formik.errors[name] as string)
        : null;

    return (
      <div className="flex min-w-0 flex-col gap-2">
        <label
          htmlFor={name}
          className="w-fit text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
        >
          {label}
        </label>
        <div
          className={
            "flex h-12 items-center rounded-lg border bg-[#F7F5F2] px-4 transition-all duration-150 focus-within:bg-white focus-within:ring-2 " +
            (error
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
              : "border-black/10 focus-within:border-[#E8571F] focus-within:ring-[#E8571F]/10")
          }
        >
          <Icon size={16} className="mr-3 shrink-0 text-[#8E93A0]" />
          <input
            id={name}
            name={name}
            type={type}
            inputMode={inputMode}
            autoComplete={autoComplete}
            placeholder={placeholder}
            aria-invalid={!!error}
            className="w-full min-w-0 bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#9BA1AC]"
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {error ? <p className="text-xs text-red-500">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
          Checkout
        </h1>
        <p className="text-sm text-[#7A7A7A]">
          Confirm your delivery details and choose how you&apos;d like to pay.
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8"
      >
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#E8571F] text-sm font-semibold text-white">
                1
              </span>
              <h2 className="text-lg font-semibold text-[#1A1A1A]">
                Delivery details
              </h2>
            </div>

            {addressesLoading ? (
              <div
                className="grid animate-pulse grid-cols-1 gap-3 sm:grid-cols-2"
                aria-busy="true"
              >
                <div className="h-18 rounded-xl bg-black/10" />
                <div className="h-18 rounded-xl bg-black/10" />
              </div>
            ) : savedAddresses.length > 0 ? (
              <div className="flex flex-col gap-3">
                <p className="w-fit text-xs font-semibold uppercase tracking-wide text-[#1F2937]">
                  Saved addresses
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {savedAddresses.map((address) => {
                    const selected = selectedAddressId === address._id;
                    return (
                      <button
                        key={address._id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => selectAddress(address)}
                        className={
                          "relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8571F]/20 " +
                          (selected
                            ? "border-[#E8571F] bg-[#E8571F]/5"
                            : "border-black/10 bg-[#F7F5F2] hover:border-black/20 hover:bg-white")
                        }
                      >
                        <span
                          className={
                            "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors " +
                            (selected
                              ? "bg-[#E8571F] text-white"
                              : "bg-white text-[#8E93A0]")
                          }
                        >
                          <MapPin size={18} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5 pr-6">
                          <span className="truncate text-sm font-semibold text-[#1A1A1A]">
                            {address.name}
                          </span>
                          <span className="truncate text-xs text-[#7A7A7A]">
                            {address.city} · {address.phone}
                          </span>
                        </span>
                        <span
                          className={
                            "absolute right-4 top-4 flex size-5 items-center justify-center rounded-full border transition-all " +
                            (selected
                              ? "border-[#E8571F] bg-[#E8571F] text-white"
                              : "border-black/20 bg-white text-transparent")
                          }
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    aria-pressed={selectedAddressId === NEW_ADDRESS}
                    onClick={selectNewAddress}
                    className={
                      "relative flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8571F]/20 " +
                      (selectedAddressId === NEW_ADDRESS
                        ? "border-[#E8571F] bg-[#E8571F]/5"
                        : "border-black/20 bg-[#F7F5F2] hover:border-black/30 hover:bg-white")
                    }
                  >
                    <span
                      className={
                        "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors " +
                        (selectedAddressId === NEW_ADDRESS
                          ? "bg-[#E8571F] text-white"
                          : "bg-white text-[#8E93A0]")
                      }
                    >
                      <Plus size={18} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-semibold text-[#1A1A1A]">
                        New address
                      </span>
                      <span className="text-xs text-[#7A7A7A]">
                        Deliver somewhere else
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            ) : null}

            {renderField("details")}
            {renderField("phone")}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {renderField("city")}
              {renderField("postalCode")}
            </div>
          </section>

          <fieldset className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
            <legend className="sr-only">Payment method</legend>
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#E8571F] text-sm font-semibold text-white">
                2
              </span>
              <h2 className="text-lg font-semibold text-[#1A1A1A]">
                Payment method
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {paymentOptions.map(({ value, title, hint, Icon }) => {
                const selected = formik.values.paymentMethod === value;
                return (
                  <label
                    key={value}
                    className={
                      "relative flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-150 focus-within:ring-2 focus-within:ring-[#E8571F]/20 " +
                      (selected
                        ? "border-[#E8571F] bg-[#E8571F]/5"
                        : "border-black/10 bg-[#F7F5F2] hover:border-black/20 hover:bg-white")
                    }
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={value}
                      checked={selected}
                      onChange={formik.handleChange}
                      className="sr-only"
                    />
                    <span
                      className={
                        "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors " +
                        (selected
                          ? "bg-[#E8571F] text-white"
                          : "bg-white text-[#8E93A0]")
                      }
                    >
                      <Icon size={18} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5 pr-6">
                      <span className="text-sm font-semibold text-[#1A1A1A]">
                        {title}
                      </span>
                      <span className="text-xs leading-5 text-[#7A7A7A]">
                        {hint}
                      </span>
                    </span>
                    <span
                      className={
                        "absolute right-4 top-4 flex size-5 items-center justify-center rounded-full border transition-all " +
                        (selected
                          ? "border-[#E8571F] bg-[#E8571F] text-white"
                          : "border-black/20 bg-white text-transparent")
                      }
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <aside className="rounded-2xl border border-black/10 bg-[#F7F5F2] p-5 sm:p-7 lg:sticky lg:top-6">
          <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
            Order summary
          </h2>

          {isLoading ? (
            <ul className="flex flex-col gap-4" aria-busy="true">
              {[0, 1].map((i) => (
                <li key={i} className="flex animate-pulse gap-3">
                  <div className="size-16 shrink-0 rounded-lg bg-black/10" />
                  <div className="flex flex-1 flex-col gap-2 py-1">
                    <div className="h-3 w-3/4 rounded bg-black/10" />
                    <div className="h-3 w-1/3 rounded bg-black/10" />
                  </div>
                </li>
              ))}
            </ul>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <ShoppingBag size={28} className="text-[#8E93A0]" />
              <p className="text-sm text-[#7A7A7A]">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="-mr-2 flex max-h-80 flex-col divide-y divide-black/10 overflow-y-auto pr-2">
              {products.map((item) => (
                <li key={item._id} className="flex items-center gap-3 py-3">
                  <div className="size-16 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="line-clamp-2 text-sm font-medium text-[#1A1A1A]">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-[#7A7A7A]">
                      {item.product.brand?.name
                        ? item.product.brand.name + " · "
                        : ""}
                      Qty {item.count}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-[#1A1A1A]">
                    {formatPrice(item.price * item.count)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-4 flex flex-col gap-2 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-[#7A7A7A]">
                Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
              </dt>
              <dd className="text-[#1A1A1A]">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#7A7A7A]">Shipping</dt>
              <dd className="text-[#1A1A1A]">Free</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
              <dt className="text-[#1A1A1A]">Total</dt>
              <dd className="text-[#E8571F]">{formatPrice(total)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled={formik.isSubmitting || isLoading || products.length === 0}
            className="group mt-6 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8571F] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D14A16] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {formik.values.paymentMethod === "card"
                  ? "Continue to payment"
                  : "Place order"}
                <ArrowRight
                  size={16}
                  className="transition-all duration-200 group-hover:translate-x-3"
                />
              </>
            )}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#7A7A7A]">
            <ShieldCheck size={14} className="shrink-0" />
            Your information is safe and secure
          </p>
        </aside>
      </form>
    </div>
  );
}
