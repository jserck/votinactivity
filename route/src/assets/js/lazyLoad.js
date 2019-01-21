
import Vue from 'vue'
export default Vue.directive('lazyLoad', {
    inserted: function(el, binding) {
        el.addEventListener('scroll', function lazyScroll() {
            binding.value()
            el.removeEventListener('scroll', lazyScroll)
        })
    }
});
