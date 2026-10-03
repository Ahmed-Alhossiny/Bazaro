"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  ChevronDown,
  Loader2,
  MapPin,
  MapPinned,
  Phone,
  Plus,
  Tag,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { AddressFormValues, addressSchema } from "@/Schemas/AddressSchema";

import { toast } from "./toast";
import {
  createAddress,
  deleteAddress,
  fetchAddress,
  fetchAddresses,
} from "@/app/api/actions/addressActions/AddressAction";
import { AddressListResponse } from "@/types/AddressType";

const fields: Record<
  keyof AddressFormValues,
  {
    label: string;
    placeholder: string;
    type: string;
    autoComplete: string;
    Icon: LucideIcon;
  }
> = {
  name: {
    label: "Address Name",
    placeholder: "e.g. Home, Work",
    type: "text",
    autoComplete: "off",
    Icon: Tag,
  },
  details: {
    label: "Address Details",
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
    Icon: Phone,
  },
  city: {
    label: "City",
    placeholder: "e.g. Cairo",
    type: "text",
    autoComplete: "address-level2",
    Icon: Building2,
  },
};

function AddressDetails({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["address", id],
    queryFn: () => fetchAddress(id),
  });

  const address = data?.data;

  if (isLoading) {
    return (
      <div className="flex animate-pulse flex-col gap-3" aria-busy="true">
        <div className="h-3 w-3/4 rounded bg-black/10" />
        <div className="h-3 w-1/2 rounded bg-black/10" />
      </div>
    );
  }

  if (isError || !address) {
    return (
      <p className="text-sm text-red-500">Could not load address details.</p>
    );
  }

  return (
    <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
      <div className="flex flex-col gap-0.5 sm:col-span-2">
        <dt className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
          Details
        </dt>
        <dd className="wrap-break-word text-[#1A1A1A]">{address.details}</dd>
      </div>
      <div className="flex flex-col gap-0.5">
        <dt className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
          Phone
        </dt>
        <dd className="text-[#1A1A1A]">{address.phone}</dd>
      </div>
      <div className="flex flex-col gap-0.5">
        <dt className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
          City
        </dt>
        <dd className="text-[#1A1A1A]">{address.city}</dd>
      </div>
    </dl>
  );
}

