import { isArray } from 'lodash';

// 过滤掉对象值为 undefined 和 空字符串 和 空数组 的属性
export function filterNullValueObject(obj: any) {
  const result: any = {};
  if (obj && Object.keys(obj).length >= 1) {
    Object.keys(obj).forEach(key => {
      if (key && obj[key] !== undefined && obj[key] !== '' && obj[key] !== null) {
        // 如果查询的条件不为空
        if (isArray(obj[key]) && obj[key].length === 0) {
          return;
        }
        result[key] = obj[key];
      }
    });
  }
  return result; // 返回查询条件
}

// 商品销量简化处理
export function simplifySales(sales: number) {
  if (sales >= 10000) {
    return `${Math.floor(sales / 10000)}万`;
  }
  return sales;
}
