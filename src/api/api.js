
import axios from 'axios'
import moment from 'moment-timezone'
var MockAdapter = require('axios-mock-adapter');
var mock = new MockAdapter(axios);

mock.onPost('/api/add').reply(200,{
    "message" : "success"
})

mock.onGet('/api/select').reply(200,{
	data : [
		{
			id : 1,
			name : "几乎每个",
			num : 200,
			sell : 100,
			price : 1000,
			description : "测试",
			time : "2018-07-10",
			updatetime : "2018-11-02"
		},
		{
			id : 12,
			name : "几乎每个",
			num : 2500,
			sell : 100,
			price : 2000,
			description : "测试",
			time : "2018-07-10",
			updatetime : "2018-11-02"
		},
		{
			id : 13,
			name : "几乎每个",
			num : 2400,
			sell : 100,
			price : 3000,
			description : "测试",
			time : "2018-07-10",
			updatetime : "2018-11-02"
		}
	]
})

mock.onPost('/api/upload').reply(200,{
    "message" : "success"
})


mock.onGet('/api/select/1').reply(200,{
	data : [
		{
			id : 1,
			name : "几乎每个",
			num : 200,
			sell : 100,
			price : 1000,
			description : "测试",
			time : "2018-07-10",
			updatetime : "2018-11-02"
		}
	]
})
mock.onGet('/api/select/12').reply(200,{
	data : [
		{
			id : 12,
			name : "几乎每个",
			num : 2500,
			sell : 100,
			price : 2000,
			description : "测试",
			time : "2018-07-10",
			updatetime : "2018-11-02"
		}
	]
})
mock.onGet('/api/select/13').reply(200,{
	data : [
		{
			id : 13,
			name : "几乎每个",
			num : 2400,
			sell : 100,
			price : 3000,
			description : "测试",
			time : "2018-07-10",
			updatetime : "2018-11-02"
		}
	]
})

mock.onPost('/api/login').reply(200,{
	'message' : 'success'
})

mock.onGet('/api/selectgoods').reply(200,{
	data : [
		{
			brand: "大众",
			location: "中国上海 ",
			merchantId: "1",
			name: "V6发动机",
			partsId: 0,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png", "src/pages/Buy/components/BrandDisplay/img/bg-index.png", "src/pages/Buy/components/BrandDisplay/img/jsta.png"],
			price: "11.1",
			stock: 3000,
			surplusstock: 2781,
		},{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 1,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		},{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 2,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		},{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 3,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		},{
			brand: "大众",
			location: "中国上海 ",
			merchantId: "1",
			name: "V6发动机",
			partsId: 4,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "11.1",
			stock: 3000,
			surplusstock: 2781
		},{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 5,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		},{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 6,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		},{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 7,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		}
	]
})


mock.onGet('/api/selectgoods/0').reply(200,{
	data : [
		{
			brand: "大众",
			location: "中国上海 ",
			merchantId: "1",
			name: "V6发动机",
			partsId: 0,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png", "src/pages/Buy/components/BrandDisplay/img/bg-index.jpg", "src/pages/Buy/components/BrandDisplay/img/jsta.png"],
			price: "11.1",
			stock: 3000,
			surplusstock: 2781,
		}
	]
})
mock.onGet('/api/selectgoods/1').reply(200,{
	data : [
		{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 1,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		}
	]
})
mock.onGet('/api/selectgoods/2').reply(200,{
	data : [
		{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 2,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		}
	]
})
mock.onGet('/api/selectgoods/3').reply(200,{
	data : [
		{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 3,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		}
	]
})

mock.onGet('/api/selectgoods/4').reply(200,{
	data : [
		{
			brand: "大众",
			location: "中国上海 ",
			merchantId: "1",
			name: "V6发动机",
			partsId: 4,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "11.1",
			stock: 3000,
			surplusstock: 2781
		}
	]
})

mock.onGet('/api/selectgoods/5').reply(200,{
	data : [
		{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 5,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		}
	]
})
mock.onGet('/api/selectgoods/6').reply(200,{
	data : [
		{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 6,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		}
	]
})
mock.onGet('/api/selectgoods/7').reply(200,{
	data : [
		{
			brand: "卡迪拉克",
			location: "美国",
			merchantId: "3",
			name: "V8发动机",
			partsId: 7,
			picture: ["src/pages/Buy/components/BrandDisplay/img/logo.png"],
			price: "22.2",
			stock: 4000,
			surplusstock: 991
		}
	]
})

const add = (value) =>{
  return axios.post(`/api/add`)
    .then(resp => {
      return resp.data
    }).catch(error => {
      console.error(error)
    })
}

const upload = (value) =>{
  return axios.post(`/api/upload`)
    .then(resp => {
      return resp.data
    }).catch(error => {
      console.error(error)
    })
}

const select = () =>{
	return axios.get(`/api/select`)
    .then(resp => {
      return resp.data
    }).catch(error => {
      console.error(error)
    })
}

const compile = (id) =>{
	let url = "/api/select/"+id;
	return axios.get(url)
	.then(resp => {
		return resp.data.data[0]
	}).catch(error => {
		console.error(error)
	})
}

const login = (value) => {
	return axios.post(`/api/login`)
	.then(resp => {
		return resp.data;
	}).catch(error => {
		console.error(error)
	})
}

const selectgoods = () =>{
	return axios.get(`/api/selectgoods`)
    .then(resp => {
      return resp.data
    }).catch(error => {
      console.error(error)
    })
}

const detail = (id) =>{
	let url = "/api/selectgoods/"+id;
	return axios.get(url)
	.then(resp => {
		return resp.data.data[0]
	}).catch(error => {
		console.error(error)
	})
}

const buy = (value) => {
	console.log(value)
	return axios.get('/api/add')
	.then(resp => {
		return resp.data
	}).catch(error => {
		console.error(error)
	})
}


export default {
  add,
  select,
  compile,
  upload,
  login,
  selectgoods,
  detail,
  buy
}