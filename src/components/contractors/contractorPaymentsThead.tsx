import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterDateListTd } from "../myLib/filterTd/filterDateListTd.jsx";
import { FilterTdList } from "../myLib/filterTd/filterTdList.jsx";
import "./contractorForm.sass";

interface ElemFilter {
  id: number;
  value: string;
  checked: boolean;
}
interface FilterData {
  dateList: ElemFilter[];
  contractorList: ElemFilter[];
  sumList: ElemFilter[];
  categoryList: ElemFilter[];
  addInfoList: ElemFilter[];
}
type Category = 1 | 2 | 3;
interface ContractorPayment {
  id: number;
  idContractor: number;
  date: Date;
  sum: number;
  category: Category;
  addInfo: string;
}
interface Contractor {
  _id: number;
  value: string;
  fullName: string;
  TIN: number;
}

export const ContractorPaymentsThead = (props: any) => {
  const contractorsPayments: ContractorPayment[] = useSelector(
    (state: any) => state.oderReducer.contractorsPayments
  );
  const contractorsList: Contractor[] = useSelector(
    (state: any) => state.oderReducer.contractorsList
  );
  const [filterData, setFilterData] = useState<FilterData>({
    dateList: [],
    contractorList: [],
    sumList: [],
    categoryList: [],
    addInfoList: [],
  });
  useEffect(() => {
    let obj: FilterData = { ...filterData };
    let uniqueArrDate: Date[] = [];
    let uniqueArrContractor: number[] = [];
    let uniqueArrSum: number[] = [];
    let uniqueArrCategory: number[] = [];
    let uniqueArrAddInfo: string[] = [];
    let index: number = 0;

    const sortFunction = (a: ElemFilter, b: ElemFilter) => {
      if (a.id == null && b.id != null) return 1;
      if (b.id == null && a.id != null) return -1;
      if (a.value < b.value) return -1;
      if (a.value == b.value) return 0;
      if (a.value > b.value) return 1;
    };
    contractorsPayments.forEach((elem: ContractorPayment) => {
      if (!uniqueArrDate.includes(elem.date)) {
        uniqueArrDate.push(elem.date);
        let date: Date = new Date(elem.date);
        let dateStr: string = `${date.getFullYear()}-${
          date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
        obj.dateList.push({ id: index, value: dateStr, checked: true });
        index++;
      }
      if (
        !uniqueArrContractor.includes(elem.idContractor) &&
        elem.idContractor != null
      ) {
        uniqueArrContractor.push(elem.idContractor);
        let contractor: Contractor = contractorsList.find(
          (contractor: Contractor) => contractor._id == elem.idContractor
        );
        obj.contractorList.push({
          id: contractor._id,
          value: contractor.value,
          checked: true,
        });
      }
      if (!uniqueArrSum.includes(elem.sum)) {
        uniqueArrSum.push(elem.sum);
      }
      if (!uniqueArrAddInfo.includes(elem.addInfo)) {
        uniqueArrAddInfo.push(elem.addInfo);
      }
    });
    let arr: number[] = uniqueArrSum.sort((a, b) => {
      if (Number(a) < Number(b)) return -1;
      if (Number(a) == Number(b)) return 0;
      if (Number(a) > Number(b)) return 1;
    });
    arr.forEach((sum, index) => {
      obj.sumList.push({ id: index, value: sum.toString(), checked: true });
    });
    obj.categoryList = [
      { id: 1, value: "Да", checked: true },
      { id: 2, value: "нет", checked: true },
      { id: 3, value: "прочее", checked: true },
    ];
    obj.contractorList = obj.contractorList.sort(sortFunction);
    uniqueArrAddInfo = uniqueArrAddInfo.sort();
    uniqueArrAddInfo.forEach((text: string, index) => {
      obj.addInfoList.push({ id: index, value: text, checked: true });
    });
    setFilterData(obj);
  }, []);
  const getFilteredList = () => {};
  return (
    <React.Fragment>
      <thead className="contrPayMainHeader">
        <tr className="contrPayMainHeaderTr">
          <FilterDateListTd
            name="dateList"
            title="Дата"
            listId={filterData.dateList}
            getFilteredList={getFilteredList}
          />
          <FilterTdList
            name="contractorList"
            title="Контрагент"
            listId={filterData.contractorList}
            getFilteredList={getFilteredList}
          />
          <FilterTdList
            name="sumList"
            title="Сумма"
            listId={filterData.sumList}
            getFilteredList={getFilteredList}
          />
          <FilterTdList
            name="categoryList"
            title="Категория"
            listId={filterData.categoryList}
            getFilteredList={getFilteredList}
          />
          <FilterTdList
            name="addInfoList"
            title="Примечание"
            listId={filterData.addInfoList}
            getFilteredList={getFilteredList}
          />
        </tr>
      </thead>
    </React.Fragment>
  );
};
