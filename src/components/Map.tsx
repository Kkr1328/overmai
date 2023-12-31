'use client';

import { LENGTH } from '@/constant/CONST';
import LocationConverter from '@/utils/LocationConverter';
import { Box, Slider } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';

interface Position {
	x_pos: number;
	y_pos: number;
	degree: number;
}

interface MapProps {
	socket: any;
}
type CAR = 'red' | 'blue' | 'green' | 'black';

export default function Map(props: MapProps) {
	const [value, setValue] = React.useState({
		red: {
			dis: 0,
			lane: 1,
		},
		blue: {
			dis: 0,
			lane: 2,
		},
		green: {
			dis: 0,
			lane: 3,
		},
		black: {
			dis: 0,
			lane: 4,
		},
	});

	useEffect(() => {
		props.socket.on('red_send', (data: any) => {
			setValue({ ...value, red: LocationConverter(data) });
		});
		props.socket.on('blue_send', (data: any) => {
			setValue({ ...value, blue: LocationConverter(data) });
		});
		props.socket.on('green_send', (data: any) => {
			setValue({ ...value, green: LocationConverter(data) });
		});
		props.socket.on('black_send', (data: any) => {
			setValue({ ...value, black: LocationConverter(data) });
		});
	});

	const position = (car: CAR): Position => {
		const radius_length =
			(LENGTH.MAP_WIDTH - (9 - 2 * value[car].lane) * LENGTH.LANE_WIDTH) / 2;
		const straight_length = LENGTH.MAP_HEIGHT - LENGTH.MAP_WIDTH;
		const curve_length = Math.PI * radius_length;
		const distance =
			(1 - value[car].dis / 100) * (2 * straight_length + 2 * curve_length);
		const start_y_pos = (LENGTH.MAP_HEIGHT - LENGTH.CAR_HEIGHT) / 2;

		if (distance < straight_length / 2) {
			return {
				x_pos: -radius_length,
				y_pos: start_y_pos - distance,
				degree: 180,
			};
		} else if (distance < straight_length / 2 + curve_length) {
			const degree = (180 * (distance - straight_length / 2)) / curve_length;
			const rad = (degree / 180) * Math.PI;
			return {
				x_pos: -Math.cos(rad) * radius_length,
				y_pos:
					start_y_pos - straight_length / 2 - Math.sin(rad) * radius_length,
				degree: degree + 180,
			};
		} else if (distance < (3 * straight_length) / 2 + curve_length) {
			return {
				x_pos: radius_length,
				y_pos: start_y_pos + distance - straight_length - curve_length,
				degree: 0,
			};
		} else if (distance < (3 * straight_length) / 2 + 2 * curve_length) {
			const degree =
				180 +
				(180 * (distance - (3 * straight_length) / 2 - curve_length)) /
					curve_length;
			const rad = ((degree - 180) / 180) * Math.PI;
			return {
				x_pos: Math.cos(rad) * radius_length,
				y_pos:
					start_y_pos + straight_length / 2 + Math.sin(rad) * radius_length,
				degree: degree + 180,
			};
		} else {
			return {
				x_pos: -radius_length,
				y_pos:
					start_y_pos - distance + (4 * straight_length) / 2 + 2 * curve_length,
				degree: 180,
			};
		}
	};

	return (
		<>
			<Box className="flex justify-center" height={LENGTH.MAP_HEIGHT}>
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
						translate: `${position('red').x_pos}px ${position('red').y_pos}px`,
						transform: `rotate(${position('red').degree}deg)`,
					}}
					className="z-90 absolute"
					src="/red.svg"
					alt="car1"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
				<Image
					style={{
						translate: `${position('blue').x_pos}px ${
							position('blue').y_pos
						}px`,
						transform: `rotate(${position('blue').degree}deg)`,
					}}
					className="z-90 absolute"
					src="/blue.svg"
					alt="car2"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
				<Image
					style={{
						translate: `${position('green').x_pos}px ${
							position('green').y_pos
						}px`,
						transform: `rotate(${position('green').degree}deg)`,
					}}
					className="z-90 absolute"
					src="/green.svg"
					alt="car3"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
				<Image
					style={{
						translate: `${position('black').x_pos}px ${
							position('black').y_pos
						}px`,
						transform: `rotate(${position('black').degree}deg)`,
					}}
					className="z-90 absolute"
					src="/black.svg"
					alt="car4"
					width={LENGTH.CAR_WIDTH}
					height={LENGTH.CAR_HEIGHT}
				/>
			</Box>
		</>
	);
}
