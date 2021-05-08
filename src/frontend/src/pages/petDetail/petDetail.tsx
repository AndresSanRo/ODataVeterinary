import React from 'react';
import { useParams } from 'react-router';

const PetDetail: React.FC = () => {
	let { petId } = useParams<{ petId: string }>();
	return <span>Pet id: {petId}</span>;
};

export default PetDetail;
