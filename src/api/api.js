
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

export default {
  add,
  select,
  compile,
  upload,
  login
}