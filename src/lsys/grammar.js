const TIMEOUT_MS = 500;
const MAX_LENGTH = 100 * 1024 * 1024;

class Grammar {
  constructor(startingLiteral, transformations) {
    this.startingLiteral = startingLiteral;
    this.transformations = transformations;
    this.cache = {};
  }

  generate(iterations) {
    if (iterations in this.cache) {
      return this.cache[iterations];
    }

    let buffer = [];
    let data = { buffer, start: performance.now(), counter: 0 };
    for (let char of this.startingLiteral) {
      if (iterations <= 1) {
        buffer.push(char);
      } else {
        this._generateBuffer(char, iterations - 1, data);
      }
    }
    this.cache[iterations] = buffer;

    let time = performance.now() - data.start;
    console.log(`Grammar generation: Length ${buffer.length} in time ${time} ms.`);

    return buffer;
  }
  _generateBuffer(char, level, data) {
    if (data.counter++ % 1000 === 0) {
      let ms = performance.now() - data.start;
      if (ms > TIMEOUT_MS) throw new Error('Timeout generating grammar');
    }
    if (data.buffer.length > MAX_LENGTH) throw new Error('Result string exceeded limit');

    let trans = this.transformations[char];
    if (!trans) {
      data.buffer.push(char);
      return;
    }

    for (let trChar of trans) {
      if (level === 1) {
        data.buffer.push(trChar);
      } else {
        this._generateBuffer(trChar, level - 1, data);
      }
    }
  }

  /*
  Fancy but slow
  * generate1(iterations) {
    for (let char of this.startingLiteral) {
      for (let char2 of this._generate(char, iterations)) {
        yield char2;
      }
    }
  }

  * _generate(char, level) {
    let trans = this.transformations[char];
    if (!trans) {
      yield char;
      return;
    }

    for (let trChar of trans) {
      if (level === 1) {
        yield trChar;
      } else {
        yield* this._generate(trChar, level - 1);
      }
    }
  }*/


}

export default Grammar;
