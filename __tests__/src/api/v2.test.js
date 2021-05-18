'use strict';

const supergoose =require('@code-fellows/supergoose');
require('dotenv').config();
const server=require('../../../src/server').server;
const Users = require('../../../src/auth/models/users.js');
const jwt = require('jsonwebtoken');
const  request = supergoose(server);

let users = {admin: { username: 'admin', password: '1234',role:'admin' }};

beforeAll(async (done)=>{
  await new Users(users.admin).save();
  
  done();
});

const user1={username:'admin'};
const token = jwt.sign(user1,process.env.SECRET);
let id;
console.log(token);
describe('test api/v2/food',()=>{
  it(' POST /food', async () => {
    const response = await request.post('/api/v2/food').send({name:'patata',calories: 10,type:'VEGETABLE'}).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('patata');
    id = response.body._id;
  });
  it('handle Get All food',async()=>{
    const res = await request.get('/api/v2/food').set('Authorization',`Bearer ${token}`);
    expect(res.status).toEqual(200);
  });
  it('handle Get',async()=>{
    const res = await request.get(`/api/v2/food/${id}`).set('Authorization',`Bearer ${token}`);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('patata');
  });
  it('handle put',async()=>{
    const res = await request.put(`/api/v2/food/${id}`).send({name:'patata',calories:3,type:'VEGETABLE'}).set('Authorization', `Bearer ${token}`);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('patata');
  });
  it('handle delete',async()=>{
    const res = await request.put(`/api/v2/food/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toEqual(200);
  });
});


// 'use strict';
// process.env.SECRET = 'teo';
// const server = require('../../../src/server').server;
// // const models = require('../src/auth/v1').models;
// const supergoose = require('@code-fellows/supergoose');
// const request = supergoose(server);
// let id;
// describe('Testing server', () => {
//   it('should send 404 error on a bad route', async () => {
//     const response = await request.get('/wrongroute');
//     expect(response.status).toEqual(404);
//   });
//   it('should send a 404 error when no food is found', async () => {
//     const response = await request.get('/error');
//     expect(response.status).toEqual(404);
//   });
//   it('Create a Food record', async () => {
//     let obj = { username: 'admin', password: 'password', role: 'admin' };
//     const response2 = await request.post('/signup').send(obj);
//     const response1 = await request.post('/signin')
//       .auth(obj.username, obj.password);
//     const userObject = response1.body;
//     const response = await request.post('/api/v2/food/').set('Authorization', `Bearer ${response1.body.token}`).send({
//       name: 'fish',
//       calories: '20',
//       type: 'PROTIEN',
//     });
//     // const response = await request.post('/api/v2/food/').send({
//     //     name: "fish",
//     //     calories: "20",
//     //     type: "PROTIEN"
//     // })
//     expect(response.status).toEqual(201);
//     expect(response.body.type).toEqual('PROTIEN');
//     id = response.body._id;
//   });
//   // Update a record 
//   it('Update a Food record', async () => {
//     const response = await request.put(`/api/v2/food/${id}`).send({
//       name: 'Salmofish',
//       calories: '20',
//       type: 'PROTIEN',
//     });
//     expect(response.status).toEqual(200);
//     expect(response.body.type).toEqual('PROTIEN');
//   });
//   // Read a record
//   it('Read a Food record', async () => {
//     const response = await request.get(`/api/v2/food/${id}`);
//     expect(response.status).toEqual(200);
//     expect(response.body.name).toEqual('Salmofish');
//     expect(response.body.type).toEqual('PROTIEN');
//   });
//   // Read all Records
//   it('Read all Food record', async () => {
//     const response = await request.get('/api/v2/food/');
//     expect(response.status).toEqual(200);
//     expect(response.body[0].name).toEqual('Salmofish');
//     expect(response.body[0].type).toEqual('PROTIEN');
//   });
//   // Delete a record
//   it('Delete a Food record', async () => {
//     const response = await request.delete(`/api/v2/food/${id}`);
//     expect(response.status).toEqual(200);
//   });
//   ///////////////////////////////////////////////////////////////////////
//   it('Create a Clothes record', async () => {
//     const response = await request.post('/api/v2/clothes/').send({
//       name: 'highwaistJeans',
//       color: 'blue',
//       size: 'WomenClothing',
//     });
//     expect(response.status).toEqual(201);
//     expect(response.body.name).toEqual('highwaistJeans');
//     expect(response.body.size).toEqual('WomenClothing');
//     id = response.body._id;
//   });
//   // Update a record 
//   it('Update a Clothes record', async () => {
//     const response = await request.put(`/api/v2/clothes/${id}`).send({
//       name: 'highwaistJeans',
//       color: 'blue',
//       size: 'WomenClothing',
//     });
//     expect(response.status).toEqual(200);
//     expect(response.body.name).toEqual('highwaistJeans');
//     expect(response.body.size).toEqual('WomenClothing');
//   });
//   // Read a record
//   it('Read a Clothes record', async () => {
//     const response = await request.get(`/api/v2/clothes/${id}`);
//     expect(response.status).toEqual(200);
//     expect(response.body.name).toEqual('highwaistJeans');
//     expect(response.body.size).toEqual('WomenClothing');
//   });
//   // Read all Records
//   it('Read all Clothes record', async () => {
//     const response = await request.get('/api/v2/clothes/');
//     expect(response.status).toEqual(200);
//     expect(response.body[0].name).toEqual('highwaistJeans');
//     expect(response.body[0].size).toEqual('WomenClothing');
//   });
//   // Delete a record
//   it('Delete a Clothes record', async () => {
//     const response = await request.delete(`/api/v2/clothes/${id}`);
//     expect(response.status).toEqual(403);
//   });
// });





