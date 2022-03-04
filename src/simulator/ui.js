class Sensor {
  constructor(type) {
    this.type = type;
  }
}

class RangeSensor extends Sensor {
  constructor(id, min, max, initial) {
    super("range");
    this.id = id;
    this.min = min;
    this.max = max;
    this.value = initial;
  }
}

class BoardUI {
  
  constructor() {
      const svgObject = document.querySelector('#svg');
      this.svg = svgObject.contentDocument;
      if (!this.svg) {
        throw new Error("Missing #svg document");
      }
      const leds = this.svg.querySelector('#LEDsOn').querySelectorAll('use');
      this.display = new DisplayUI(leds)
      this.buttons = [
        new ButtonUI(this.svg.querySelector('#ButtonA'), "A"),
        new ButtonUI(this.svg.querySelector('#ButtonB'), "B")
      ]

      const sensors = [
        this.display.lightLevel
      ];
      const sensorElt = document.querySelector("#sensors");
      for (const sensor of sensors) {
        if (sensor.type === "range") {
          sensorElt.appendChild(createRangeUI(sensor))
        }
      }
  }

}

const createRangeUI = (sensor) => {
  const { min, max, value, type, id } = sensor;
  const labelElt = document.createElement("label");
  const text = labelElt.appendChild(document.createElement("span"));
  text.innerText = id;
  const input = labelElt.appendChild(document.createElement("input"));
  Object.assign(input, { min, max, value, type })
  input.addEventListener("change", () => {
      sensor.value = input.value;
  })
  return labelElt;
}

class DisplayUI {
  constructor(leds) {
      this.leds = leds;
      this.lightLevel = new RangeSensor("lightLevel", 0, 255, 127);
  }
  setPixel(x, y, value) {
      const on = value > 0;
      const led = this.leds[x * 5 + y];
      if (on) {
          led.style.display = "inline";
          led.style.opacity = value / 255;
      } else {
          led.style.display = "none";
      }
  }
}

class ButtonUI {
  constructor(element, label) {
    this.label = label;
    this._isPressed = false;
    this._presses = 0;

    this.element = element;
    this.element.role = "button";
    this.element.ariaLabel = label;
    this.element.addEventListener("mousedown", () => {
      this._isPressed = true;
      this._presses++;
    });
    this.element.addEventListener("mouseup", () => {
      this._isPressed = false;
    });
  }

  isPressed() {
    return this._isPressed;
  }

  getAndClearPresses() {
    const result = this._presses;
    this._presses = 0;
    return result;
  }
}