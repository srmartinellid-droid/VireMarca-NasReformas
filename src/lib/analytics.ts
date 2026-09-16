/**
 * Central analytics layer — never call tracking APIs directly from components.
 * Events are typed and can be routed to GA, Plausible, or console in development.
 */

type AnalyticsEvent =
  | { name: "whatsapp_click"; props?: { location?: string; service?: string } }
  | { name: "phone_click"; props?: { location?: string } }
  | { name: "lead_started"; props?: { source?: string } }
  | { name: "lead_submitted"; props?: { source?: string; service?: string } }
  | { name: "portfolio_opened"; props?: { projectId?: string | number; slug?: string } }
  | { name: "service_viewed"; props?: { service?: string } }
  | { name: "cta_clicked"; props?: { location?: string; label?: string } };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event.name, event.props ?? {});
  }

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", event.name, event.props ?? {});
  }

  // Plausible
  if (typeof window.plausible === "function") {
    window.plausible(event.name, { props: event.props as Record<string, string> });
  }
}
