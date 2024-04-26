import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice/index.js';
import HistoryGraphic from './src/components/HistoryGraphic/index.js';
import QuotationList from './src/components/QuotationList/index.js';
import QuotationItem from './src/components/QuotationList/QuotationItem/index.js';

// OBS: A API INFELIZMENTE NAO ESTÁ MAIS NO AR, OS DADOS SERAO SIMULADOS.

// Tratativa de Zero a esquerda para se adequar ao padrao da API
function addZero(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}

function url(qtdDays) {

  const date = new Date();
  const listLastDays = qtdDays;

  const end_date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`; // Corrigido

  //volta alguns dias na data
  date.setDate(date.getDate() - listLastDays);

  const start_date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`; // Corrigido

  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`;

}

// async function getListCoins(url) {

//   let retornoSimulado = {
//     "bpi": [
//       {
//         "date": "2013-09-01",
//         "value": 128.2597,
//       },
//       {
//         "date": "2013-09-01",
//         "value": 129.2597,
//       },
//       {
//         "date": "2013-09-01",
//         "value": 130.2597,
//       },
//       {
//         "date": "2013-09-01",
//         "value": 131.2597,
//       }
//     ],
//     "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
//     "time": {
//       "updated": "Sep 6, 2013 00:03:00 UTC",
//       "updatedISO": "2013-09-06T00:03:00+00:00"
//     }
//   };

//   let response = await fetch(url);
//   let returnApi = await response.json();

//   let selectListQuotations = retornoSimulado.bpi;

//   console.log(selectListQuotations);

//   const queryCoinsList = selectListQuotations.map((item) => {
//     return item.value;
//   });

//   let data = queryCoinsList.reverse();
//   return (data);

// }
let retornoSimulado = {
  "bpi": [
    {
      "date": "2013-09-01",
      "value": 128.2597,
    },
    {
      "date": "2013-09-02",
      "value": 129.2597,
    },
    {
      "date": "2013-09-03",
      "value": 130.2597,
    },
    {
      "date": "2013-09-04",
      "value": 131.2597,
    },
    {
      "date": "2013-09-04",
      "value": 132.2597,
    },
    {
      "date": "2013-09-04",
      "value": 133.2597,
    },
    {
      "date": "2013-09-04",
      "value": 134.2597,
    }
  ],
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
  "time": {
    "updated": "Sep 6, 2013 00:03:00 UTC",
    "updatedISO": "2013-09-06T00:03:00+00:00"
  }
};


async function getListCoins(url) {


  // Obtenha a lista de valores
  let selectListQuotations = retornoSimulado.bpi;

  // Mapeie a lista para o formato desejado
  const queryCoinsList = selectListQuotations.map((item) => {
    return { data: item.date, valor: item.value }; // Crie um objeto com chaves 'data' e 'valor'
  });

  let data = queryCoinsList.reverse();
  return data;
}

async function getPriceCoinsGraphic(url, retornoSimulado) {
  let responseG = await fetch(url);
  let returnApiG = await responseG.json();
  let selectListQuotationsG = retornoSimulado.bpi;

  // Mapeie os valores do objeto para um array
  const queryCoinsList = selectListQuotationsG.map((item) => {
    return item.value;
  });

  // Retorne o array com os valores
  return queryCoinsList;
}

export default function App() {

  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphiList, setCoinsGraphiList] = useState([0]);
  const [days, setDays] = useState(30);
  const [updateData, setUpdateData] = useState(true);

  function updateDay(number) {
    setDays(number);
    setUpdateData(true);
  }

  useEffect(() => {
    getListCoins(url(days)).then((data) => {
      setCoinsList(data);
    });

    getPriceCoinsGraphic(url(days), retornoSimulado).then((dataG) => {
      setCoinsGraphiList(dataG);
    });

    if (updateData) {
      setUpdateData(false);
    }

  }, [updateData]);



  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#f50d41"
        barStyle="light-content"
      />

      <CurrentPrice />
      <HistoryGraphic infoDataGraphic={coinsGraphiList}/>
      <QuotationList daysQuery={updateDay} listTransactions={coinsList} />
      <QuotationItem />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 40 : 0
  },
});