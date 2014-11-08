// Generated by CoffeeScript 1.8.0
(function() {
  require(['static/js/data/KeyCodes', 'static/js/data/PianoKeys', 'static/js/instrument/KeyanoInstrument', 'static/js/listeners/KeyanoDomElementHighlighter', 'static/js/listeners/KeyanoKeyCombinationNameReporter'], function(KeyCodes, PianoKeys, KeyanoInstrument, KeyanoDomElementHighlighter, KeyanoKeyCombinationNameReporter) {
    var $ui, KEY_MAPPINGS;
    KEY_MAPPINGS = [
      {
        keyCode: KeyCodes.Q,
        pianoKey: PianoKeys.A3
      }, {
        keyCode: KeyCodes.KEYPAD_2,
        pianoKey: PianoKeys.Bb3
      }, {
        keyCode: KeyCodes.W,
        pianoKey: PianoKeys.B3
      }, {
        keyCode: KeyCodes.E,
        pianoKey: PianoKeys.C4
      }, {
        keyCode: KeyCodes.KEYPAD_4,
        pianoKey: PianoKeys.Db4
      }, {
        keyCode: KeyCodes.R,
        pianoKey: PianoKeys.D4
      }, {
        keyCode: KeyCodes.KEYPAD_5,
        pianoKey: PianoKeys.Eb4
      }, {
        keyCode: KeyCodes.T,
        pianoKey: PianoKeys.E4
      }, {
        keyCode: KeyCodes.Y,
        pianoKey: PianoKeys.F4
      }, {
        keyCode: KeyCodes.KEYPAD_7,
        pianoKey: PianoKeys.Gb4
      }, {
        keyCode: KeyCodes.U,
        pianoKey: PianoKeys.G4
      }, {
        keyCode: KeyCodes.KEYPAD_8,
        pianoKey: PianoKeys.Ab4
      }, {
        keyCode: KeyCodes.I,
        pianoKey: PianoKeys.A4
      }, {
        keyCode: KeyCodes.KEYPAD_9,
        pianoKey: PianoKeys.Bb4
      }, {
        keyCode: KeyCodes.O,
        pianoKey: PianoKeys.B4
      }, {
        keyCode: KeyCodes.P,
        pianoKey: PianoKeys.C5
      }, {
        keyCode: KeyCodes.DASH,
        pianoKey: PianoKeys.Db5
      }, {
        keyCode: KeyCodes.OPEN_BRACKET,
        pianoKey: PianoKeys.D5
      }, {
        keyCode: KeyCodes.EQUAL_SIGN,
        pianoKey: PianoKeys.Eb5
      }, {
        keyCode: KeyCodes.CLOSE_BRACKET,
        pianoKey: PianoKeys.E5
      }
    ];
    $ui = {
      keyCombinationNameLabel: $('.KeyCombinationNameLabel')
    };
    return $(document).ready(function() {
      var instrument, keyanoDomElementHighlighter, keyanoKeyCombinationNameReporter;
      instrument = new KeyanoInstrument();
      instrument.activateKeys(KEY_MAPPINGS);
      keyanoDomElementHighlighter = new KeyanoDomElementHighlighter({
        instrument: instrument
      });
      keyanoDomElementHighlighter.activate(KEY_MAPPINGS);
      keyanoKeyCombinationNameReporter = new KeyanoKeyCombinationNameReporter({
        instrument: instrument
      });
      keyanoKeyCombinationNameReporter.activate(KEY_MAPPINGS, $ui.keyCombinationNameLabel);
    });
  });

}).call(this);

//# sourceMappingURL=main.js.map
