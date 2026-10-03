export function parseApiResult(ok: boolean, data: any, fallback: string) {
  if (ok) {
    return { ok: true, message: data?.message || "Success" };
  }

  let message = fallback;

  if (data?.errors?.msg) {
    message = data.errors.msg;
  } else if (data?.message) {
    message = data.message;
  }

  return { ok: false, message };
}
