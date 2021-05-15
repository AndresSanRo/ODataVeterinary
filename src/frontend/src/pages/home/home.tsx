import {
  DetailsList,
  DetailsListLayoutMode,
} from "@fluentui/react/lib/components/DetailsList";
import React, { useEffect, useState } from "react";
import { petApi } from "../../api";
import { ODataResponse, Pet } from "../../models";
import { columns, renderColumn } from "./petTableConsts";
import { useOData, ODataActionTypes } from "./useOData";

const Home: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const { oDataQuery, oDataState, dispatchODataAction } = useOData({
    count: true,
    //select: ["name", "age", "species", "id"],
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

  return (
    <>
      <h1>Pets</h1>
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
