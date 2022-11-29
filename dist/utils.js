const fundInfoHandler = fundInfo => {
  const increasing = '\uD83D\uDCC8';
  const decreasing = '\uD83D\uDCC9';
  let portfolio = '';
  fundInfo.portfolio.map(portfolioItem => {
    portfolio += `
<b>${portfolioItem.name}:</b>
Баланс - ${portfolioItem.quantity} монет
Цена сейчас - ${portfolioItem.price}$
Профит: ${Number(portfolioItem.profitPercentage) < 0 ? decreasing : increasing} ${Math.abs(Number(portfolioItem.profitPercentage))}% ${portfolioItem.profit}$
Монет на балансе: ${Number(portfolioItem.totalPrice).toFixed(2)}\uD83D\uDCB5 
        \n`;
  });
  return `
        ------Фонд бб\uD83D\uDCBC------ 
Было закинуто - ${Number(fundInfo.initialBalance).toFixed(2)}\uD83D\uDCB5 
Текущий баланс - ${Number(fundInfo.currentBalance).toFixed(2)}$
Профит: ${fundInfo.totalProfitPercentage}${Number(fundInfo.totalProfitPercentage) < 0 ? decreasing : increasing} ${fundInfo.totalProfit}$
24h: ${fundInfo.dailyChangePercentage}% ${fundInfo.dailyChangeBalance}$
${portfolio}
    `;
};
module.exports.fundInfoHandler = fundInfoHandler;
//# sourceMappingURL=utils.js.map