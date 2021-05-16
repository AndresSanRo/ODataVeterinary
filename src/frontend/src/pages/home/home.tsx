import {
  DefaultButton,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
} from "@fluentui/react/lib/components/DetailsList";
import React, { useEffect, useState } from "react";
import { petApi } from "../../api";
import { ODataResponse, Pet } from "../../models";
import { getColumns, petOptions, renderColumn } from "./petTableConsts";
import { useOData, ODataActionTypes } from "./useOData";
import "./home.scss";
import Pagination from "react-js-pagination";
import "../../assets/bootstrap/css/bootstrap.min.css";

const Home: React.FC = () => {
  const [pets, setPets] = useState<ODataResponse<Pet>>();
  const [filterName, setFilterName] = useState<string | undefined>(undefined);
  const [filterAge, setFilterAge] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [filterSpecies, setFilterSpecies] =
    useState<string | undefined>(undefined);
  const { oDataQuery, oDataState, dispatchODataAction } = useOData({
    count: true,
    top: 10,
    skip: 0,
  });

  useEffect(() => {
    const getPets = async () => {
      const pets: ODataResponse<Pet> = await petApi.getPets(oDataQuery);
      if (pets) {
        setPets(pets);
      }
    };
    getPets();
  }, [oDataQuery]);

  const setNameFilter = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    if (newValue !== undefined) {
      setFilterName(newValue);
    }
  };

  const setAgeFilter = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    if (newValue !== undefined) {
      setFilterAge(parseInt(newValue));
    }
  };

  const setSpeciesFilter = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption<any>
  ): void => {
    if (option) {
      setFilterSpecies(option.key as string);
    }
  };

  const applyFilters = (): void => {
    const filters: string[] = [];
    if (filterName !== undefined) {
      filters.push(`name eq '${filterName}'`);
    }
    if (filterAge !== undefined) {
      filters.push(`age eq ${filterAge}`);
    }
    if (filterSpecies !== undefined) {
      filters.push(`species eq '${filterSpecies}'`);
    }
    if (filters.length > 0) {
      dispatchODataAction({
        type: ODataActionTypes.SetOData,
        payload: { filter: filters, orderBy: oDataState.orderBy, skip: 0 },
      });
    }
    setPage(1);
  };

  const clearFilters = (): void => {
    setFilterName(undefined);
    setFilterAge(undefined);
    setFilterSpecies(undefined);
    setPage(1);
    dispatchODataAction({
      type: ODataActionTypes.SetOData,
      payload: { count: true, top: 10, skip: 0, filter: [] },
    });
  };

  const columnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn) => {
    let fieldName: string = "";
    if (column.key.toLowerCase() === "name") {
      fieldName = "name";
    }
    if (column.key.toLowerCase() === "age") {
      fieldName = "age";
    }
    if (column.key.toLowerCase() === "species") {
      fieldName = "species";
    }

    if (
      oDataState.orderBy &&
      oDataState.orderBy.length > 0 &&
      oDataState.orderBy[0].includes("asc")
    ) {
      dispatchODataAction({
        type: ODataActionTypes.SetOData,
        payload: {
          orderBy: [`${fieldName} desc`],
          skip: 0,
          filter: oDataState.filter,
        },
      });
    } else if (
      oDataState.orderBy &&
      oDataState.orderBy.length > 0 &&
      oDataState.orderBy[0].includes("desc")
    ) {
      dispatchODataAction({
        type: ODataActionTypes.SetOData,
        payload: { orderBy: [], skip: 0, filter: oDataState.filter },
      });
    } else {
      dispatchODataAction({
        type: ODataActionTypes.SetOData,
        payload: {
          orderBy: [`${fieldName} asc`],
          skip: 0,
          filter: oDataState.filter,
        },
      });
    }
    setPage(1);
  };

  const onPageChange = (pageNumber: number) => {
    const skip: number = pageNumber > 1 ? (pageNumber - 1) * 10 : 0;
    setPage(pageNumber);
    dispatchODataAction({
      type: ODataActionTypes.SetSkip,
      payload: skip,
    });
  };

  return (
    <>
      <h1>Pets</h1>
      <div className={"filterArea"}>
        <h2>Filters</h2>
        <div className={"filters"}>
          <TextField
            className={"filter"}
            label={"Name"}
            value={filterName}
            onChange={setNameFilter}
          />
          <TextField
            className={"filter"}
            label={"Age"}
            value={filterAge ? filterAge.toString() : undefined}
            onChange={setAgeFilter}
          />
          <Dropdown
            className={"filter"}
            label="Species"
            options={petOptions}
            selectedKey={filterSpecies}
            onChange={setSpeciesFilter}
          />
        </div>
        <PrimaryButton
          className={"applyFilterBtn"}
          text={"Apply filters"}
          onClick={applyFilters}
        />
        <DefaultButton text={"Clear filters"} onClick={clearFilters} />
      </div>
      <DetailsList
        compact={true}
        items={pets?.items ? pets.items : []}
        columns={getColumns(columnClick)}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={renderColumn}
      />
      <div className={"paginationArea"}>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={pets?.count ? pets.count : 0}
          pageRangeDisplayed={5}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

export default Home;
