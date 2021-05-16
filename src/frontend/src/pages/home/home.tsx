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
} from "@fluentui/react/lib/components/DetailsList";
import React, { useEffect, useState } from "react";
import { petApi } from "../../api";
import { ODataResponse, Pet } from "../../models";
import { columns, petOptions, renderColumn } from "./petTableConsts";
import { useOData, ODataActionTypes } from "./useOData";
import "./home.scss";

const Home: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filterName, setFilterName] = useState<string | undefined>(undefined);
  const [filterAge, setFilterAge] = useState<number | undefined>(undefined);
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
      if (pets && pets.items.length > 0) {
        setPets(pets.items);
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
        type: ODataActionTypes.SetFilter,
        payload: filters,
      });
    }
  };

  const clearFilters = (): void => {
    setFilterName(undefined);
    setFilterAge(undefined);
    setFilterSpecies(undefined);
    dispatchODataAction({
      type: ODataActionTypes.SetOData,
      payload: { count: true, top: 10, skip: 0, filter: [] },
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
        items={pets}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={renderColumn}
      />
    </>
  );
};

export default Home;
