// src/modules/auth/auth.controller.ts
import { Controller, Get } from "@nestjs/common";
import { ENDPOINT } from "@myorg/shared/endpoints";

const { path } = ENDPOINT.auth;

@Controller()
export class AuthController {}
