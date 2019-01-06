<template>
    <section class="g-rule">
        <Scroller height="300px">
            <ul>
                <li
                    v-for="i in 150"
                    :key="i"
                    class="displayFlex flexAlignItemsCenter flexJustifybetween"
                >
                    <span>潘晨凯潘晨凯你最帅</span>
                </li>
            </ul>
        </Scroller>
    </section>
</template>
<script>
import Scroller from '../common/scroller'
export default {
    components: {
        Scroller
    },
    data() {
        return {
            scrollTop: 0
        }
    },
    created() {

    },
    methods: {

    }
}
</script>