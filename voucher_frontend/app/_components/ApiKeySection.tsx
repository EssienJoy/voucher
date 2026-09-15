"use client";
import { useState, useTransition } from "react";
import Button from "./Button";
import { regenerateApiKey } from "../_lib/api/action";

const ApiKeySection = ({ apiKeyPrefix }: { apiKeyPrefix: string | null }) => {
	const [isPending, startTransition] = useTransition();
	const [newKey, setNewKey] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const handleGenerate = () => {
		setError(null);
		setCopied(false);
		startTransition(async () => {
			const result = await regenerateApiKey();
			if (result.error) {
				setError(result.error);
				return;
			}
			setNewKey(result.apiKey);
		});
	};

	const handleCopy = async () => {
		if (!newKey) return;
		try {
			await navigator.clipboard.writeText(newKey);
			setCopied(true);
		} catch {}
	};

	return (
		<div className='mt-8 rounded-2xl bg-white p-6 shadow-sm'>
			<h2 className='text-lg font-bold text-text-primary'>API key</h2>
			<p className='mt-1 text-sm text-text-secondary'>
				For a business with its own website: use this key to call our public API
				server-to-server and redeem vouchers directly from your own checkout.
				Never put this key in browser-side code.
			</p>

			{newKey ? (
				<div className='mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4'>
					<p className='text-xs font-semibold text-amber-800'>
						Save this key now — it will not be shown again.
					</p>
					<code className='mt-2 block break-all rounded-lg bg-white px-3 py-2 text-xs'>
						{newKey}
					</code>
					<button
						type='button'
						onClick={handleCopy}
						className='mt-2 text-xs font-semibold text-primary hover:underline'>
						{copied ? "Copied!" : "Copy to clipboard"}
					</button>
				</div>
			) : (
				<p className='mt-4 text-sm'>
					{apiKeyPrefix ? (
						<>
							Current key:{" "}
							<code className='font-semibold'>{apiKeyPrefix}••••••••</code>
						</>
					) : (
						<span className='text-text-secondary'>
							No API key generated yet.
						</span>
					)}
				</p>
			)}

			<Button
				type='button'
				primary
				disabled={isPending}
				onClick={handleGenerate}
				className='mt-4'>
				{isPending
					? "Generating..."
					: apiKeyPrefix
						? "Regenerate key"
						: "Generate key"}
			</Button>

			{error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
		</div>
	);
};

export default ApiKeySection;
