import { formatDistance } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import i18next from "i18next";

export function timeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const currentLocale = i18next.language;

    return formatDistance(date, new Date(), {
      addSuffix: true,
      locale: currentLocale === "vi" ? vi : enUS,
    });
  } catch (error) {
    return "Unknown time";
  }
}
