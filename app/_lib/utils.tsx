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

export function getRequiredString(formData: FormData, key: string): string {
	const value = formData.get(key);
	if (typeof value !== "string" || value.trim() === "") {
		throw new Error(`${key} is required`);
	}
	return value.trim();
}

export function getOptionalString(
	formData: FormData,
	key: string,
): string | null {
	const value = formData.get(key);
	if (typeof value !== "string" || value.trim() === "") {
		return null;
	}
	return value.trim();
}

export function getRequiredNumber(formData: FormData, key: string): number {
	const value = formData.get(key);
	if (typeof value !== "string" || value.trim() === "") {
		throw new Error(`${key} is required`);
	}
	const number = Number(value);
	if (Number.isNaN(number)) {
		throw new Error(`${key} must be a valid number`);
	}
	return number;
}

export function getOptionalNumber(
	formData: FormData,
	key: string,
): number | null {
	const value = formData.get(key);
	if (typeof value !== "string" || value.trim() === "") {
		return null;
	}
	const number = Number(value);
	if (Number.isNaN(number)) {
		throw new Error(`${key} must be a valid number`);
	}
	return number;
}
