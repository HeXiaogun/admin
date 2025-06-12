/// <reference types="vite/client" />
/// <reference types="../types.d.ts" />

interface PageResult<T> {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  dataSource: T[];
}

interface ResponseData<T = any> {
  code: number;
  msg: string;
  data: T;
}

interface Query {
  key: string;
  value: any;
  sqlKeyword: "EQ" | "LIKE" | "GT" | "LT" | "GTE" | "LTE" | "BETWEEN";
}

interface CoversVo {
  heightSize?: number;
  url?: string;
  widthSize?: number;
}

interface ImageInfo {
  id: string;
  heightSize: number;
  url: string;
  widthSize: number;
}
