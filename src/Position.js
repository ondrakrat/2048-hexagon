/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
export default class Position {

    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    get row() {
        return this._row;
    }

    set row(row) {
        this._row = row;
    }

    get column() {
        return this._column;
    }

    set column(column) {
        this._column = column
    }
}