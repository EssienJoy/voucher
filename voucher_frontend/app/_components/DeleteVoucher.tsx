"use client";

import { deleteVoucher } from "@/app/_lib/api/action";

const DeleteVoucher = ({ id }: { id: string | undefined }) => {
	return (
		<button
			onClick={async () => await deleteVoucher(id)}
			className='flex-1 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50'>
			Delete
		</button>
	);
};

export default DeleteVoucher;
