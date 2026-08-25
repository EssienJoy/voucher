import React from "react";

type InputProps = {
	label: string;
	type: string;
	name: string;
	min?: string;
	maxLength?: number;
	minLength?: number;
	placeHolder?: string;
	text?: string;
	optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
	optional,
	label,
	type,
	name,
	min,
	maxLength,
	minLength,
	placeHolder,
	text,
	...props
}: InputProps) => {
	return (
		<div className='space-y-2'>
			<label htmlFor={name} className='text-sm font-semibold'>
				{label}
			</label>

			<input
				{...props}
				id={name}
				name={name}
				type={type}
				maxLength={maxLength}
				minLength={minLength}
				placeholder={placeHolder}
				min={min}
				className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
			/>
			{optional && <p className='font-bold text-green-600'>optional</p>}
			<p>{text}</p>
		</div>
	);
};

export default Input;
