export class Timer extends EventTarget {
	constructor() {
		super();

		// restore cached offset
		this.setOffset(Number(localStorage.getItem('timer.offset'))) || 0;
		this.timer = setInterval(this.doTick.bind(this), 500);
		
		// get new time offset
		fetch('/api/time')
			.then(response => {
				return response.json();
			})
			.then(json => {
				this.setTime(new Date(json.time));
			})
			.catch(error => {
				console.error("Failed to fetch time from server:", error);
			});

	}

	setTime(time) {
		return this.setOffset(time - Date.now());
	}

	getTime(time) {
		return new Date(Date.now() + this.offset);
	}

	setOffset(offset) {
		this.offset = offset;
		localStorage.setItem('timer.offset', offset);
		console.debug("Timer offset set to", offset);
		return this.doTick();
	}

	doTick() {
        const event = new Event('tick');
        event.time = this.getTime();
        return this.dispatchEvent(event);
	}
}
