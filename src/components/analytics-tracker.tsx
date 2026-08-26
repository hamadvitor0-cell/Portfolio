"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  isAnalyticsEventName,
  trackEvent,
  trackPageView,
  type AnalyticsMetadata,
} from "@/lib/analytics";

function metadataFromElement(element: HTMLElement): AnalyticsMetadata {
  return {
    ...(element.dataset.analyticsLabel ? { label: element.dataset.analyticsLabel } : {}),
    ...(element.dataset.analyticsProject ? { project: element.dataset.analyticsProject } : {}),
    ...(element.dataset.analyticsLocation ? { location: element.dataset.analyticsLocation } : {}),
  };
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || trackedPath.current === pathname) return;
    trackedPath.current = pathname;

    void trackPageView();

    if (pathname.startsWith("/cases/")) {
      void trackEvent("case_view", { case: pathname.slice("/cases/".length) });
    }
  }, [pathname]);

  useEffect(() => {
    const startedForms = new Set<string>();

    function trackFormStart(target: EventTarget | null) {
      if (!(target instanceof Element)) return;

      const form = target.closest<HTMLElement>("[data-analytics-form]");
      const formId = form?.dataset.analyticsForm;

      if (!form || !formId || startedForms.has(formId)) return;
      startedForms.add(formId);

      void trackEvent("form_start", metadataFromElement(form));
    }

    function handleTrackedClick(event: MouseEvent) {
      trackFormStart(event.target);
      if (!(event.target instanceof Element)) return;

      const trackedElement = event.target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = trackedElement?.dataset.analyticsEvent;

      if (!trackedElement || !eventName || !isAnalyticsEventName(eventName)) return;

      void trackEvent(eventName, metadataFromElement(trackedElement));
    }

    function handleFormInteraction(event: Event) {
      trackFormStart(event.target);
    }

    document.addEventListener("click", handleTrackedClick);
    document.addEventListener("focusin", handleFormInteraction);
    document.addEventListener("input", handleFormInteraction);

    return () => {
      document.removeEventListener("click", handleTrackedClick);
      document.removeEventListener("focusin", handleFormInteraction);
      document.removeEventListener("input", handleFormInteraction);
    };
  }, []);

  return null;
}
