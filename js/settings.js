export class Settings {
	constructor(id = "settings") {
		this.elements = new Map();

		this.panel = document.getElementById(id);
		this.panel.hidden = true;
		this.addall(this.panel);

		document.body.on("keypress", this.hotKey.bind(this));
	}

	addall(element) {
		for (const child of element.children) {
			this.addall(child);
			if (child.id.substring(0, 8) == "setting.") {
				this.add(child, child.id.substring(8));
			}
		}
		return this;
	}

	add(element, id = element.id) {
		this.elements.set(id, element);
		element.value = localStorage.getItem(element.id) || element.value;
		element.on("change", () => {
			localStorage.setItem(element.id, element.value);
		});
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
