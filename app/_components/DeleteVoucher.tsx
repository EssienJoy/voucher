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

// Act as an autonomous coding agent, not just an advisor. Do not explain what I should do — actually perform the file changes yourself in this workspace.

// Task:

// 1. Check if a `.gitignore` file exists in the root of this project. If it does not exist, create one.

// 2. Add the following entries to `.gitignore` (only add entries that aren't already present, do not duplicate):

//    .continue/

//    .continue/.env

//    *.env

//    .env.local

// 3. Confirm afterward that `.continue/.env` (which contains my Groq API key) is now excluded from Git tracking by running `git status` and showing me the output.
