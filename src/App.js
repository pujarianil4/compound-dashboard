import logo from './logo.svg';
import Compound from '@compound-finance/compound-js';
import './App.css';
import calculateApy from './apy';
import React from 'react';

const formatPercent = number =>
`${new Number(number).toFixed(2)}%` 

function App() {
  const [apy, setApy] = React.useState([])
 
  React.useEffect(() => {
    (async () => {
     const apy = await Promise.all([
      calculateApy(Compound.cDAI, 'DAI'),
      calculateApy(Compound.cUSDC, 'USDC'),
      calculateApy(Compound.cUSDT, 'USDT'),
    ])
    console.log(apy);
    setApy(apy)
    })()
  })
  return (
    <div className="App">
       <h1>Compound Dashboard</h1>
       <div>
       <table className='table'>
        <thead>
          <tr> 
            <th>Ticker</th>
            <th>Supply APY</th>
            <th>COMP APY</th>
            <th>Total APY</th>
          </tr>
        </thead>
        <tbody>
         
            <tr >
              <td>
                <img 
                  src={`img/dai.png`}
                  style={{width: 25, height:25, marginRight: 10}}
                />
                test
              </td>
              <td>tesr</td>
              <td>test</td>
              <td>test</td>
            </tr>
        </tbody>
      </table>
       </div>
    </div>
  );
}

export default App;
