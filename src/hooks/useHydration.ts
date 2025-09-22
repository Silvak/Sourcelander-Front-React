import { useEffect, useState } from "react";

/**
 * Hook personalizado para manejar la hidratación del lado del cliente
 * Evita errores de hidratación cuando el estado del servidor difiere del cliente
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
