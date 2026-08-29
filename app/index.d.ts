declare type initialState = {
	error: string | null;
	// voucher: voucher | null;
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
	status: "active" | "exhausted" | "expired";
}

declare type VoucherInsert = baseVoucher & {
	business_id: string;
	created_at: string;
	status?: "active" | "exhausted" | "expired";
};

declare type VoucherUpdate = Partial<baseVoucher>;
