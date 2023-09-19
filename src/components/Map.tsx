'use client';

import { LENGTH } from '@/constant/CONST';
import { Box, Slider } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Position {
	x_pos: number;
	y_pos: number;
	degree: number;
}

export default function Map() {
	const [value, setValue] = React.useState(0);
	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number);
	};

	const position = (lane: number): Position => {
		const radius_length =
			(LENGTH.MAP_WIDTH - (2 * lane - 1) * LENGTH.LANE_WIDTH) / 2;
		const straight_length = LENGTH.MAP_HEIGHT - LENGTH.MAP_WIDTH;
		const curve_length = (Math.PI * radius_length) / 2;
		const distance = (value / 100) * (2 * straight_length + 4 * curve_length);
		const start_y_pos = (LENGTH.MAP_HEIGHT - LENGTH.CAR_HEIGHT) / 2;

		if (distance < straight_length / 2) {
			return {
				x_pos: -radius_length,
				y_pos: start_y_pos - distance,
				degree: 0,
			};
		} else if (distance < straight_length / 2 + curve_length) {
			const degree = (90 * (distance - straight_length / 2)) / curve_length;
			const rad = (degree / 180) * Math.PI;
			return {
				x_pos: -Math.cos(rad) * radius_length,
				y_pos:
					start_y_pos - straight_length / 2 - Math.sin(rad) * radius_length,
				degree: degree,
			};
		} else if (distance < straight_length / 2 + 2 * curve_length) {
			const degree =
				90 +
				(90 * (distance - straight_length / 2 - curve_length)) / curve_length;
			const rad = ((180 - degree) / 180) * Math.PI;
			return {
				x_pos: Math.cos(rad) * radius_length,
				y_pos:
					start_y_pos - straight_length / 2 - Math.sin(rad) * radius_length,
				degree: degree,
			};
		} else if (distance < (3 * straight_length) / 2 + 2 * curve_length) {
			return {
				x_pos: radius_length,
				y_pos: start_y_pos + distance - straight_length - 2 * curve_length,
				degree: 180,
			};
		} else if (distance < (3 * straight_length) / 2 + 3 * curve_length) {
			const degree =
				180 +
				(90 * (distance - (3 * straight_length) / 2 - 2 * curve_length)) /
					curve_length;
			const rad = ((degree - 180) / 180) * Math.PI;
			return {
				x_pos: Math.cos(rad) * radius_length,
				y_pos:
					start_y_pos + straight_length / 2 + Math.sin(rad) * radius_length,
				degree: degree,
			};
		} else if (distance < (3 * straight_length) / 2 + 4 * curve_length) {
			const degree =
				270 +
				(90 * (distance - (3 * straight_length) / 2 - 3 * curve_length)) /
					curve_length;
			const rad = ((360 - degree) / 180) * Math.PI;
			return {
				x_pos: -Math.cos(rad) * radius_length,
				y_pos:
					start_y_pos + straight_length / 2 + Math.sin(rad) * radius_length,
				degree: degree,
			};
		} else {
			return {
				x_pos: -radius_length,
				y_pos:
					start_y_pos - distance + (4 * straight_length) / 2 + 4 * curve_length,
				degree: 0,
			};
		}
	};

	return (
		<>
			<Slider
				value={typeof value === 'number' ? value : 0}
				onChange={handleSliderChange}
				aria-labelledby="input-slider"
			/>
			<Box className="flex justify-center">
				<Image
					className="absolute"
					src="/path1.svg"
					alt="path"
					width={LENGTH.MAP_WIDTH}
					height={LENGTH.MAP_HEIGHT}
					style={{
						margin: 'auto',
					}}
				/>
				<Image
					style={{
						translate: `${position(1).x_pos}px ${position(1).y_pos}px`,
						transform: `rotate(${position(1).degree}deg)`,
					}}
					className="z-90 absolute"
					src="/CAR1.svg"
					alt="car1"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
				<Image
					style={{
						translate: `${position(2).x_pos}px ${position(2).y_pos}px`,
						transform: `rotate(${position(2).degree}deg)`,
					}}
					className="z-90 absolute"
					src="/CAR2.svg"
					alt="car2"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
				<Image
					style={{
						translate: `${position(3).x_pos}px ${position(3).y_pos}px`,
						transform: `rotate(${position(3).degree}deg)`,
					}}
					className="z-90 absolute"
					src="/CAR3.svg"
					alt="car3"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
				<Image
					style={{
						translate: `${position(4).x_pos}px ${position(4).y_pos}px`,
						transform: `rotate(${position(4).degree}deg)`,
					}}
					className="z-90 absolute"
					src="/CAR4.svg"
					alt="car4"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
			</Box>
		</>
	);
}
