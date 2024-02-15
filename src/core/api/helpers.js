
export const emptyCart = (dispach, items, rmv, callback) => {

  (() => {
    for(let item of items) dispach(rmv(item._id))
  })();
  localStorage.removeItem('cart');
  callback();

}


export function currencyFormatter(value) {
    if (!Number(value)) return "";
  
    const amount = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR"
    }).format(value / 100);
  
    return `${amount}`;
  }