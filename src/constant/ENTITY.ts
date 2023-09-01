export enum CARS { CAR1 = "Car 1", CAR2 = "Car 2", CAR3 = "Car 3", CAR4 = "Car 4"}
export type CarType = keyof typeof CARS

export enum LANES { LANE1 = "Lane 1", LANE2 = "Lane 2", LANE3 = "Lane 3", LANE4 = "Lane 4"}
export type LaneType = keyof typeof LANES
