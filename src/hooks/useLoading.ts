import { useState } from "react";

/**
 * 使用loading状态 的hook
 * @param fun 需要执行的异步函数
 * @returns
 */
const useLoading = <T>(fun: (...args:any[]) => Promise<T>) => {
  const [loading, setLoading] = useState(false);
  const handle = async (...args:any[]) => {
    try {
      setLoading(true);
      return await fun(...args);
    } catch (e) {
      Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };

  return [loading, handle ] as [boolean, (...args:any[]) => Promise<T>];
};
export default useLoading;
