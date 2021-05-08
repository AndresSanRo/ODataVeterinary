import {
	DetailsList,
	DetailsListLayoutMode,
	IColumn,
} from '@fluentui/react/lib/components/DetailsList';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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

	const _columns = [
		{
			key: 'Name',
			name: 'Name',
			fieldName: 'name',
			minWidth: 100,
			maxWidth: 200,
			isResizable: true,
		},
		{
			key: 'Age',
			name: 'Age',
			fieldName: 'age',
			minWidth: 100,
			maxWidth: 200,
			isResizable: true,
		},
		{
			key: 'Species',
			name: 'Species',
			fieldName: 'species',
			minWidth: 100,
			isResizable: true,
		},
		{
			key: 'NavBtn',
			name: 'Detail',
			fieldName: 'id',
			minWidth: 100,
		},
	];
	const renderColumn = (
		item?: any,
		index?: number | undefined,
		column?: IColumn | undefined,
	): React.ReactNode => {
		if (column?.key === 'Age') {
			return `${item.age} years old`;
		} else if (column?.key === 'Name') {
			return `${item.name}`;
		} else if (column?.key === 'Species') {
			return `${item.species}`;
		} else if (column?.key === 'NavBtn') {
			return (
				<NavLink to={`/pet/${item.id}`} activeClassName="selected">
					Detail
				</NavLink>
			);
		}
	};
	return (
		<>
			<h1>Pets</h1>
			<DetailsList
				compact={true}
				items={pets}
				columns={_columns}
				layoutMode={DetailsListLayoutMode.justified}
				onRenderItemColumn={renderColumn}
			/>
		</>
	);
};

export default Home;
