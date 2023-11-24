<script>

export default {
    components: {
    },

    data(){
        return {
            scale: '',
        }
    },
}
</script>

<template>
    计算spi
    <div>
        数据尺度
        <input type="radio" value="day" name="time"/>日
        <input type="radio" value="month" name="time"/>月
    </div>

    <div>
        运算尺度
        <input type="text" v-model="scale"/>
        <input type="radio" value="day" name="scale"/>日
        <input type="radio" value="month" name="scale"/>月
    </div>

    <div>
        校准数据
        <input type="date" name="startTime" value=""/>
        <input type="date" name="endTime" value=""/>
    </div>
</template>