<template>
    <div>
        <div class="swiper">
            <el-carousel height="400px">
                <el-carousel-item v-for="item in srcData" :key="item.id">
                    <div>
                        <a :href="item.url" target="_blank"><img :src="item.picUrl"></a>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import {getItem} from '~/plugins/tool';
import {bus} from "~/plugins/bus";
export default {
    data() {
        return {
            srcData: [
                {
                    urlPic: ''
                },
                {
                    urlPic: ''
                },
                {
                    urlPic: ''
                }
            ],
        }
    },
    methods: {
        updateIndexData() {
            let indexData = getItem('indexData')
            if (indexData) {
                this.srcData = indexData.others[7] || this.srcData
            }
        }
    },
    mounted() {
        this.updateIndexData()
        bus.$on('updateIndexData', () => {
            this.updateIndexData()
        })
    }
}
</script>
