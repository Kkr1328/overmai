import { Fragment } from 'react';
import Image from 'next/image';

import {
	AppBar,
	Box,
	Card,
	Divider,
	FormControlLabel,
	Grid,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';

import CarInfo from '@/components/CarInfo';

import { COLOR } from '@/constant/COLOR';
import { SPACE } from '@/constant/SPACE';
import { CARS } from '@/constant/ENTITY';

export default function Home() {
	return (
		<Fragment>
			<Box
				sx={{
					background: COLOR.DARK_GREY,
					width: '100vw',
					height: '100vh',
				}}>
				<AppBar
					position="static"
					sx={{ background: COLOR.BLACK, px: SPACE[16], py: SPACE[8] }}>
					<Image src="/logo.png" alt="Logo" width={200} height={80} />
				</AppBar>

				<Stack spacing={SPACE[16]} sx={{ px: SPACE[32], py: SPACE[16] }}>
					<Stack direction="row" spacing={SPACE[8]}>
						<DirectionsCarRoundedIcon
							sx={{ color: COLOR.BLACK }}
							fontSize="large"
						/>
						<Typography
							variant="h5"
							fontWeight="bold"
							color={COLOR.BLACK}
							alignSelf="center">
							Cars' controller
						</Typography>
					</Stack>
					<Card sx={{ px: SPACE[32], py: SPACE[16] }}>
						<Grid container spacing={2}>
							<Grid item xs={6} justifyContent="center" alignSelf="center">
								<Image
									src="/path1.svg"
									alt="path"
									width={300}
									height={300}
									style={{
										margin: 'auto',
									}}
								/>
								<Image src="/car1.svg" alt="car1" width={20} height={80} />
								<Image src="/car2.svg" alt="car2" width={20} height={80} />
								<Image src="/car3.svg" alt="car3" width={20} height={80} />
								<Image src="/car4.svg" alt="car4" width={20} height={80} />
							</Grid>
							<Grid item xs={6}>
								<Stack spacing={SPACE[16]} alignItems="start">
									{CARS.map((car) => (
										<CarInfo name={car} />
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
