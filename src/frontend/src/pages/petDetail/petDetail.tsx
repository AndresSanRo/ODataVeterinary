import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { petApi } from "../../api";
import { ODataResponse, Owner, Pet } from "../../models";
import { useOData } from "../home/useOData";

const PetDetail: React.FC = () => {
  let { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<Pet>();
  const { oDataQuery } = useOData({
    filter: [`id eq ${petId}`],
    expand: ["owners"],
  });

  useEffect(() => {
    const getPets = async () => {
      const pets: ODataResponse<Pet> = await petApi.getPets(oDataQuery);
      if (pets && pets.items.length > 0) {
        setPet(pets.items[0]);
      }
    };
    getPets();
  }, [oDataQuery]);

  return (
    <>
      <h1>Name: {pet && pet?.name}</h1>
      <h1>Age: {pet && pet?.age}</h1>
      <h1>Species: {pet && pet?.species}</h1>
      <br />
      {pet && pet.owners && pet.owners?.length > 0 && (
        <>
          <h1>Owner/s:</h1>
          <hr />
          {pet.owners.map((owner: Owner) => {
            return (
              <>
                <h1>
                  Owner's name: {owner.name} {owner.lastName}
                </h1>
                <h1>Owner's location: {owner.location}</h1>
                <h1>Owner's phone number: {owner.phoneNumber}</h1>
                <hr />
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default PetDetail;
