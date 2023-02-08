import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    signup(){
        return 'hello signup'
    }

    signin(){
        return 'hello signin'

    }
}