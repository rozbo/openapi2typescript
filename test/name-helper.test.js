"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name_helper_1 = require("../src/name-helper");
test('getTypeLastName', () => {
    expect((0, name_helper_1.getTypeLastName)('System.Collections.Generic.IEnumerable'))
        .toBe('IEnumerable');
});
