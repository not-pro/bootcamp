import { STORE } from "./store";

export default function setupBaseUrl(baseUrl: string): string {
  return STORE.setBaseUrl(baseUrl);
}
