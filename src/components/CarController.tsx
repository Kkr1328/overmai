'use client';

import * as React from 'react';
import Image from 'next/image';

import {
	Box,
	Button,
	ButtonGroup,
	FormControlLabel,
	Stack,
	Switch,
	Typography,
} from '@mui/material';

import { CarType, LaneType } from '@/constant/ENTITY';
import { LENGTH } from '@/constant/CONST';

interface CarControllerProps {
	socket: any;
	value: CarType;
	name: string;
}

export default function CarController(props: CarControllerProps) {
	const [isEnable, setIsEnable] = React.useState<boolean>(false);
	// const [lane, setLane] = React.useState<LaneType>('LANE1');

	const handleIsEnableChange = (isCurrentEnable: boolean) => {
		setIsEnable(isCurrentEnable);
		props.socket.emit(props.name + '_receive', {
			isEnable: isCurrentEnable,
			changeLane: null,
		});
	};

	// const handleLaneChange = (currentLane: LaneType) => {
	// 	setLane(currentLane);
	// 	console.log(props.name, '| Enable :', isEnable, ', Lane :', currentLane);
	// 	// sent "Change lane" API here
	// };

	return (
		<Stack className="gap-8" alignItems="start">
			<Stack direction="row" className="gap-8">
				{/* Car Icon */}
				<Box className="w-[60px] h-[10px]">
					<Image
						src={`/${props.value}.svg`}
						alt={props.name}
						style={{ rotate: `90deg`, translate: '20px -5px' }}
						width={LENGTH.CAR_WIDTH}
						height={LENGTH.CAR_HEIGHT}
					/>
				</Box>
				<Typography
					fontWeight="bold"
					className="text-black"
					style={{ lineHeight: 2.5 }}
				>
					{props.name}
				</Typography>
				<FormControlLabel
					control={
						<Switch
							checked={isEnable}
							onChange={(event) => handleIsEnableChange(event.target.checked)}
						/>
					}
					label={`Enable ${props.name}`}
				/>
			</Stack>
			{/* <ToggleButtonGroup
				color="primary"
				exclusive
				value={lane}
				onChange={(event, lane) => lane && handleLaneChange(lane)}>
				{Object.entries(LANES).map(([value, name]) => (
					<ToggleButton value={value} key={name}>
						{name}
					</ToggleButton>
				))}
			</ToggleButtonGroup> */}
			<ButtonGroup variant="outlined" aria-label="outlined button group">
				<Button
					onClick={() =>
						props.socket.emit(props.name + '_receive', {
							isEnable: isEnable,
							changeLane: 'Left',
						})
					}
				>
					Left
				</Button>
				<Button
					onClick={() =>
						props.socket.emit(props.name + '_receive', {
							isEnable: isEnable,
							changeLane: 'Right',
						})
					}
				>
					Right
				</Button>
			</ButtonGroup>
		</Stack>
	);
}
