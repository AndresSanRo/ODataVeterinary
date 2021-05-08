import React, { useEffect, useState } from 'react';
import { petApi } from '../../api';
import { ODataResponse, Pet } from '../../models';

const Home: React.FC = () => {
	const [pets, setPets] = useState<Pet[]>([]);
	const getPets = async () => {
		const pets: ODataResponse<Pet> = await petApi.getPets('$count=true');
		if (pets && pets.items.length > 0) {
			setPets(pets.items);
		}
	};
	useEffect(() => {
		getPets();
	}, []);
	return (
		<>
			{pets.map((pet: Pet) => {
				return <p>{pet.name?.toLocaleLowerCase()}</p>;
			})}
		</>
	);
};

export default Home;
