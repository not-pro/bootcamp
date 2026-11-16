import type { ReactNode } from "react";

/** Параметры управляемого модального окна. */
export type DialogProps = {
  /** Отключает содержимое и кнопку закрытия; Escape остаётся доступен. По умолчанию false. */
  disabled?: boolean;
  /** Видимый заголовок h2 и доступное имя диалога. */
  title: string;
  /** Управляемая видимость: true вызывает showModal(), false — close(). */
  open: boolean;
  /** Нативное событие закрытия, включая Escape и кнопку ×; установите open=false. */
  onClose: () => void;
  /** Произвольное содержимое под заголовком. */
  children: ReactNode;
};
