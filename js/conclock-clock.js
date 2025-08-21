import * as common from './common.js';
import * as timer from './timer.js';
import * as format from './format.js';
import { Settings } from './settings.js';

window.addEventListener("load", initialisePage);

function initialisePage() {
	var clock = new Clock();
}

class Clock {
	constructor() {
		// objects
		this.timer = new timer.SmartTimer();
		this.settings = new Settings("settings");
		// elements
		this.clock = document.getElementById("clock");
		// state
//		this.setFormat(localStorage.getItem('ClockFormat') || 'HM');
		// events
		this.timer.on("tick", this.update.bind(this));
	}
	
	draw() {
		const options = {
			timeStyle: 'short' || 'medium',
			hour12: 'false' === 'true',
			timeZone: 'Pacific/Auckland' || undefined
		}

		this.clock.textContent = Intl.DateTimeFormat(undefined, options).format(new Date());
		return this;
	}
	
	update(event) {
		this.time = event.time;
		return this.draw();
	}
	
	setFormat(format) {
		localStorage.setItem('ClockFormat', format);
		this.format = format;
		return this.draw();
	}
	
	getFormat() {
		return this.format;
	}
}


