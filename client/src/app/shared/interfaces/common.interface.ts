export interface IResponseMapped<T = any> {
  success: boolean;

  //
  // ─── TOGETHER ───────────────────────────────────────────────────────────────────
  //
  message?: string;
  code?:
    | 'Notfound'
    | 'ValidationError'
    | 'InternalError'
    | 'BadRequest'
    | 'CredentialNotValid';
  // ────────────────────────────────────────────────────────────────────────────────

  data?: T;
}
