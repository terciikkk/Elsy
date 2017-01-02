
class V {
    constructor(x,y) {
        this._x = x;
        this._y = y;
        this._size = null;
    }

    get x() { return this._x; }
    get y() { return this._y; }

    get size() {
        if (this._size === null) {
            this._size = Math.sqrt(this._x*this._x + this._y*this._y);
        }
        return this._size;
    }

    scalar(other) {
        return this._x * other._x + this._y * other._y;
    }
    scalarInv(other) {
        return this._x * -other._y + this._y * other._x;
    }

    add(other) {
        return new V(this._x + other._x, this._y + other._y);
    }

    subs(other) {
        return this.add(other.negate());
    }

    negate() {
        return new V(-this._x,-this._y);
    }

    angle(other, signed) {
        let sc = this.scalar(other);
        let angle = Math.acos(sc / (this.size * other.size)) / Math.PI * 180;
        if (signed === true && this.scalarInv(other) < 0) {
            angle *= -1;
        }
        return angle;
    }

    mult(num) {
        return new V(this._x * num, this._y * num);
    }

    toString() {
        return '[' + Math.round(this._x * 100) / 100 + ';' + Math.round(this._y * 100) / 100 + ']';
    }
    norm() {
        return this.mult(1.0 / this.size);
    }
    rotate(deg) {
        let rad = deg / 180 * Math.PI;
        let x = this._x * Math.cos(rad) - this._y * Math.sin(rad);
        let y = this._x * Math.sin(rad) + this._y * Math.cos(rad);
        return new V(x,y);
    }
    dist(other) {
        return this.subs(other).size;
    }

    static fromAngle(angle) {
        return new V(Math.cos(angle / 180 * Math.PI), Math.sin(angle / 180 * Math.PI));
    }
}

export default V;
