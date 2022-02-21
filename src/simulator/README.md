MicroPython-micro:bit simulator
===============================

This is a variant of codal_port which is compiled with Emscripten.  It
provides a simulated micro:bit REPL in the browser.

To build (in this directory):

    $ make

To run (in this directory):

    $ python -m http.server

Then browse to localhost:8000.

Known issues:
- Does not support keys being pressed when async code is running, for
  example time.sleep(1) and microbit.display.scroll(...).
- Background events like display scrolling do not run when the RELP is
  idle.
