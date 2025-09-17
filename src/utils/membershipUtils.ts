/**
 * Calcula los años de membresía en la app basado en la fecha de registro
 * @param memberSince - Fecha de registro del freelancer
 * @returns Número de años de membresía (mínimo 1)
 */
export const calculateMembershipYears = (memberSince?: string): number => {
  if (!memberSince) return 1;

  const memberDate = new Date(memberSince);
  const currentDate = new Date();
  
  // Calcular la diferencia en años de forma más precisa
  let years = currentDate.getFullYear() - memberDate.getFullYear();
  
  // Ajustar si aún no ha pasado el aniversario este año
  const monthDiff = currentDate.getMonth() - memberDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < memberDate.getDate())) {
    years--;
  }

  return Math.max(1, years);
};

/**
 * Formatea los años de membresía para mostrar en la UI
 * @param memberSince - Fecha de registro del freelancer
 * @param suffix - Sufijo a agregar (ej: "yrs. member", "años miembro")
 * @returns String formateado para mostrar
 */
export const formatMembershipYears = (
  memberSince?: string,
  suffix: string = "yrs. member",
): string => {
  const years = calculateMembershipYears(memberSince);
  return `${years}+ ${suffix}`;
};
