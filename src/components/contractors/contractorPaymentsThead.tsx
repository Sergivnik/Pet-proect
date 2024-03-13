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
        let dateStr: string = getDateStr(elem.date);
        obj.dateList.push({ id: index, value: dateStr, checked: true });
        index++;
      }
      if (!uniqueArrContractor.includes(elem.idContractor)) {
        uniqueArrContractor.push(elem.idContractor);
        let contractor: Contractor = contractorsList.find(
          (contractor: Contractor) => contractor._id == elem.idContractor
        );
        obj.contractorList.push({
          id: contractor ? contractor._id : 0,
          value: contractor ? contractor.value : "",
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
  const filterDataPayment = (filterData: FilterData) => {
    const filteredList = contractorsPayments.filter((payment) => {
      const dateObject = new Date(payment.date);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      const dateFilters = filterData.dateList
        .filter((filter) => filter.checked)
        .map((filter) => filter.value);
      if (!dateFilters.includes(formattedDate)) {
        return false;
      }

      const contractorId = payment.idContractor;
      const contractorFilters = filterData.contractorList
        .filter((filter) => filter.checked)
        .map((filter) => filter.id);
      if (contractorId != null && !contractorFilters.includes(contractorId)) {
        return false;
      }

      const sum = payment.sum;
      const sumFilters = filterData.sumList
        .filter((filter) => filter.checked)
        .map((filter) => filter.value);
      if (!sumFilters.includes(sum.toString())) {
        return false;
      }

      const category = payment.category;
      const categoryFilters = filterData.categoryList
        .filter((filter) => filter.checked)
        .map((filter) => filter.id);
      if (!categoryFilters.includes(Number(category))) {
        return false;
      }

      const addInfo = payment.addInfo;
      const addInfoFilters = filterData.addInfoList
        .filter((filter) => filter.checked)
        .map((filter) => filter.value);
      if (!addInfoFilters.includes(addInfo)) {
        return false;
      }

      return true;
    });
    return filteredList;
  };

  const getFilteredList = (name: string, list: ElemFilter[]) => {
    let obj = cloneFilter(filterData);
    obj[name] = list;
    setFilterData(obj);
    props.getFiltredList(filterDataPayment(obj));
  };
  const cloneFilter = (objFilter: FilterData) => {
    const newObjFilter: FilterData = {
      dateList: objFilter.dateList.map((obj) => ({ ...obj })),
      contractorList: objFilter.contractorList.map((obj) => ({ ...obj })),
      sumList: objFilter.sumList.map((obj) => ({ ...obj })),
      categoryList: objFilter.categoryList.map((obj) => ({ ...obj })),
      addInfoList: objFilter.addInfoList.map((obj) => ({ ...obj })),
    };
    return newObjFilter;
  };
  const handlePushFilter = (name: string) => {
    let obj: FilterData = cloneFilter(filterData);
    obj[name].forEach((elem) => (elem.checked = true));
    let filteredList = filterDataPayment(obj);
    let uniqueArrDate: Date[] = [];
    let uniqueArrContractor: number[] = [];
    let uniqueArrSum: number[] = [];
    let uniqueArrCategory: number[] = [];
    let uniqueArrAddInfo: string[] = [];
    let index: number = 0;
    let newObj: FilterData = {
      dateList: [],
      contractorList: [],
      sumList: [],
      categoryList: [],
      addInfoList: [],
    };
    filteredList.forEach((elem: ContractorPayment) => {
      if (!uniqueArrDate.includes(elem.date)) {
        uniqueArrDate.push(elem.date);
        let dateStr: string = getDateStr(elem.date);
        let checked: boolean = filterData.dateList.find(
          (date: ElemFilter) => (date.value = dateStr)
        ).checked;
        newObj.dateList.push({ id: index, value: dateStr, checked: checked });
        index++;
      }
      if (!uniqueArrContractor.includes(elem.idContractor)) {
        uniqueArrContractor.push(elem.idContractor);
        let contractorFilter: ElemFilter;
        contractorFilter = filterData.contractorList.find(
          (filterElem: ElemFilter) =>
            elem.idContractor
              ? filterElem.id == elem.idContractor
              : filterElem.id == 0
        );
        newObj.contractorList.push(contractorFilter);
      }
      if (!uniqueArrSum.includes(elem.sum)) {
        uniqueArrSum.push(elem.sum);
      }
      newObj.categoryList = filterData.categoryList;
      if (!uniqueArrAddInfo.includes(elem.addInfo)) {
        uniqueArrAddInfo.push(elem.addInfo);
      }
    });
    let arr: number[] = uniqueArrSum.sort((a, b) => {
      if (Number(a) < Number(b)) return -1;
      if (Number(a) == Number(b)) return 0;
      if (Number(a) > Number(b)) return 1;
    });
    arr.forEach((sum) => {
      let sumFilter: ElemFilter = filterData.sumList.find(
        (filterElem: ElemFilter) => filterElem.value == sum.toString()
      );
      newObj.sumList.push(sumFilter);
    });
    uniqueArrAddInfo = uniqueArrAddInfo.sort();
    uniqueArrAddInfo.forEach((category) => {
      let addInfoFilter: ElemFilter = filterData.addInfoList.find(
        (filterElem: ElemFilter) => filterElem.value == category
      );
      newObj.addInfoList.push(addInfoFilter);
    });
    setFilterData(newObj);
  };
  const getDateStr = (dateTime: Date) => {
    let date: Date = new Date(dateTime);
    let dateStr: string = `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    return dateStr;
  };
  return (
    <React.Fragment>
      <thead className="contrPayMainHeader">
        <tr className="contrPayMainHeaderTr">
          <FilterDateListTd
            name="dateList"
            title="Дата"
            listId={filterData.dateList}
            getFilteredList={getFilteredList}
            handlePushFilter={handlePushFilter}
          />
          <FilterTdList
            name="contractorList"
            title="Контрагент"
            listId={filterData.contractorList}
            getFilteredList={getFilteredList}
            handlePushFilter={handlePushFilter}
          />
          <FilterTdList
            name="sumList"
            title="Сумма"
            listId={filterData.sumList}
            getFilteredList={getFilteredList}
            handlePushFilter={handlePushFilter}
          />
          <FilterTdList
            name="categoryList"
            title="Категория"
            listId={filterData.categoryList}
            getFilteredList={getFilteredList}
            handlePushFilter={handlePushFilter}
          />
          <FilterTdList
            name="addInfoList"
            title="Примечание"
            listId={filterData.addInfoList}
            getFilteredList={getFilteredList}
            handlePushFilter={handlePushFilter}
          />
        </tr>
      </thead>
    </React.Fragment>
  );
};
