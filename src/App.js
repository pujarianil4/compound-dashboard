import logo from './logo.svg';
import Compound, { util } from '@compound-finance/compound-js';
import './App.css';
import calculateApy from './apy';
import React from 'react';

const formatPercent = (number) => {
  console.log("number", number);
  return `${ Number(number).toFixed(2)}%`;
}

function App() {
  const [apy, setApy] = React.useState([])
 
  React.useEffect(() => {
    (async () => {
      try {
        const apy = await Promise.all([
          calculateApy(Compound.cDAI, 'DAI'),
          calculateApy(Compound.cUSDC, 'USDC'),
          calculateApy(Compound.cUSDT, 'USDT'),
         // calculateApy(Compound.cAAVE, 'AAVE'),
           calculateApy(Compound.cBAT, 'BAT'),
          // calculateApy(Compound.cFEI, 'FEI'),
          // calculateApy(Compound.cLINK, 'LINK'),
          // calculateApy(Compound.cMKR, 'MKR'),
           calculateApy(Compound.cREP, 'REP'),
           calculateApy(Compound.cSAI, 'SAI'),
          // calculateApy(Compound.cSUSHI, 'SUSHI'),
          // calculateApy(Compound.cTUSD, 'TUSD'),
           calculateApy(Compound.cUNI, 'UNI'),
          // calculateApy(Compound.cUSDP, 'USDTP'),
        ])
        console.log(apy);
        setApy(apy)
      } catch (error) {
         console.error("eRROR==>", error)
      }
    
    })()
    console.log("compound", util);
  }, [])
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
            {
              apy && apy.map((apy)=> {
                return (
                  <tr key={apy.ticker} >
                  <td>
                    <div className='img_div'>
                    <img 
                      src={`img/${apy.ticker.toLowerCase()}.png`}
                      style={{width: 25, height:25, marginRight: 10}}
                    />
                    <span> {apy.ticker}</span>
                    </div>
                  </td>
                  <td>{formatPercent(apy.supplyApy)}</td>
              <td>{formatPercent(apy.compApy)}</td>
              <td>{formatPercent(parseFloat(apy.supplyApy) + parseFloat(apy.compApy))}</td>
                </tr>
                )
              })
            }
        </tbody>
      </table>
      {
        apy.length == 0 && <h4>Loading...</h4>
      }
       </div>
    </div>
  );
}

export default App;
