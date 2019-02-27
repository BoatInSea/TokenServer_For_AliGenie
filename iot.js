import {IOT} from 'waliyun';

(async() => {
  const iot = IOT({
    Api:'https://iot.cn-shanghai.aliyuncs.com/',//可不填，默认为https://iot.aliyuncs.com/
    AccessKeyId: 'xxxx',
    AccessKeySecret: 'xxxxx',
    Version: '2016-05-30'
  });
  const data = await iot.pub({
    ProductKey: 'a1G5IkMg9sH',
    SubCallback: 'http://xxxx:xxx/',
    'Topic': '/ProductKey/Topic'
  });
  console.log(data);
})();

