import React from "react";
import { Line, Pie } from "@ant-design/charts";
import './style.css'

const ChartComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });

  const config = {
    data: data, 
    autoFit: false,
    xField: "date",
    yField: "amount",
    point: {
      size: 3,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: 'blue',
      },
    },
    xAxis: {
      label: {
        style: {
          fill: 'green',
        },
      },
      line: {
        style: {
          stroke: 'green', 
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: 'red',
        },
      },
      line: {
        style: {
          stroke: 'red', 
        },
      },
    },
  }

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense" && transaction.tag) {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpending = {};
  spendingData.map((obj) => {
    if (obj && obj.tag) {
      let key = obj.tag;
      if(!finalSpending[key]){
        finalSpending[key] = {tag:obj.tag, amount:obj.amount}
      }else{
        finalSpending[key].amount=obj.amount
      }
    }
  });

  const spendingConfig = {
    data: Object.values(finalSpending).length > 0 ? Object.values(finalSpending) : [{tag: 'No data', amount: 0}],
    angleField: "amount",
    colorField: "tag",
    label: {
      style: {
        fill: 'red',
      },
      formatter: (text, item) => {
        return item.amount ? item.amount : 'No data'; // display 'No data' if amount is undefined
      },
    },
  };

  console.log('spendingConfig:', spendingConfig);
  // eslint-disable-next-line no-unused-vars
  let chart;
  // eslint-disable-next-line no-unused-vars
  let pie;

  return (
    <div className="charts-wrappper">
      <div className="charts-container">
        <div className="chart1">
          <h1> Analytics</h1>
          <Line className="li"
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          />
        </div>
        <div className="chart2">
          <h1> Spendings</h1>
          <Pie className="pi"
            {...spendingConfig}
            onReady={(chartInstance) => (pie = chartInstance)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;