/// <reference types="fastify-secure-session" />
import { FastifyRequest } from 'fastify'
import { SerializeFunction } from '../Authenticator'
import { SessionManager } from './SessionManager'

/** Class for storing passport data in the session using `fastify-secure-session` */
export class SecureSessionManager implements SessionManager {
  key: string
  serializeUser: SerializeFunction

  constructor(options: SerializeFunction | any, serializeUser?: SerializeFunction) {
    if (typeof options === 'function') {
      serializeUser = options
      options = undefined
    }
    options = options || {}

    this.key = options.key || 'passport'
    this.serializeUser = serializeUser!
  }

  async logIn(request: FastifyRequest, user: any) {
    const object = await this.serializeUser(user, request)
    request.session.set(this.key, object)
  }

  async logOut(request: FastifyRequest) {
    request.session.set(this.key, undefined)
  }

  getUserFromSession(request: FastifyRequest) {
    return request.session.get(this.key)
  }
}
