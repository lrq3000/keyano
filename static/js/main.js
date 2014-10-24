// Generated by CoffeeScript 1.8.0
(function() {
  require(['static/js/KeyCodes', 'static/js/PianoKeys', 'static/js/KeyanoInstrument'], function(KeyCodes, PianoKeys, KeyanoInstrument) {
    var CACHED_KEYANO_KEY_DOM_ELEMENTS, KEYANO_KEYS, PIANO_KEY_SELECTOR, _fillCacheOfKeyanoKeyDomElements;
    PIANO_KEY_SELECTOR = '.keyano-key';
    CACHED_KEYANO_KEY_DOM_ELEMENTS = {};
    KEYANO_KEYS = [
      {
        keyCode: KeyCodes.Q,
        pianoKey: PianoKeys.C4
      }, {
        keyCode: KeyCodes.KEYPAD_2,
        pianoKey: PianoKeys.Db4
      }, {
        keyCode: KeyCodes.W,
        pianoKey: PianoKeys.D4
      }, {
        keyCode: KeyCodes.KEYPAD_3,
        pianoKey: PianoKeys.Eb4
      }, {
        keyCode: KeyCodes.E,
        pianoKey: PianoKeys.E4
      }, {
        keyCode: KeyCodes.R,
        pianoKey: PianoKeys.F4
      }, {
        keyCode: KeyCodes.KEYPAD_5,
        pianoKey: PianoKeys.Gb4
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
      }
    ];
    _fillCacheOfKeyanoKeyDomElements = function(keyanoKeys) {
      _.chain(keyanoKeys).pluck('pianoKey').forEach(function(pianoKey) {
        var $elem;
        $elem = $("" + PIANO_KEY_SELECTOR + "[data-piano-key-id='" + pianoKey.id + "']");
        return CACHED_KEYANO_KEY_DOM_ELEMENTS[pianoKey.id] = $elem;
      });
    };
    return $(document).ready(function() {
      var keyanoInstrument;
      keyanoInstrument = new KeyanoInstrument();
      keyanoInstrument.activateKeys(KEYANO_KEYS);
      _fillCacheOfKeyanoKeyDomElements(KEYANO_KEYS);
      $(document).on('piano:key:did:start:playing', function(ev, pianoKeyId) {
        var _ref;
        return (_ref = CACHED_KEYANO_KEY_DOM_ELEMENTS[pianoKeyId]) != null ? _ref.addClass('depressed') : void 0;
      });
      return $(document).on('piano:key:did:stop:playing', function(ev, pianoKeyId) {
        var _ref;
        return (_ref = CACHED_KEYANO_KEY_DOM_ELEMENTS[pianoKeyId]) != null ? _ref.removeClass('depressed') : void 0;
      });
    });
  });

}).call(this);
