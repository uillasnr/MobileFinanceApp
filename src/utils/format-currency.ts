export function formatCurrency(value: number) {
  const isNegative = value < 0; 
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Math.abs(value) / 100); 

  return isNegative ? `- R$ ${formattedValue.replace("R$", "").trim()}` : formattedValue;
}
