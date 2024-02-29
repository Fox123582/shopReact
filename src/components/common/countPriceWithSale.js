export function countPriceWithSale(currentElem){
    if (currentElem.sale){
        let priceWithSale  = currentElem.price - (currentElem.price/100*currentElem.salePercent)
        return Math.round(priceWithSale)
    } else return Math.round(currentElem.price)
}