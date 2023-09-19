import { Box } from '@mui/material';
import Image from 'next/image';

export default function Map() {
	return (
		<Box>
			<Image
				className="absolute"
				src="/path1.svg"
				alt="path"
				width={300}
				height={300}
				style={{
					margin: 'auto',
				}}
			/>
			<Image
				className="z-90 absolute transform translate-x-[3px] translate-y-[200px]"
				src="/car1.svg"
				alt="car1"
				width={20}
				height={80}
			/>
			<Image
				className="z-90 absolute transform translate-x-[29px] translate-y-[200px]"
				src="/car2.svg"
				alt="car1"
				width={20}
				height={80}
			/>
			<Image
				className="z-90 absolute transform translate-x-[55px] translate-y-[200px]"
				src="/car3.svg"
				alt="car1"
				width={20}
				height={80}
			/>
			<Image
				className="z-90 absolute transform rotate-180 translate-x-[225px] translate-y-[200px]"
				src="/car4.svg"
				alt="car1"
				width={20}
				height={80}
			/>
		</Box>
	);
}
