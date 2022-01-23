Vue.component('coolBtn',{
	props:['name','type'],
	// template:`<input @click="defaultClick" :class="type" :value="name" type="button" style=\" color: #fff; \">`,
	template: `<input @click="defaultClick" :class="type" :value="name" type="button" style=\" backgroud:deepskyblue; \">`,
	methods:{
		defaultClick:function(){
			this.$emit('btn-click')
		}
	},
	created:function(){
		if(!this.type)
			this.type = 'primary'
	}
})