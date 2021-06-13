export class CommonData {
    public static betSlip: any;
    public static betCalcInfo: any;
    public static setCalcInfo() {
        var betAmount = 0;
        for(var i = 0;i < CommonData.betSlip.betslip.length;i ++)
        {
        if(betAmount == 0)
        {
            betAmount += CommonData.betSlip.betslip[i].price;
        }
        else
        {
            betAmount *= CommonData.betSlip.betslip[i].price;
        }
        }

        CommonData.betCalcInfo.totalBets = CommonData.betSlip.betslip.length;
        CommonData.betCalcInfo.betAmount = betAmount.toFixed(2);
        CommonData.betCalcInfo.fullBet = CommonData.betCalcInfo.fullBet || 0;
        CommonData.betCalcInfo.possibleProfite = (CommonData.betCalcInfo.fullBet * betAmount).toFixed(2);
    }
}