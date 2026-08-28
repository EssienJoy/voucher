import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const getDaysUntilExpiry = (expiryDate: string) => {
	const millisecondsPerDay = 1000 * 60 * 60 * 24;
	return Math.ceil(
		(new Date(expiryDate).getTime() - Date.now()) / millisecondsPerDay,
	);
};

export const capitalize = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};
