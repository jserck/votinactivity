import Vue from 'vue'
export default Vue.directive('scroll', {
    inserted: function(el, binding) {
        el.addEventListener('click', function(event) {
            event.stopPropagation();
            console.log(binding.value);
            let elOffsetTop = document.getElementById(binding.value).offsetTop
            if (document.documentElement.scrollTop) {
                document.documentElement.scrollTop = elOffsetTop
            } else {
                document.body.scrollTop = elOffsetTop
            }
        }, true);
    }
})