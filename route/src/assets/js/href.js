
import Vue from 'vue'
export default Vue.directive('scroll', {
    "inserted": function (el, binding) {
        el.addEventListener('click', function (event) {
            //   event.stopPropagation();
            // document.documentElement.scrollTop = 1
            //   var sTop = document.getElementById("touchFixed");
            //   var sVal = document.getElementById(binding.value);
            //   sTop.scrollTop = sVal.offsetTop;
            setTimeout(() => {
                let elOffsetTop = document.getElementById(binding.value).offsetTop
                document.body.scrollTop = elOffsetTop
                document.documentElement.scrollTop = elOffsetTop
            }, 200)
        }, true);
    },

})