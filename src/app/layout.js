import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Laces Warmup | Your Entry Pass to Sports Culture",
  description: "Ditch the intimidating stats. The Laces Warmup is your non-judgmental, visual entry pass to sports culture. F1 drama, NBA trash-talk, and slang-free watercooler scripts.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050508] text-[#f3f4f6] font-jakarta">
        {children}
      </body>
    </html>
  );
}
