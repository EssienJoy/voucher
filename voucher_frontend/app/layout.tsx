import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s / Voucherly",
		default: "Voucherly | Voucher Management",
	},
	description: "Create, manage, and redeem business vouchers with Voucherly.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang='en'
			data-scroll-behavior='smooth'
			className={`${manrope.variable}  h-full antialiased`}>
			<body className='min-h-full flex flex-col'>{children}</body>
		</html>
	);
}
