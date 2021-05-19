

'use strict';
process.env.SECRET = 'teo';
const server = require('../../../src/server').server;

const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
let id;
describe('Testing server', () => {

  it('should send a 404 error when no food is found', async () => {
    const response = await request.get('/error');
    expect(response.status).toEqual(404);
  });


  it('Create a Food record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.post('/api/v2/food/').set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 'patata',
      calories: '20',
      type: 'VEGETABLE',
    });
 
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('patata');
    id = response.body._id;
  });
 
  it('Update a Food record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.put(`/api/v2/food/${id}`).set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 'checkin',
      calories: '20',
      type: 'PROTIEN',
    });
   
    expect(response.status).toEqual(200);
    expect(response.body.calories).toEqual(20);
  });

  it('Read a Food record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get(`/api/v2/food/${id}`).set('Authorization', `Bearer ${response1.body.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('checkin');
    expect(response.body.type).toEqual('PROTIEN');
  });
 
  it('Read all Food record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get('/api/v2/food/').set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('checkin');
    expect(response.body[0].type).toEqual('PROTIEN');
  });
 
  it('Delete a Food record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.delete(`/api/v2/food/${id}`).set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
  });

  it('Create a Clothes record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.post('/api/v2/clothes/').set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 'pants',
      color: 'black',
      size: '31',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('pants');
    expect(response.body.size).toEqual('31');
    id = response.body._id;
  });
 
  it('Update a Clothes record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.put(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 'pants',
      color: 'blue',
      size: '31',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('pants');
    expect(response.body.size).toEqual('31');
  });

  it('Read a Clothes record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('pants');
    expect(response.body.size).toEqual('31');
  });

  it('Read all Clothes record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get('/api/v2/clothes/').set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('pants');
    expect(response.body[0].size).toEqual('31');
  });
 
  it('Delete a Clothes record', async () => {
    let obj = { username: 'admin', password: '1234', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.delete(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
  });
});