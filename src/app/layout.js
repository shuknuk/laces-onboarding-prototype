import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
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
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f9f6f3] text-[#2e2e2e] font-jakarta">
        {children}
      </body>
    </html>
  );
}
