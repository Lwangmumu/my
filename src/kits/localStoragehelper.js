// 职责：负责结合加入购物车这个业务来操作localStorate的数据
// 1.0 定义一个全局key
const KEY ="buyGoods";

// 2.0 从localStorage中获取到数据
export function getItem() {
  var jsonString = localStorage.getItem(KEY);
  // 如果localStorage中没有这个key对应的数据则返回一个空对象
  if(!jsonString){
    return {};
  }
  // 如果有值，则将这个字符串转换成对象返回
  return JSON.parse(jsonString);
}

// 3.0设置localStorage中的数据
export function setItem(gobj) {
  // 1.0从localStorage中获取购买商品的对象
  var obj = getItem();
  // 2.0判断gobj.gid的值在obj中是否存在，如果存在将gobj.count的值叠加上去即可
  if(obj[gobj.gid]){
    obj[gobj.gid] = obj[gobj.gid] + gobj.count;
  }else{
    // 如果不存在，则动态向obj对象中添加一个商品的购买数量
    obj[gobj.gid]  = gobj.count;
  }
  console.log(obj);
  // 3.0将obj存在localStorage中
  localStorage.setItem(KEY,JSON.stringify(obj));
}