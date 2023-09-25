interface LocationConverterProps {
	plate: number;
	number: number;
}

export default function LocationConverter(props: LocationConverterProps) {
	const generateLaneByNumber = (
		number: number,
		number1: number,
		number2: number,
		number3: number
	): number => {
		if (number <= number1) {
			return 1;
		} else if (number <= number2) {
			return 2;
		} else if (number <= number3) {
			return 3;
		} else {
			return 4;
		}
	};
	const generateLane = (plate: number, number: number): number => {
		if (plate === 1) {
			return generateLaneByNumber(number, 3, 8, 12);
		} else if (plate === 2) {
			return generateLaneByNumber(number, 1, 19, 25);
		} else if (plate === 3) {
			return generateLaneByNumber(number, 1, 19, 25);
		} else if (plate === 4) {
			return generateLaneByNumber(number, 8, 23, 38);
		} else if (plate === 5) {
			return generateLaneByNumber(number, 1, 19, 25);
		} else if (plate === 6) {
			return generateLaneByNumber(number, 1, 19, 25);
		} else {
			return generateLaneByNumber(number, 5, 17, 25);
		}
	};
	const generatePosition = (
		lane: number,
		plate: number,
		number: number
	): number => {
		const s_dis = 56 / 6;
		const c1_dis = (Math.PI * (7 + 22.5 / 8)) / 4;
		const c2_dis = (Math.PI * (7 + (3 * 22.5) / 8)) / 8;
		const c3_dis = (Math.PI * (7 + (5 * 22.5) / 8)) / 12;
		const c4_dis = (Math.PI * (7 + (7 * 22.5) / 8)) / 12;

		if (plate == 1) {
			return s_dis;
		} else if (plate == 2) {
			return [
				2 * s_dis + c1_dis,
				2 * s_dis + c2_dis * (2 * ((number % 2) + 1) - 1),
				2 * s_dis + c3_dis * (2 * (((number + 1) % 3) + 1) - 1),
				2 * s_dis + c4_dis * (2 * (((number + 1) % 3) + 1) - 1),
			][lane - 1];
		} else if (plate == 3) {
			return [
				2 * s_dis + 3 * c1_dis,
				2 * s_dis + c2_dis * (2 * ((number % 2) + 1) + 3),
				2 * s_dis + c3_dis * (2 * (((number + 1) % 3) + 1) + 5),
				2 * s_dis + c4_dis * (2 * (((number + 1) % 3) + 1) + 5),
			][lane - 1];
		} else if (plate == 4) {
			return [
				2 * s_dis + 4 * c1_dis + s_dis * (2 * (number % 3) + 1),
				2 * s_dis + 8 * c2_dis + s_dis * (2 * (number % 3) + 1),
				2 * s_dis + 12 * c3_dis + s_dis * (2 * (number % 3) + 1),
				2 * s_dis + 12 * c4_dis + s_dis * (2 * (number % 3) + 1),
			][lane - 1];
		} else if (plate == 5) {
			return [
				2 * s_dis + 4 * c1_dis + c1_dis,
				2 * s_dis + 8 * c2_dis + c2_dis * (2 * ((number % 2) + 1) - 1),
				2 * s_dis + 12 * c3_dis + c3_dis * (2 * (((number + 1) % 3) + 1) - 1),
				2 * s_dis + 12 * c4_dis + c4_dis * (2 * (((number + 1) % 3) + 1) - 1),
			][lane - 1];
		} else if (plate == 6) {
			return [
				2 * s_dis + 4 * c1_dis + 3 * c1_dis,
				2 * s_dis + 8 * c2_dis + c2_dis * (2 * ((number % 2) + 1) + 3),
				2 * s_dis + 12 * c3_dis + c3_dis * (2 * (((number + 1) % 3) + 1) + 5),
				2 * s_dis + 12 * c4_dis + c4_dis * (2 * (((number + 1) % 3) + 1) + 5),
			][lane - 1];
		} else {
			return [
				8 * s_dis + 8 * c1_dis + s_dis * (2 * (number % 2) + 1),
				8 * s_dis + 16 * c2_dis + s_dis * (2 * (number % 2) + 1),
				8 * s_dis + 24 * c2_dis + s_dis * (2 * (number % 2) + 1),
				8 * s_dis + 24 * c4_dis + s_dis * (2 * (number % 2) + 1),
			][lane - 1];
		}
	};
	const generateDistance = (plate: number, number: number) => {
		const lane = generateLane(plate, number);
		const position = generatePosition(lane, plate, number);

		const all_dis = [
			112 + 2 * Math.PI * (7 + 22.5 / 8),
			112 + 2 * Math.PI * (7 + (3 * 22.5) / 8),
			112 + 2 * Math.PI * (7 + (5 * 22.5) / 8),
			112 + 2 * Math.PI * (7 + (7 * 22.5) / 8),
		];

		console.log(lane, position, all_dis[lane - 1]);
		console.log(position / all_dis[lane - 1]);
		return { dis: position / all_dis[lane - 1], lane: lane };
	};

	return generateDistance(props.plate, props.number);
}
