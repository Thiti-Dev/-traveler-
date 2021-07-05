export interface IResponseMapped<T = any> {
  success: boolean;

  //
  // ─── TOGETHER ───────────────────────────────────────────────────────────────────
  //
  message?: string;
  code?: string | number;
  // ────────────────────────────────────────────────────────────────────────────────

  data?: T;
}
