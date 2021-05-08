import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { petApi } from '../../api';

const Home: React.FC = () => {
	const [pets, setPets] = useState([]);
	const getPets = async () => {
		const pets: any = await petApi.getPets('$count=true');
		if (pets.items.lenght > 0) {
			setPets(pets);
		}
	};
	return <PrimaryButton text={'get pets'} onClick={getPets} />;
};

export default Home;
