import { ApiKeySection } from "@/app/_components";
import { getBusiness } from "@/app/_lib/api/data-service";
import React from "react";

const SettingsPage = async () => {
	const { business } = await getBusiness();
	return <ApiKeySection apiKeyPrefix={business?.apiKeyPrefix ?? null} />;
};

export default SettingsPage;
