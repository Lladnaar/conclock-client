import { SmartTimer as Timer }  from './timer.js';
import { Settings } from './settings.js';

window.addEventListener("load", initialisePage);

function initialisePage() {
	var clock = new Clock();
}

class Clock {
	constructor() {
		this.timer = new Timer();
		this.settings = new Settings("settings");

		this.clock = document.getElementById("clock");
		this.timer.on("tick", this.update.bind(this));
	}
	
	draw() {
		const options = {
			timeStyle: this.settings.get("style") || 'medium',
			hour12: this.settings.get('hour12') === 'true',
			timeZone: this.settings.get('timezone') || undefined
		}

		this.clock.textContent = Intl.DateTimeFormat(undefined, options).format(new Date());
		return this;
	}
	
	update(event) {
		this.time = event.time;
		return this.draw();
	}
}
