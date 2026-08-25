"use client";

import { deleteVoucher } from "@/app/_lib/api/action";

const DeleteVoucher = ({ id }: { id: number | undefined }) => {
	return (
		<button
			onClick={async () => await deleteVoucher(id)}
			className='flex-1 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50'>
			Delete
		</button>
	);
};

export default DeleteVoucher;
