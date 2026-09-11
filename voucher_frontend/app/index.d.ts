declare type Business = {
	business_name: string | null;
	email: string;
	id: string | null;
	createdAt: string;
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
	status: "active" | "redeemed" | "expired";
}

declare type VoucherInsert = baseVoucher & {
	business_id: string;
	created_at: string;
	status?: "active" | "exhausted" | "expired";
};

declare type VoucherUpdate = Partial<baseVoucher>;

// Still Supabase-backed (see NOTE on getVoucherByCode/redeemVoucher in
// app/_lib/api/action.ts) — ids stay Postgres numbers, not Mongo ObjectIds.
declare type VoucherResult = initialState & {
	data: {
		code: string;
		status: "expired" | "active";
		expiry_date: string;
		discount_type: string;
		discount_value: number;
		id: number;
		business_id: number;
	} | null;
};

declare type redeemVoucher = {
	code: string;
	status: "expired" | "active";
	expiry_date: string;
	discount_type: string;
	discount_value: number;
	id: number;
	business_id: number;
};

declare type RedeemResult = initialState & {
	data: null;
};
