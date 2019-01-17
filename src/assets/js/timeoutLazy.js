import Vue from 'vue'
export default Vue.directive('timeoutLazy', {
    inserted: function(el, binding) {
        let img = document.createElement('img');
        img.style.display = 'none';
        img.onload = function() {
            console.log('加载完了');
            el.style.backgroundUrl = binding.value;
            document.body.removeChild(img);
        }
        img.src = binding.value;
        document.body.appendChild(img);
    }
});