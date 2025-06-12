export type paramMapType = Record<
  string,
  {
    key: string;
    sqlKeyword: Query["sqlKeyword"];
  }
>;

/**
 * 统一解析分页查询搜索参数
 * @param param
 * @param paramMap
 * @returns
 */
export const getParams = (param: Record<string, any>, paramMap: paramMapType): Query[] => {
  const paramKey =
    Object.keys(paramMap)
      .map((key) => {
        if (!param[key]) return null;
        const { key: paramKey, sqlKeyword } = paramMap[key];
        return {
          key: paramKey,
          sqlKeyword,
          value: param[key],
        };
      })
      .filter((item) => item != null) || [];
  return paramKey;
};
