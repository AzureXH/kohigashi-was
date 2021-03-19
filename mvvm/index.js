var data = { name: 'John' }
observe(data)
data.name = 'kkk'
console.log(data.name);

function observe(target) {
  if (!target || typeof target !== 'object') {
    return
  }

  Object.keys(target).forEach((key) => {
    defineReactive(target, key, target[key])
  })
}

function defineReactive(target, key, value) {
  observe(value)   //递归观察子属性
  let dep = new Dep()
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set: function (newValue) {
      if (newValue === value || newValue !== newValue && value !== value) {
        return
      }
      console.log("改变",newValue)
      dep.notify()
      value = newValue
    }
  })
}

function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify:function () {
    this.subs.forEach((sub)=>{
      sub.update()
    })
  }
}

Dep.target = null

function Watcher() {
  this.get()
}

Watcher.prototype = {
  get:function (key) {
    Dep.target = this;
    this.value = key
    Dep.target = null
  }
}

let watcher = new Watcher()