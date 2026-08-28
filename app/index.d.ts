declare interface voucher {
	created_at: string;
	id?: number;
	business_id?: string;
	code: string;
	title: string;
	description: string | null;
	discount_type: string;
	discount_value: number;
	usage_limit: number;
	min_purchase: number | null;
	max_discount: number | null;
	expiry_date: string;
	status: "active" | "exhausted" | "expired";
}
