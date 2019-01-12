export default Vue.directive('scroll', {
    inserted: function(el, binding) {
        el.addEventListener('click', function(event) {
            event.stopPropagation();
            //   var sTop = document.getElementById("touchFixed");
            //   var sVal = document.getElementById(binding.value);
            //   sTop.scrollTop = sVal.offsetTop;
            let elOffsetTop = document.getElementById(binding.value).offsetTop
            if (document.documentElement.scrollTop) {
                document.documentElement.scrollTop = elOffsetTop
            } else {
                document.body.scrollTop = elOffsetTop
            }
        }, true);
    }
})