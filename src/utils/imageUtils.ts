const getImageURL = () => {};

/**
 * 根据图片地址获取图片的宽高
 * @param url 图片地址
 */
export const getImageWidthAndHeight = (
  url: string
): Promise<{ widthSize: number; heightSize: number; url: string }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = getImageURL(url);
    img.onload = () => {
      resolve({
        widthSize: img.width,
        heightSize: img.height,
        url: url,
      });
    };
  });
};
