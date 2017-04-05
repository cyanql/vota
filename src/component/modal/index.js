import Vue from 'vue'
import Modal from './modal'


function createVM() {
	const div = document.createElement('div')
	div.id = 'modal-container'
	document.body.append(div)
	const Component = Vue.extend(Modal)
	return new Component().$mount('#modal-container')
}

let vm
export default {
    toast(params) {
        vm = vm || createVM()
        vm.toast(params)
    },
    spin(params) {
        vm = vm || createVM()
        vm.spin(params)
    },
    progress(params) {
        vm = vm || createVM()
        vm.progress(params)
    }
}
