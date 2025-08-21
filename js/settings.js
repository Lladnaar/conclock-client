export class Settings {
	constructor(id) {
		this.elements = new Map();

		this.panel = document.getElementById(id);
		this.add(this.panel);

		// state
		this.panel.hidden = true;

		// events
		document.body.on("keypress", this.hotKey.bind(this));
	}

	add(element) {
		for (const child of element.children) {
			this.add(child);
			if (child.id.substring(0, 8) == "setting.") {
				this.elements.set(child.id.substring(8), child);
			}
		}
		return this;
	}

	get(element) {
		return this.elements.get(element).value;
	}

	set(element, value) {
		const el = this.elements.get(element);
		if (el) {
			el.value = value;
		}
		return this;
	}

	on(element, callback) {
		const el = this.elements.get(element);
		if (el) {
			el.addEventListener("change", callback);
		}
		return this;
	}

	hotKey(event) {
		if (event.key == "Escape") {
			this.toggle();
			event.stopPropagation();
		}
		return this;
	}

	toggle() {
		document.activeElement.blur();
		this.panel.hidden = !this.panel.hidden;
		return this;
	}
}
