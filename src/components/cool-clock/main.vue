<template>
    <div id="clock">
        <p class="date">{{ date }}</p>
        <p class="time">{{ time }}</p>
    </div>
</template>

<script>
export default {
    name: "coolClock",
    data() {
        return {
            time: '',
            date: '',
            week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            timerID : ''
        }
    },
    mounted() {
        this.timerID = setInterval(this.updateTime, 1000)
        this.updateTime()
    },
    methods: {
        updateTime() {
            var cd = new Date();
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
            this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()]
        },
        zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit)
        }
    },
    beforeDestroy() {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = null;
        }
    }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
  line-height: 1.2;
}

#clock {
    width: 100%;
    height: 60px;
    padding-top: 10px;
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    position: relative;
    color: #63a0b3;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
#clock .time {
    letter-spacing: 0.05em;
    font-size: 24px;
    padding: 5px 0;
}
#clock .date {
    letter-spacing: 0.1em;
    font-size: 18px;
}
</style>