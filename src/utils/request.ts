import { MD5 } from 'crypto-js';
import { filterNullValueObject } from './common';

/**
 * 大淘客验签
 */
const makeSign = () => {
  const appKey = import.meta.env.VITE_APP_KEY; // 应用分配的appKey
  const appSecret = import.meta.env.VITE_APP_SECRET; //应用的Secret

  // 生成6位随机数
  const sixDigitsRandom = () => {
    let number = '';
    for (let i = 0; i < 6; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  };
  // 6位随机数
  const nonce = sixDigitsRandom();
  // 毫秒级时间戳
  const timer = new Date().getTime();
  // 拼接成字符串：appKey=xxx&timer=xxx&nonce=xxx&key=xxx （key对应appsecret）进行md5加密并将加密结果转成大写
  const signRan = MD5(`appKey=${appKey}&timer=${timer}&nonce=${nonce}&key=${appSecret}`)
    .toString()
    .toUpperCase();
  return [nonce, timer, signRan];
};

const request = (requestOptions: UniApp.RequestOptions) => {
  return new Promise(async (resolve, reject) => {
    const [nonce, timer, signRan] = makeSign();

    const extraData = {
      appKey: import.meta.env.VITE_APP_KEY, // 应用分配的appKey
      nonce,
      timer,
      signRan,
    };

    requestOptions.data = {
      ...extraData,
      ...(filterNullValueObject(requestOptions.data as object) || {}),
    };

    requestOptions.url = requestOptions.url.startsWith('http')
      ? requestOptions.url
      : `${import.meta.env.VITE_BASE_URL}${requestOptions.url}`;

    try {
      const res: any = await uni.request(requestOptions);

      if (res.statusCode === 200 && res.data) {
        resolve(res.data);
      } else {
        reject(res.msg);
      }
    } catch (err) {
      console.warn('err', err);
      reject(err);
    }
  });
};

export default request;
