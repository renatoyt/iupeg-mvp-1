const formatValue = (value: number): string => {
  return `R$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export default formatValue;
