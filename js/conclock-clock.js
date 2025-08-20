import * as common from './common.js';
import * as timer from './timer.js';
import * as format from './format.js';

window.addEventListener("load", initialisePage);

function initialisePage() {
	var smarttimer = new timer.SmartTimer();
	var clock = new Clock(smarttimer);
	var settings = new Settings(smarttimer, clock);
}

class Clock {
	constructor(timer) {
		// objects
		this.timer = timer;
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

class Settings {
	constructor(timer, clock) {
		// objects
		this.timer = timer;
		this.clock = clock;
	
		// elements
		this.settings = document.getElementById("settings");
		this.style = document.getElementById("style");
		this.format = document.getElementById("format");
		this.timezone = document.getElementById("timezone");
		this.close = document.getElementById("close");

		// state
		this.settings.hidden = true;

		// user events
		document.body.on("keypress", this.hotKey.bind(this));
		this.style.on("change", this.changeFormat.bind(this));
		this.format.on("change", this.changeFormat.bind(this));
		this.timezone.on("change", this.changeFormat.bind(this));
	}

	setAuto(event) {
		this.timer.autoTime();
	}

	hotKey(event) {
		if (this.settings.hidden && event.key == "Escape") {
			this.show();
			event.stopPropagation();
		}
		else if (!this.settings.hidden && event.key == "Escape") {
			this.hide();
			event.stopPropagation();
		}
	}
	
	show() {
		document.activeElement.blur();
		this.settings.hidden = false;
	}
	
	hide() {
		document.activeElement.blur();
		this.settings.hidden = true;
	}

	standardiseTime(time) {
//		this.displayTimeExcept(time, null);
	}

	setFormat(format) {
//		this.format.value = format;
	}

	changeFormat(event) {
//		this.clock.setFormat(this.format.value);
	}
}
