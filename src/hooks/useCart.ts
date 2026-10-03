"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CartResponseType } from "@/types/CartType";
import {
  buildGuestCartResponse,
  clearGuestCart,
  removeGuestItem,
  updateGuestCount,
} from "@/utils/GuestCart";

export function formatPrice(value: number) {
  return value.toLocaleString("en-US") + " LE";
}

export function useAddToCartSync() {
  const queryClient = useQueryClient();

  function begin(amount: number = 1) {
    queryClient.setQueryData<number>(["cartPending"], function (old) {
      return (old ?? 0) + amount;
    });
  }

  function rollback(amount: number = 1) {
    queryClient.setQueryData<number>(["cartPending"], function (old) {
      return Math.max((old ?? 0) - amount, 0);
    });
  }

  async function commit(amount: number = 1) {
    try {
      await queryClient.invalidateQueries({ queryKey: ["getCart"] });
    } finally {
      rollback(amount);
    }
  }

  return { begin: begin, commit: commit, rollback: rollback };
}

export function useCart() {
  const queryClient = useQueryClient();
  const { status } = useSession();

  const isGuest = status === "unauthenticated";
  const mode = isGuest ? "guest" : "user";

  const query = useQuery<CartResponseType>({
    queryKey: ["getCart", mode],
    enabled: status !== "loading",
    queryFn: async function () {
      if (isGuest) {
        return buildGuestCartResponse();
      }
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch");

      return response.json();
    },
  });

  const pendingQuery = useQuery<number>({
    queryKey: ["cartPending"],
    queryFn: async function () {
      return 0;
    },
    initialData: 0,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const updateMutation = useMutation({
    mutationFn: async function (vars: { productId: string; count: number }) {
      if (isGuest) {
        updateGuestCount(vars.productId, vars.count);
        return { status: "success" };
      }
      const response = await fetch("/api/cart/" + vars.productId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: vars.count }),
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async function (productId: string) {
      if (isGuest) {
        removeGuestItem(productId);
        return { status: "success" };
      }
      const response = await fetch("/api/cart/" + productId, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove");
      return response.json();
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: async function () {
      if (isGuest) {
        clearGuestCart();
        return { status: "success" };
      }
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to clear cart");
      return response.json();
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
  });

  const products = query.data?.data?.products ?? [];

  let itemCount = 0;
  for (let i = 0; i < products.length; i++) {
    itemCount += products[i].count;
  }

  const badgeCount = itemCount + (pendingQuery.data ?? 0);
  const total = query.data?.data?.totalCartPrice ?? 0;
  const isBusy =
    updateMutation.isPending ||
    removeMutation.isPending ||
    clearMutation.isPending;

  function updateCount(productId: string, count: number) {
    updateMutation.mutate({ productId: productId, count: count });
  }

  function removeItem(productId: string) {
    removeMutation.mutate(productId);
  }

  function clearCart() {
    clearMutation.mutate();
  }

  function refetch() {
    queryClient.invalidateQueries({ queryKey: ["getCart"] });
  }

  return {
    query: query,
    products: products,
    itemCount: itemCount,
    badgeCount: badgeCount,
    total: total,
    isGuest: isGuest,
    isLoading: status === "loading" || query.isLoading,
    isError: query.isError,
    isBusy: isBusy,
    updateCount: updateCount,
    removeItem: removeItem,
    clearCart: clearCart,
    refetch: refetch,
  };
}
