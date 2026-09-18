import { apiFetch } from "@/lib/http";

export async function getBusiness(): Promise<{
	business: Business;
}> {
	const result = await apiFetch("user/me");

	if (result.status === "fail") throw new Error(result.message);

	return {
		business: result.data,
	};
}
