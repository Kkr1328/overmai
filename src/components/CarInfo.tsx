'use client';

import Image from 'next/image';

import { COLOR } from '@/constant/COLOR';
import { LANES } from '@/constant/ENTITY';
import { SPACE } from '@/constant/SPACE';
import {
	Box,
	FormControlLabel,
	Stack,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import * as React from 'react';

interface CarInfoProps {
	name: string;
}

export default function CarInfo(props: CarInfoProps) {
	const [lane, setLane] = React.useState<string>(LANES[0]);

	const handlelane = (
		event: React.MouseEvent<HTMLElement>,
		newLane: string
	) => {
		if (newLane) {
			setLane(newLane);
		}
	};

	return (
		<Stack gap={SPACE[8]} alignItems="start">
			<Stack direction="row" gap={SPACE[8]}>
				<Box width={60} height={10}>
					<Image
						src={`/${props.name}.svg`}
						alt={props.name}
						style={{ rotate: `90deg`, translate: '20px -5px' }}
						width={20}
						height={80}
					/>
				</Box>
				<Typography
					fontWeight="bold"
					style={{ color: COLOR.BLACK, lineHeight: 2.5 }}>
					{props.name}
				</Typography>
				<FormControlLabel control={<Switch />} label={`Enable ${props.name}`} />
			</Stack>
			<ToggleButtonGroup
				color="primary"
				exclusive
				value={lane}
				onChange={handlelane}>
				{LANES.map((lane) => (
					<ToggleButton value={lane}>{lane}</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Stack>
	);
}
