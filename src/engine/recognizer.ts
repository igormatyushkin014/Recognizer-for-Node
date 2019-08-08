import {
	RecognizerConfiguration
} from "./recognizer-configuration";

import {
	User
} from "../data/user";

import {
	Store
} from "./store";

export class Recognizer {

	private store = new Store();

	constructor(
		private readonly configuration: RecognizerConfiguration
	) {
	}

	public add(
		socket: SocketIO.Socket,
		events: string[]
	): User {
		let user = this.store.createUser(
			socket
		);
		
		events.forEach((event) => {
			socket.on(
				event,
				(data) => {
					if (this.configuration.users && this.configuration.users.onEvent) {
						this.configuration.users!.onEvent(
							user,
							event,
							data
						);
					}
				}
			);
		});

		if (this.configuration.users && this.configuration.users.onAdded) {
			this.configuration.users.onAdded(
				user
			);
		}

		return user;
	}

	public remove(
		socket: SocketIO.Socket
	) {
		let user = this.store.getUserBySocketId(
			socket.id
		);
		
		if (user) {
			this.store.removeUserById(
				user.id
			);

			if (this.configuration.users && this.configuration.users.onRemoved) {
				this.configuration.users.onRemoved(
					user
				);
			}
		}
	}

	public send(
		event: string,
		data: any,
		recipientId: string
	) {
		let recipient = this.store.getUserById(
			recipientId
		);

		if (!recipient) {
			return;
		}

		recipient.socket.emit(
			event,
			data
		);
	}

	public sendToEveryone(
		event: string,
		data: any
	) {
		this.configuration.socketIO.emit(
			event,
			data
		);
	}
}
