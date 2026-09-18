"use server";

import { apiFetch } from "@/lib/http";
import { revalidatePath } from "next/cache";

export async function regenerateApiKey(): Promise<ApiKeyResult> {
	const result = await apiFetch("user/me/api-key", { method: "POST" });

	if (result.status === "fail" || result.status === "error") {
		return {
			error: result.message,
			success: null,
			apiKey: null,
			apiKeyPrefix: null,
		};
	}

	revalidatePath("/profile");
	return {
		error: null,
		success: result.message,
		apiKey: result.data.apiKey,
		apiKeyPrefix: result.data.apiKeyPrefix,
	};
}