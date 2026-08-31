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
	id: number;
	business_id: string;
	created_at: string;
	redemption_count: number;
	status: "active" | "redeemed" | "expired";
}

declare type VoucherInsert = baseVoucher & {
	business_id: string;
	created_at: string;
	status?: "active" | "exhausted" | "expired";
};

declare type VoucherUpdate = Partial<baseVoucher>;

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
