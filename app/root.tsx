import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@ant-design/v5-patch-for-react-19";
import type { Route } from "./+types/root";
import "./app.css";
import { ConfigProvider, theme } from "antd";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#008e9b",
    colorBgBase: "#121212",
    colorBgContainer: "#1E1E1E",
    colorTextBase: "#ffffff",
    colorTextSecondary: "#b3b3b3",
    colorBorder: "#2C2C2C",
    colorError: "#CF6679",
  },
};

export default function App() {
  const clientId =
    "1075704836359-8tm0nadclsf68ol1bs27dqnt11b4tar5.apps.googleusercontent.com";

  return (
    <ConfigProvider theme={darkTheme}>
      <GoogleOAuthProvider clientId={clientId}>
        <Outlet />
      </GoogleOAuthProvider>
    </ConfigProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
