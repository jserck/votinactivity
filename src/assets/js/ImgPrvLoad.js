export default Vue.directive('preload', {
    inserted: function(el, binding) {
        el.style.background = 'red';
        let img = document.createElement('img');
        img.style.display = 'none';
        img.onload = function() {
            el.style.backgroundImage = 'url(' + binding.value + ')';
            document.body.removeChild(img);
        }
        document.body.appendChild(img);
        img.src = binding.value;
    }
});