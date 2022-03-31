import Compound from '@compound-finance/compound-js';
import './App.css';
import calculateApy from './apy';
import React from 'react';

const formatPercent = (number) => {
  return `${ Number(number).toFixed(2)}%`;
}

function App() {
  const [apy, setApy] = React.useState([])
  const [isLoading, setIsloading] = React.useState(false)
  const [isError, setIserror] = React.useState(false)
  React.useEffect(() => {
    
    (async () => {
      setIsloading(true)
      try {
        const apy = await Promise.all([
          calculateApy(Compound.cDAI, 'DAI'),
          calculateApy(Compound.cUSDC, 'USDC'),
          calculateApy(Compound.cUSDT, 'USDT'),
          calculateApy(Compound.cETH, 'ETH'),
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
        setIsloading(false)
      } catch (error) {
         console.error("eRROR==>", error)
         setIsloading(false)
         setIserror(true)
      }
    
    })()
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
                      alt={apy.ticker}
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
         isLoading && <h4>Loading...</h4>
      }
      {
         isError && <h4>Failed to load the data. Refresh to Try again..</h4>
      }
       </div>
    </div>
  );
}

export default App;
