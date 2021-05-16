import React from 'react';
import './layout.scss';

export const Layout: React.FC = (props: any) => {
	return (
		<div id={'layout'}>
			<div className={'navbar'}>
				<span>OData Veterinary</span>
			</div>
			<div className={'content'}>{props.children}</div>
		</div>
	);
};
