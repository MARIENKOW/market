// auth/actor.type.ts
export type AuthType = 'user';
//  | 'admin' | 'partner';

export type Actor = { type: 'user'; user: User; sessionId: string };
//   | { type: 'admin'; admin: Admin; sessionId: string }
//   | { type: 'partner'; partner: Partner; sessionId: string };
