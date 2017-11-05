import { expect } from 'chai'
import { propertiesExistInList, propertiesDontExistInList, typeOf } from '../support/util'

describe('Test utilities', () => {
  describe('Checking the response array', () => {
    const body = [
      {
        foo: 'bar',
        flat: 'iron',
      },
      {
        zoo: 'bar',
        flat: 'iron',
      },
    ]

    describe('for properties to exist', () => {
      it('should pass when all items have the property', () => {
        expect(propertiesExistInList(body, ['flat'])).to.be.true
      })

      it("should fail when an item doesn't have the property", () => {
        expect(propertiesExistInList(body, ['foo'])).to.be.false
      })

      it("should fail when another item doesn't have the property", () => {
        expect(propertiesExistInList(body, ['zoo'])).to.be.false
      })

      it('should fail when no item has the property', () => {
        expect(propertiesExistInList(body, ['kanada-ya'])).to.be.false
      })
    })

    describe('for properties not to exist', () => {
      it('should pass when all items have the property', () => {
        expect(propertiesDontExistInList(body, ['bao'])).to.be.true
      })

      it("should fail when an item doesn't have the property", () => {
        expect(propertiesDontExistInList(body, ['foo'])).to.be.false
      })

      it("should fail when another item doesn't have the property", () => {
        expect(propertiesDontExistInList(body, ['zoo'])).to.be.false
      })

      it('should fail when no item has the property', () => {
        expect(propertiesDontExistInList(body, ['kanada-ya'])).to.be.true
      })
    })
  })

  describe('Checking the type of objects', () => {
    it('should detect an array', () => {
      expect(typeOf([])).to.equal('array')
    })
    it('should detect an object', () => {
      expect(typeOf({})).to.equal('object')
    })
    it('should detect a string', () => {
      expect(typeOf('')).to.equal('string')
    })
    it('should detect a true', () => {
      expect(typeOf(true)).to.equal('boolean')
    })
    it('should detect a false', () => {
      expect(typeOf(false)).to.equal('boolean')
    })
    it('should detect a null', () => {
      expect(typeOf(null)).to.equal('null')
    })
    it('should detect an undefined', () => {
      expect(typeOf(undefined)).to.equal('undefined')
    })
  })
})
