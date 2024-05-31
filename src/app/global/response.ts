import { Response } from "express";

export type Tmeta = {
  total: number;
  page: number;
  limit: number;
};

type TReponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  meta?: Tmeta;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: TReponse<T>): void => {
  const responseData: TReponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
