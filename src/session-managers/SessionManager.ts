import { FastifyRequest } from 'fastify'

export interface SessionManager {
  logIn(request: FastifyRequest, user: any): Promise<void>

  logOut(request: FastifyRequest): Promise<void>

  getUserFromSession(request: FastifyRequest): any
}
