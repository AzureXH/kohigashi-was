# 覆盖数组方法
对数组原型的一些方法进行重写，目的是在数组修改时，可以更新依赖
```javascript
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);

  var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];

  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // notify change
      ob.dep.notify();
      return result
    });
  });


```

# reactiveSetter中的NaN特判
- 如果newVal和value都是NaN，那么newVal === value为false
- 所以加了(newVal !== newVal && value !== value)，为了处理NaN
- [#4236](https://github.com/vuejs/vue/issues/4236)
```javascript
function reactiveSetter (newVal) {
  var value = getter ? getter.call(obj) : val;
  /* eslint-disable no-self-compare */
  if (newVal === value || (newVal !== newVal && value !== value)) {
    return
  }
  ......
}
```