
export default Vue.directive('scroll', {
    inserted: function (el, binding) {
        el.addEventListener('click', function (event) {
            event.stopPropagation();
            // var sTop = document.getElementById("touchFixed");
            // var sVal = document.getElementById(binding.value);
            // sTop.scrollTop = sVal.offsetTop;
        }, true);
    }
})