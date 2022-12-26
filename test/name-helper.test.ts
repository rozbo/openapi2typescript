import {getTypeLastName} from '../src/name-helper'

test('getTypeLastName', () => {
    expect(getTypeLastName('System.Collections.Generic.IEnumerable'))
        .toBe('IEnumerable');
})