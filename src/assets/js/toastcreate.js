import toastComponent from '../../components/common/toast.vue'

//使用vue的extend，以vue文件为基础组件，返回一个可以创建vue组件的特殊构造函数
const ToastConstructor = Vue.extend(toastComponent)


function showToast(text, duration = 2000) {
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                show: true
            }
        }
    })
    //在body中动态创建一个div元素，后面自动会把它替换成整个vue文件内的内容
    document.body.appendChild(toastDom.$el)
    setTimeout(() => {
        toastDom.show = false
    }, duration)
}

function registryToast() {
    //把showToast这个方法添加到uve的原型中，可以直接调用，当调用的时候就是执行函数内的内容
    Vue.prototype.$toast = showToast
}

export default registryToast