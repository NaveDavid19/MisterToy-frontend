import { AvgPriceChart } from "../cmps/AvgPriceChart";
import { ToysInStockByLables } from "../cmps/ToysInStockByLabels";



export function Dashboard() {

    return (
        <div>
            <AvgPriceChart />
            <ToysInStockByLables />
        </div>
    )

}
