import { Timer }  from './timer.js';
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
		this.timer.addEventListener("tick", this.update.bind(this));

		// add time zones
		const timezoneSelect = this.settings.getElement("timezone");
		timezoneSelect.add(new Option("", undefined));
		for (const tz of Intl.supportedValuesOf('timeZone')) {
			timezoneSelect.add(new Option(tz, tz));
		}
	}
	
	draw() {
		const options = {
			timeStyle: this.settings.get("style") || "short",
			hour12: this.settings.get('hour12') ? this.settings.get('hour12') === 'true' : undefined,
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
