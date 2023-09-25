import { Fragment } from 'react';
import Image from 'next/image';
import { io } from 'socket.io-client';

import { AppBar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';

import Map from '@/components/Map';
import Carcontroller from '@/components/CarController';
import { CARS, CarType } from '@/constant/ENTITY';

const socket = io('http://localhost:8000', { transports: ['websocket'] });

export default function Home() {
	return (
		<Fragment>
			<Box className="w-screen h-screen bg-dark_grey">
				<AppBar position="static" className="px-16 py-8 bg-black">
					<Image src="/logo.png" alt="Logo" width={200} height={80} />
				</AppBar>

				<Stack className="px-32 py-16 gap-16">
					<Stack direction="row" className="gap-8">
						<DirectionsCarRoundedIcon className="text-black" fontSize="large" />
						<Typography
							variant="h5"
							fontWeight="bold"
							className="text-black"
							alignSelf="center"
						>
							Cars' controller
						</Typography>
					</Stack>
					<Card className="px-32 py-16">
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Map socket={socket} />
							</Grid>
							<Grid item xs={6}>
								<Stack className="gap-16" alignItems="start">
									{Object.entries(CARS).map(([value, name]) => (
										<Carcontroller
											socket={socket}
											value={value as CarType}
											name={name}
										/>
									))}
								</Stack>
							</Grid>
						</Grid>
					</Card>
				</Stack>
			</Box>
		</Fragment>
	);
}
