import { AuthProvider } from "@/context/authProvider";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import Notify from "./components/Notify";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Online Ticket Booking | Token Booking`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Dont take wait for your Trun in Crowed Line ",

  applicationName: SITE_NAME,

  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}

          <Notify />
        </AuthProvider>
      </body>
    </html>
  );
}