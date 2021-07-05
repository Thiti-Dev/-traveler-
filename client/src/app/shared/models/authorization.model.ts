export interface IAuthCredentials {
  username: string;
  password: string;
}

export interface ITokenSignature {
  username: string;
  _id: number;
  exp: number;
  iss: string;
}
