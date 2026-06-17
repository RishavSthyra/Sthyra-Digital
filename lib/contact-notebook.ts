export const OPEN_CONTACT_NOTEBOOK_EVENT = "sthyra:open-contact-notebook";

export function openContactNotebook() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(OPEN_CONTACT_NOTEBOOK_EVENT));
}
