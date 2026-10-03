import CheckoutForm from "@/components/ui/CheckoutForm";

export default async function checkout(props: any) {
  const params = await props.params;

  const { cartId } = params;
  return (
    <>
      <CheckoutForm cartId={cartId} />
    </>
  );
}
