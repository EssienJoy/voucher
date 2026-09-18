"use client";
import { useState, useTransition } from "react";
import { regenerateApiKey } from "@/features/setting/lib/data-service";
import { Copy, KeyRound, RefreshCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components";

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
		<div className='rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm'>
			<div className='flex items-center gap-4'>
				<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/60 text-primary'>
					<KeyRound size={22} />
				</span>

				<div>
					<h2 className='text-lg font-bold text-text-primary'>API key</h2>

					<p className='mt-0.5 text-xs text-text-secondary'>
						Server-to-server access for your own checkout.
					</p>
				</div>
			</div>

			<p className='mt-4 text-sm leading-relaxed text-text-secondary'>
				Use this key to call our public API and redeem vouchers directly from
				your own website. Never put this key in browser-side code.
			</p>

			{newKey ? (
				<div className='mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4'>
					<p className='flex items-center gap-2 text-xs font-semibold text-amber-800'>
						<TriangleAlert size={14} />
						Save this key now — it will not be shown again.
					</p>

					<code className='mt-3 block break-all rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-xs text-text-primary'>
						{newKey}
					</code>

					<button
						type='button'
						onClick={handleCopy}
						className='mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline'>
						{copied ? "Copied!" : "Copy to clipboard"}
						<Copy size={14} />
					</button>
				</div>
			) : (
				<div className='mt-5 flex items-center gap-3 rounded-xl bg-secondary/30 px-4 py-3'>
					<span className='text-sm text-text-secondary'>Current key:</span>
					{apiKeyPrefix ? (
						<code className='font-mono text-sm font-semibold text-primary'>
							{apiKeyPrefix}••••••••
						</code>
					) : (
						<span className='text-sm text-text-secondary'>
							No API key generated yet.
						</span>
					)}
				</div>
			)}

			<div className='mt-5 flex items-center justify-end border-t border-black/5 pt-5'>
				<Button
					type='button'
					primary
					disabled={isPending}
					onClick={handleGenerate}
					className='flex items-center gap-2'>
					<RefreshCcw size={16} />
					{isPending
						? "Generating..."
						: apiKeyPrefix
							? "Regenerate key"
							: "Generate key"}
				</Button>
			</div>

			{error && (
				<p className='mt-3 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-700'>
					<TriangleAlert size={14} />
					{error}
				</p>
			)}
		</div>
	);
};

export default ApiKeySection;
