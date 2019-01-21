
import Vue from 'vue'
export default Vue.directive('lazyLoad', {
    inserted: function(el, binding) {
        el.addEventListener('scroll', function lazyScroll() {
             console.log('1');

            binding.value()
            el.removeEventListener('scroll', lazyScroll)
        })
    }
});
