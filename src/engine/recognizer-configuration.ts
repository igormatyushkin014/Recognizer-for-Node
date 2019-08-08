import {
	User
} from "../data/user";

export type RecognizerConfiguration = {
	readonly socketIO: SocketIO.Server,
	readonly users?: {
		onAdded?: (user: User) => void,
		onEvent?: (user: User, event: string, data: any) => void,
		onRemoved?: (user: User) => void
	}
};
