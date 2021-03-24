module.exports = (dataById) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const todayAddTen = new Date();
  todayAddTen.setDate(todayAddTen.getDate() + 10);
  const yearAddTen = todayAddTen.getFullYear();
  const monthAddTen = todayAddTen.getMonth() + 1;
  const dayAddTen = todayAddTen.getDate();
  return `
    <!doctype html>
    <html>
        <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
            .header {text-align: center;}
            .stamp {
              position: absolute;
              left: 300px;
              top: 200px;
              opacity: 0.7;
              z-index: -2;
            }
            .sign {
              position: absolute;
              left: 320px;
              top: 180px;
              z-index: -1;
            }
          </style>
        </head>
    <body>
        <h2 class="header"> Доверенность № ${dataById.id} от ${day}.${month}.${year} г.Таганрог</h2>
        <p>ИП Иванов Сергей Николаевич доверяет ${dataById.driver} совершать
        все необходимые действия, связанные с транспортно-экспедиционным 
        обслуживанием грузов, а именно: получать от ${dataById.customer} груз, 
        сопроводительные документы, оформлять накладные на груз, доставлять груз
        и сопроводительные документы получателю, получать денежные средства
        за услуги по транспортировке.</p>
        <br>
        <br>
        <p>Срок действия доверенности по ${dayAddTen}.${monthAddTen}.${yearAddTen}</p>
        <p>Индивидуальный предпрениматель _____________________________Иванов С.Н.</p>


        <img class="stamp" height="150" width="150" src="http://localhost:3000/img/stamp.png">
        <img class="sign" height="120" width="120" src="http://localhost:3000/img/sign.png">
    </body>`;
};
