"use server";

import { apiFetch } from "@/lib/http";
import { getRequiredString } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export async function updateBusiness(
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> {
	const business_name = getRequiredString(formData, "business_name");

	const result = await apiFetch("user/me", {
		method: "PATCH",
		body: JSON.stringify({ business_name }),
	});

	if (result.status === "fail" || result.status === "error") {
		return {
			error: result.message,
			success: null,
		};
	}

	revalidatePath("/profile");
	return {
		error: null,
		success: "Profile updated successfully",
	};
}
