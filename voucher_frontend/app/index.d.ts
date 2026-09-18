declare type Business = {
	business_name: string | null;
	email: string;
	id: string | null;
	createdAt: string;
	apiKeyPrefix: string | null;
};

declare type initialState = {
	error: string | null;
	success: string | null;
};

declare interface baseVoucher {
	code: string;
	title: string;
	description: string | null;
	discount_type: "percentage" | "fixed";
	discount_value: number;
	usage_limit: number | null;
	min_purchase: number | null;
	max_discount: number | null;
	expiry_date: string;
}

declare interface voucher extends baseVoucher {
	id: string;
	business_id: string;
	createdAt: string;
	redemption_count: number;
	status: "active" | "redeemed" | "exhausted" | "expired";
}

declare type VoucherInsert = baseVoucher & {
	business_id: string;
	created_at: string;
	status?: "active" | "redeemed" | "exhausted" | "expired";
};

declare type VoucherUpdate = Partial<baseVoucher>;

declare type VoucherResult = initialState & {
	data: voucher | null;
};

declare type RedeemResult = initialState & {
	voucher: voucher | null;
};

declare type ApiKeyResult = initialState & {
	apiKey: string | null;
	apiKeyPrefix: string | null;
};
