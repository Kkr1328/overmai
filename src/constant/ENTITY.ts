export enum CARS {
	red = 'Car 1',
	blue = 'Car 2',
	green = 'Car 3',
	black = 'Car 4',
}
export type CarType = keyof typeof CARS;

export enum LANES {
	LANE1 = 'Lane 1',
	LANE2 = 'Lane 2',
	LANE3 = 'Lane 3',
	LANE4 = 'Lane 4',
}
export type LaneType = keyof typeof LANES;
