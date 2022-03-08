var tasks = require("../models/tasks.js");
var tasksPayments = require("../models/tasksPayments.js");
var tasksDebt = require("../models/tasksDriverDebts.js");
var taskPaymentsDriver = require("../models/taskPaymentsDriver.js");
var taskContractors = require("../models/taskContractor.js");
var tasksData = require("../models/tasksData.js");
var tacksDocs = require("../models/taskDocs.js");

module.exports.taskGet = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  tasks.list((data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskGetPayments = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  tasksPayments.list((data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskGetDebts = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  tasksDebt.list((data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskGetContractors = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  taskContractors.list((data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

module.exports.taskGetFilter = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.body.body);
  tasks.filter(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskGetPdf = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const path = require("path");
  console.log(req.params);
  tasks.getDataById(req.params.id, "oderslist", (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      let Year = data.date.getFullYear();
      let customer = data.customer[0].value;
      let pathBills = path.join(__dirname, "..", "Bills");
      let accountNumber = Number(data.accountNumber);
      if (isNaN(accountNumber)) {
        accountNumber = data.accountNumber;
      }
      res.sendFile(
        `${pathBills}/${Year}/${customer}/${req.params.typeDoc}${accountNumber}.pdf`
      );
    }
  });
};
module.exports.taskGetPdfWithoutStamp = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const path = require("path");
  tasks.getDataById(req.params.id, "oderslist", (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      let Year = data.date.getFullYear();
      let customer = data.customer[0].value;
      let pathBills = path.join(__dirname, "..", "Bills");
      let accountNumber = Number(data.accountNumber);
      if (isNaN(accountNumber)) {
        accountNumber = data.accountNumber;
      }
      res.sendFile(
        `${pathBills}/${Year}/${customer}/docWithoutStamp${accountNumber}.pdf`
      );
    }
  });
};

module.exports.taskAdd = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.add(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskAddData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasksData.addData(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json(data.error);
    } else {
      res.json(data);
    }
  });
};

module.exports.taskEdit = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.edit(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskEditNew = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.editNew(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskEditData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasksData.editData(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

module.exports.makePaymentCustomer = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.makePaymentCustomer(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.makeDriverDebt = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasksDebt.makeDriverDebt(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskDeleteDebt = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasksDebt.del(req.params.id, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

module.exports.taskDel = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.del(req.params.id, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskDeleteData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasksData.delData(req.params.id, req.body.editTable, (data) => {
    if (data.error) {
      res.status(500);
      res.json(data);
    } else {
      res.json(data);
    }
  });
};

module.exports.editDriverDebt = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasksDebt.edit(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

module.exports.makePaymentDriver = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  taskPaymentsDriver.add(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

module.exports.addDataContractorPayment = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  taskContractors.add(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

module.exports.taskDeletePayments = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasksPayments.taskDeletePayments(req.params.id, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

const pdfTemplate = require("../documents/powerOfAttorney.js");

const pdf = require("html-pdf");
module.exports.taskProxy = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const dataById = {};
  tasks.getDataById(req.params.id, "oderslist", (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      dataById.id = req.params.id;
      dataById.driver = data.driver[0].name;
      dataById.customer = data.customer[0].companyName;
      console.log(data.driver[0].value);
      console.log(data.customer[0].value);
      pdf
        .create(pdfTemplate(dataById), {})
        .toFile(`./API/controlers/result${dataById.id}.pdf`, (err) => {
          if (err) {
            res.send(Promise.reject());
          }
          res.send(Promise.resolve());
          //res.render(pdfTemplate(req.params.id));
        });
    }
  });
};
module.exports.taskAddPdfDoc = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  pdf
    .create(req.body.body, {})
    .toFile(`./API/controlers/Bills/doc${req.params.id}.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
};
module.exports.taskCreateDoc = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const puppeteer = require("puppeteer");
  var fs = require("fs");
  try {
    const exists = fs.existsSync(
      `./API/Bills/${req.body.body.year}/${req.body.body.customer}`
    );
    if (!exists) {
      fs.mkdirSync(
        `./API/Bills/${req.body.body.year}/${req.body.body.customer}`,
        { recursive: true }
      );
    }
  } catch (e) {
    console.log(e);
  }
  fs.writeFileSync(
    `./API/Bills/${req.body.body.year}/${req.body.body.customer}/doc${req.body.body.invoiceNumber}.pdf`,
    "utf8"
  );
  (async () => {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(req.body.body.html);
    await page.pdf({
      path: `./API/Bills/${req.body.body.year}/${req.body.body.customer}/doc${req.body.body.invoiceNumber}.pdf`,
      format: "a4",
    });
    tacksDocs.add(
      req.body.body.arrOrderId,
      req.body.body.invoiceNumber,
      (data) => {
        if (data.error) {
          res.status(500);
          res.json({ message: data.error });
        } else {
          res.json(data);
        }
      }
    );
    await browser.close();
  })();
};
module.exports.taskCreateDocWithoutStamp = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const puppeteer = require("puppeteer");
  var fs = require("fs");
  try {
    const exists = fs.existsSync(
      `./API/Bills/${req.body.body.year}/${req.body.body.customer}`
    );
    if (!exists) {
      fs.mkdirSync(
        `./API/Bills/${req.body.body.year}/${req.body.body.customer}`,
        { recursive: true }
      );
    }
  } catch (e) {
    console.log(e);
  }
  fs.writeFileSync(
    `./API/Bills/${req.body.body.year}/${req.body.body.customer}/docWithoutStamp${req.body.body.invoiceNumber}.pdf`,
    "utf8"
  );
  (async () => {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(req.body.body.html);
    await page.pdf({
      path: `./API/Bills/${req.body.body.year}/${req.body.body.customer}/docWithoutStamp${req.body.body.invoiceNumber}.pdf`,
      format: "a4",
    });

    await browser.close();
  })();
};

module.exports.taskAddConsignmentNote = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  tasks.getDataById(req.params.id, "oderslist", (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      let Year = data.date.getFullYear();
      let customer = data.customer[0].value;
      let accountNumber = Number(data.accountNumber);
      let fs = require("fs");
      fs.copyFile(
        `./API/Bills/tempDoc.pdf`,
        `./API/Bills/${Year}/${customer}/ttn${accountNumber}.pdf`,
        (err) => {
          if (err) throw err; // не удалось скопировать файл
          console.log("Файл успешно скопирован");
        }
      );

      // const merge = require("easy-pdf-merge");
      // merge(
      //   [
      //     `./API/Bills/${Year}/${customer}/doc${accountNumber}.pdf`,
      //     `./API/Bills/tempDoc.pdf`,
      //   ],
      //   `./API/Bills/${Year}/${customer}/doc${accountNumber}.pdf`,
      //   function (err) {
      //     if (err) {
      //       return console.log(err);
      //     }
      //     console.log("Successfully merged!");
      //   }
      // );
    }
  });
};
module.exports.taskSendEmail = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const configEmail = require("../models/configEmail.js");
  tasks.getDataById(req.params.id, "oderslist", (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      let Year = data.date.getFullYear();
      let customer = data.customer[0].value;
      let email = "sergivnik@mail.ru";
      if (data.customer[0].email != "" && data.customer[0].email != null) {
        email = email + ", " + data.customer[0].email;
      }
      if (data.manager != undefined) {
        if (data.manager[0].email != "" && data.manager[0].email != null) {
          email = email + ", " + data.manager[0].email;
        }
      }
      let accountNumber = Number(data.accountNumber);
      let driver = data.driver[0].shortName;
      const nodemailer = require("nodemailer");
      let subject = "";
      if (email == "sergivnik@mail.ru") {
        subject = `Счет ${accountNumber} заказчику ${data.customer[0].companyName} не отправлен`;
      } else {
        subject = `Счет ${accountNumber} от ${data.date.toLocaleDateString()} за перевозку водитель ${driver} заказчик ${
          data.customer[0].companyName
        }`;
      }
      console.log(email);
      async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(configEmail);

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"ИП Иванов Сергей" <sergivnik@mail.ru>', // sender address
          to: email, // list of receivers
          subject: subject, // Subject line

          html: "<b>ИП Иванов С.Н. тел. +7-991-366-13-66</b>", // html body
          attachments: [
            {
              path: `./API/Bills/${Year}/${customer}/doc${accountNumber}.pdf`,
            },
            {
              path: `./API/Bills/${Year}/${customer}/ttn${accountNumber}.pdf`,
            },
          ],
        });
      }

      main()
        .then(() => {
          tasks.edit(
            {
              field: "customerPayment",
              newValue: 3,
              id: Number(req.params.id),
            },
            (data) => {
              if (data.error) {
                res.status(500);
                res.json({ message: data.error });
              } else {
                console.log("Ok");
                res.json(data);
              }
            }
          );
        })
        .catch(console.error);
    }
  });
};

// module.exports.taskAddActToDoc = (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
//   res.set("Access-Control-Allow-Headers", "Content-Type");
//   const puppeteer = require("puppeteer");

//   (async () => {
//     const browser = await puppeteer.launch({
//       args: ["--no-sandbox"],
//     });
//     const page = await browser.newPage();
//     await page.setContent(req.body.body.html);
//     await page.pdf({
//       path: `./API/Bills/tempDoc.pdf`,
//       format: "a4",
//     });

//     await browser.close();
//     const merge = require("easy-pdf-merge");
//     merge(
//       [
//         `./API/Bills/${req.body.body.year}/${req.body.body.customer}/doc${req.body.body.invoiceNumber}.pdf`,
//         `./API/Bills/tempDoc.pdf`,
//       ],
//       `./API/Bills/${req.body.body.year}/${req.body.body.customer}/doc${req.body.body.invoiceNumber}.pdf`,
//       function (err) {
//         if (err) {
//           return console.log(err);
//         }
//         console.log("Successfully merged!");
//         tacksDocs.add(
//           req.body.body.arrOrderId,
//           req.body.body.invoiceNumber,
//           (data) => {
//             if (data.error) {
//               res.status(500);
//               res.json({ message: data.error });
//             } else {
//               res.json(data);
//             }
//           }
//         );
//       }
//     );
//   })();
// };
