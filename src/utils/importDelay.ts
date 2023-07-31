import { ComponentType } from "react";

export const importDelay =
  (importFn: () => Promise<any>, delayMs = 500) =>
  async () => {
    const [result] = await Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, delayMs)),
    ]);

    return result as { default: ComponentType<any> };
  };
