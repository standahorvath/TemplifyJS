import {describe, expect, test} from '@jest/globals'
import {absoluteUrl} from '../../src/Constants/Regex'

describe('Absolute url Regex', () => {
    test('absoluteUrl matches absolute url', () => {
        expect(absoluteUrl.test('https://github.githubassets.com/assets/wp-runtime-fc4889327711.js?v=1.1')).toBe(true)
    })
    test('absoluteUrl does not match relative url', () => {
        expect(absoluteUrl.test('/assets/wp-runtime-fc4889327711.js?v=1.1')).toBe(false)
    })
    test('absoluteUrl does not match invalid url', () => {
        expect(absoluteUrl.test('https:/github.githubassets.com')).toBe(false)
    })
    test('absoluteUrl match case insenstitive', () => {
        expect(absoluteUrl.test('HTTPs://github.GIThubassets.com/')).toBe(true)
    })
    test('absoluteUrl match in middle of code', () => {
        expect(absoluteUrl.test('<script crossorigin="anonymous" defer="defer" type="application/javascript" src="https://github.githubassets.com/"></script>')).toBe(true)
    })
})