export default function AddressBook() {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<AddressListResponse>({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });

  const addresses = data?.data ?? [];

  const addMutation = useMutation({
    mutationFn: async (values: AddressFormValues) => {
      const payload = await createAddress(values);
      if (payload.status !== "success") throw new Error(payload.message);
      return payload;
    },
    onSuccess: (payload) => {
      queryClient.setQueryData<AddressListResponse>(["addresses"], payload);
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const payload = await deleteAddress(id);
      if (payload.status !== "success") throw new Error(payload.message);
      return payload;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["addresses"] });
      const previous = queryClient.getQueryData<AddressListResponse>([
        "addresses",
      ]);

      queryClient.setQueryData<AddressListResponse>(["addresses"], (old) =>
        old ? { ...old, data: old.data.filter((a) => a._id !== id) } : old,
      );

      return { previous };
    },
    onSuccess: () => {
      toast.add({ type: "success", description: "Address removed." });
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["addresses"], context?.previous);
      toast.add({
        type: "error",
        description: "Can not remove address.",
        priority: "high",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  async function handleAdd(values: AddressFormValues) {
    try {
      await addMutation.mutateAsync(values);

      formik.resetForm();
    } catch {
      toast.add({
        type: "error",
        description: "Can not add address.",
        priority: "high",
      });
    }
  }

  const formik = useFormik<AddressFormValues>({
    initialValues: { name: "", details: "", phone: "", city: "" },
    validationSchema: toFormikValidationSchema(addressSchema),
    onSubmit: handleAdd,
  });

  function renderField(name: keyof AddressFormValues) {
    const { label, placeholder, type, autoComplete, Icon } = fields[name];
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
          My addresses
        </h1>
        <p className="text-sm text-[#7A7A7A]">
          Save the places you want your orders delivered to.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">
            Saved addresses
            {!isLoading && !isError ? (
              <span className="ml-2 text-sm font-normal text-[#7A7A7A]">
                ({addresses.length})
              </span>
            ) : null}
          </h2>

          {isLoading ? (
            <ul className="flex flex-col gap-3" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <li
                  key={i}
                  className="flex animate-pulse items-center gap-3 rounded-xl border border-black/10 bg-white p-4"
                >
                  <div className="size-10 shrink-0 rounded-lg bg-black/10" />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-3 w-1/3 rounded bg-black/10" />
                    <div className="h-3 w-1/2 rounded bg-black/10" />
                  </div>
                </li>
              ))}
            </ul>
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-black/10 bg-white px-6 py-10 text-center">
              <p className="text-sm text-[#7A7A7A]">
                We couldn&apos;t load your addresses.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="h-10 cursor-pointer rounded-lg bg-[#E8571F] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#D14A16]"
              >
                Try again
              </button>
            </div>
          ) : addresses.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-black/20 bg-[#F7F5F2] px-6 py-12 text-center">
              <MapPinned size={32} className="text-[#8E93A0]" />
              <p className="text-sm font-semibold text-[#1A1A1A]">
                No saved addresses yet
              </p>
              <p className="text-xs text-[#7A7A7A]">
                Add your first address using the form.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {addresses.map((address) => {
                const expanded = expandedId === address._id;
                const confirming = confirmId === address._id;

                return (
                  <li
                    key={address._id}
                    className="overflow-hidden rounded-xl border border-black/10 bg-white transition-shadow hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E8571F]/10 text-[#E8571F]">
                        <MapPin size={18} />
                      </span>

                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() =>
                          setExpandedId(expanded ? null : address._id)
                        }
                        className="flex min-w-0 flex-1 cursor-pointer flex-col gap-0.5 text-left"
                      >
                        <span className="truncate text-sm font-semibold text-[#1A1A1A]">
                          {address.name}
                        </span>
                        <span className="truncate text-xs text-[#7A7A7A]">
                          {address.city} · {address.phone}
                        </span>
                      </button>

                      <button
                        type="button"
                        aria-label={expanded ? "Hide details" : "Show details"}
                        onClick={() =>
                          setExpandedId(expanded ? null : address._id)
                        }
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#8E93A0] transition-colors hover:bg-[#F7F5F2] hover:text-[#1F2937]"
                      >
                        <ChevronDown
                          size={16}
                          className={
                            "transition-transform duration-200 " +
                            (expanded ? "rotate-180" : "")
                          }
                        />
                      </button>

                      <button
                        type="button"
                        aria-label={"Delete " + address.name}
                        onClick={() => setConfirmId(address._id)}
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#8E93A0] transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {expanded ? (
                      <div className="border-t border-black/10 bg-[#F7F5F2] px-4 py-4">
                        <AddressDetails id={address._id} />
                      </div>
                    ) : null}

                    {confirming ? (
                      <div className="flex flex-col gap-3 border-t border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-red-700">
                          Delete this address?
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setConfirmId(null)}
                            className="h-9 flex-1 cursor-pointer rounded-lg border border-black/10 bg-white px-4 text-sm font-medium text-[#1F2937] transition-colors hover:bg-[#F7F5F2] sm:flex-none"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              removeMutation.mutate(address._id);
                              setConfirmId(null);
                              if (expanded) setExpandedId(null);
                            }}
                            className="h-9 flex-1 cursor-pointer rounded-lg bg-red-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-600 sm:flex-none"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="order-first flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-7 lg:order-0 lg:sticky lg:top-6"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#E8571F] text-white">
              <Plus size={16} />
            </span>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">
              Add new address
            </h2>
          </div>

          {renderField("name")}
          {renderField("details")}
          {renderField("phone")}
          {renderField("city")}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="mt-1 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8571F] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D14A16] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save address"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
