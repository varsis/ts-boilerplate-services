import { expect } from 'chai'
import sinon from 'sinon'
import requiredEnvVarsAreMissing from './assert'

describe('Configuration', () => {
  const log: any = {
    error: () => {},
    warn: () => {},
  }

  describe('Required environment variables', () => {
    const config: any = {
      yay: 'yay',
      zero: 0,
      null: null,
      empty: '',
      undef: undefined,
    }

    it('should pass when there are no required environment variables', () => {
      expect(requiredEnvVarsAreMissing(config, [], log)).to.be.false
    })

    it('should pass when all required environment variables are found', () => {
      expect(requiredEnvVarsAreMissing(config, ['yay'], log)).to.be.false
    })

    it('should pass when a required environment variable is 0', () => {
      expect(requiredEnvVarsAreMissing(config, ['zero'], log)).to.be.false
    })

    it('should fail when a required environment variable is null', () => {
      expect(requiredEnvVarsAreMissing(config, ['nay'], log)).to.be.true
    })

    it('should fail when a required environment variable is empty string', () => {
      expect(requiredEnvVarsAreMissing(config, ['empty'], log)).to.be.true
    })

    it('should fail when a required environment variable is undefined', () => {
      expect(requiredEnvVarsAreMissing(config, ['undef'], log)).to.be.true
    })
  })

})
