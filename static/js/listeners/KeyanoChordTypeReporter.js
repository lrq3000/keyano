// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['static/js/listeners/AbstractKeyanoListener', 'static/js/data/ChordData', 'static/js/Config', 'static/js/pianoKeyUtils'], function(AbstractKeyanoListener, ChordData, Config, pianoKeyUtils) {
    var IntervalName, KeyanoChordTypeReporter;
    IntervalName = {
      1: 'Minor 2nd',
      2: 'Major 2nd',
      3: 'Minor 3rd',
      4: 'Major 3rd',
      5: 'Perfect 4th',
      6: 'Tritone',
      7: 'Perfect 5th',
      8: 'Minor 6th',
      9: 'Major 6th',
      10: 'Minor 7th',
      11: 'Major 7th',
      12: 'Octave',
      13: 'Minor 9th',
      14: 'Major 9th',
      15: 'Minor 10th',
      16: 'Major 10th',
      17: 'Perfect 11th',
      18: 'Diminished 12th',
      19: 'Perfect 12th'
    };
    KeyanoChordTypeReporter = (function(_super) {
      __extends(KeyanoChordTypeReporter, _super);

      function KeyanoChordTypeReporter() {
        return KeyanoChordTypeReporter.__super__.constructor.apply(this, arguments);
      }

      KeyanoChordTypeReporter.prototype.keyanoKeys = null;

      KeyanoChordTypeReporter.prototype.activate = function(keyanoKeys, $outputElem) {
        this.keyanoKeys = keyanoKeys;
        this.$outputElem = $outputElem;
        return KeyanoChordTypeReporter.__super__.activate.apply(this, arguments);
      };

      KeyanoChordTypeReporter.prototype.onPianoKeyStartedPlaying = function(ev, pianoKeyId) {
        this._printChord();
      };

      KeyanoChordTypeReporter.prototype.onPianoKeyStoppedPlaying = function(ev, pianoKeyId) {
        this._printChord();
      };

      KeyanoChordTypeReporter.prototype._printChord = function() {
        var impressedPianoKeys, name, _ref, _ref1;
        impressedPianoKeys = this.instrument.getImpressedPianoKeys();
        if (impressedPianoKeys.length <= 1) {
          if ((_ref = this.$outputElem) != null) {
            _ref.text('');
          }
          return;
        } else if (impressedPianoKeys.length === 2) {
          name = this._identifyInterval(impressedPianoKeys);
        } else {
          name = this._identifyChord(impressedPianoKeys);
        }
        if ((_ref1 = this.$outputElem) != null) {
          _ref1.text(name);
        }
        this.$outputElem.toggleClass('unknown', name === Config.LABEL_FOR_UNRECOGNIZED_CHORDS);
      };

      KeyanoChordTypeReporter.prototype._identifyInterval = function(pianoKeys) {
        var higherKey, intervalSize, lowerKey;
        if (_.size(pianoKeys) < 2) {
          throw new Error('Not enough piano keys provided to _identifyInterval (need exactly 2)');
        }
        if (_.size(pianoKeys) > 2) {
          throw new Error('Too many piano keys provided to _identifyInterval (need exactly 2)');
        }
        lowerKey = pianoKeys[0], higherKey = pianoKeys[1];
        intervalSize = this._getIntervalSize(lowerKey, higherKey);
        if (IntervalName[intervalSize] == null) {
          throw new Error("This interval size (" + intervalSize + ") is not explicitly named in the IntervalName object");
        }
        return IntervalName[intervalSize];
      };


      /*
      Returns the name of the chord indicated by the provided piano key combination.
      @params
        pianoKeys : [
          <pianoKeyId> (string),
          ...
        ]
      @return
        (string) the name of the chord (e.g. CM7)
       */

      KeyanoChordTypeReporter.prototype._identifyChord = function(pianoKeys) {
        var chordData, chordName, filteredKeys, signature;
        if (_.size(pianoKeys) >= 4) {
          filteredKeys = this._rejectHigherDuplicatesOfLowerKeys(pianoKeys);
        } else {
          filteredKeys = pianoKeys;
        }
        signature = this._getIntervalSizesSignature(filteredKeys);
        chordData = ChordData[signature];
        if (chordData == null) {
          signature = this._findSignatureForClosedSpelling(filteredKeys);
        }
        if (signature != null) {
          chordName = this._getChordNameFromSignature(filteredKeys, signature);
        } else {
          chordName = Config.LABEL_FOR_UNRECOGNIZED_CHORDS;
        }
        return chordName;
      };

      KeyanoChordTypeReporter.prototype._getChordNameFromSignature = function(filteredKeys, signature) {
        var chordData, chordName, rootKey;
        chordData = ChordData[signature];
        rootKey = filteredKeys[chordData != null ? chordData.root : void 0];
        if (chordData != null) {
          chordName = "" + rootKey.name + " " + chordData.quality;
        } else {
          chordName = signature;
        }
        return chordName;
      };

      KeyanoChordTypeReporter.prototype._rejectHigherDuplicatesOfLowerKeys = function(pianoKeys) {
        var pianoKey, seenKeyNames, uniqueKeys, _i, _len;
        seenKeyNames = new Set();
        uniqueKeys = [];
        for (_i = 0, _len = pianoKeys.length; _i < _len; _i++) {
          pianoKey = pianoKeys[_i];
          if (seenKeyNames.has(pianoKey.name)) {
            continue;
          }
          seenKeyNames.add(pianoKey.name);
          uniqueKeys.push(pianoKey);
        }
        return uniqueKeys;
      };

      KeyanoChordTypeReporter.prototype._findSignatureForClosedSpelling = function(pianoKeys) {
        var chordData, filteredKeys, filteredKeysCopy, i, lowerKey, pianoKey, rootKey, signature, _i, _ref;
        filteredKeys = this._rejectHigherDuplicatesOfLowerKeys(pianoKeys);
        filteredKeysCopy = _.cloneDeep(filteredKeys);
        rootKey = filteredKeys[0];
        chordData = null;
        for (i = _i = _ref = filteredKeys.length - 1; _i >= 0; i = _i += -1) {
          pianoKey = filteredKeys[i];
          lowerKey = pianoKeyUtils.getSameKeyInNextLowestOctave(pianoKey);
          if (lowerKey == null) {
            break;
          }
          if (lowerKey.index < rootKey.index) {
            break;
          }
          filteredKeysCopy.splice(filteredKeys.length - 1);
          filteredKeysCopy.push(lowerKey);
          filteredKeysCopy.sort(function(a, b) {
            if (a.index < b.index) {
              return -1;
            }
            if (a.index > b.index) {
              return 1;
            }
            return 0;
          });
          signature = this._getIntervalSizesSignature(filteredKeysCopy);
          chordData = ChordData[signature];
          if (chordData != null) {
            break;
          }
        }
        if (chordData == null) {
          signature = null;
        }
        return signature;
      };

      KeyanoChordTypeReporter.prototype._getIntervalSizes = function(pianoKeys) {
        var currPianoKey, i, intervalSize, intervalSizes, lastPianoKey, _i, _ref;
        intervalSizes = [0];
        for (i = _i = 1, _ref = pianoKeys.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
          lastPianoKey = pianoKeys[i - 1];
          currPianoKey = pianoKeys[i];
          intervalSize = this._getIntervalSize(lastPianoKey, currPianoKey);
          intervalSizes.push(intervalSize);
        }
        return intervalSizes;
      };


      /*
      @params
        pianoKeyA, pianoKeyB : {
          id        : (string)
          frequency : (float)
          index     : (integer)
        }
      @return
        (integer) the size of the interval
       */

      KeyanoChordTypeReporter.prototype._getIntervalSize = function(pianoKeyA, pianoKeyB) {
        return Math.abs(pianoKeyB.index - pianoKeyA.index);
      };

      KeyanoChordTypeReporter.prototype._getIntervalSizesSignature = function(pianoKeys) {
        var intervalSizes, signature;
        intervalSizes = this._getIntervalSizes(pianoKeys);
        signature = intervalSizes.join('-');
        return signature;
      };

      return KeyanoChordTypeReporter;

    })(AbstractKeyanoListener);
    return KeyanoChordTypeReporter;
  });

}).call(this);

//# sourceMappingURL=KeyanoChordTypeReporter.js.map
