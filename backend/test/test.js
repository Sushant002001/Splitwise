// /* eslint-disable no-undef */
// const chai = require('chai');
// const chaiHttp = require('chai-http');

// chai.use(chaiHttp);
// const apiHost = 'http://localhost';
// const apiPort = '3001';
// const apiUrl = `${apiHost}:${apiPort}`;

// const { expect } = chai;

// // it('GET Test server status', (done) => {
// //   chai
// //     .request(apiUrl)
// //     .get('/api/ping')
// //     .send()
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('Pong');
// //       done();
// //     });
// // });

// // it('POST Create User 1', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/signup')
// //     .send({
// //       email_id: 'mocha1@gmail.com', password: 'mochates1', username: 'Mocha Test 1',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       // expect(res.body).to.equal('NEW_USER_CREATED');
// //       done();
// //     });
// // });

// // it('POST Create User 2', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/signup')
// //     .send({
// //       email: 'mocha22_test@gmail.com', password: 'mochatest2', name: 'Mocha Test 2',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('NEW_USER_CREATED');
// //       done();
// //     });
// // });

// // it('POST Create User 3', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/signup')
// //     .send({
// //       email: 'mocha33_test@gmail.com',
// //       password: 'mochatest3',
// //       name: 'Mocha Test 3',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('NEW_USER_CREATED');
// //       done();
// //     });
// // });

// // it('POST Create User 44', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/signup')
// //     .send({
// //       email: 'mocha44_test@gmail.com',
// //       password: 'mochatest4',
// //       name: 'Mocha Test 4',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('NEW_USER_CREATED');
// //       done();
// //     });
// // });

// // it('PUT Update profile User 1', (done) => {
// //   chai.request(apiUrl)
// //     .put('/api/profile')
// //     .send({
// //       user_id: '13',
// //       username: 'Macho Mocha',
// //       email_id: 'mocha11@test.com',
// //       phone: '+1239874560',
// //       currency: 'GBP',
// //       language: 'French',
// //       timezone: 'Asia/Calcutta',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       // expect(res.body.message).to.equal("CHANGES UPDATED");
// //       done();
// //     });
// // });


// // it('POST Create group', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/createGroup')
// //     .send({
// //       user_id: '1',
// //       groupName: 'Mocha Test Group',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('GROUP_CREATED');
// //       done();
// //     });
// // });

// // it('POST Invite Member 2', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/inviteMember')
// //     .send({
// //       invitationEmail: 'mocha22_test@gmail.com',
// //       groupName: 'Mocha Test Group',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('MEMBER_INVITED');
// //       done();
// //     });
// // });

// // it('POST Invite Member 3', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/inviteMember')
// //     .send({
// //       invitationEmail: 'mocha33_test@gmail.com',
// //       groupName: 'Mocha Test Group',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('MEMBER_INVITED');
// //       done();
// //     });
// // });

// // it('POST Invite Member 4', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/inviteMember')
// //     .send({
// //       invitationEmail: 'mocha44_test@gmail.com',
// //       groupName: 'Mocha Test Group',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('MEMBER_INVITED');
// //       done();
// //     });
// // });

// // it('GET Check Users', (done) => {
// //   chai.request(apiUrl)
// //     .get('/api/nameandemails/2')
// //     .send()
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       // expect(res.body.message).to.equal('INVITE_ACCEPTED');
// //       done();
// //     });
// // });

// // it('POST Accept Invite', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/acceptinvite')
// //     .send({
// //       user_id: 16,
// //       groupname: 'Rent',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       done();
// //     });
// // });

// it('POST Reject Invite ', (done) => {
//   chai.request(apiUrl)
//     .post('/api/rejectinvite')
//     .send({
//       user_id: 15,
//       group_name: 'Grocery',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       done();
//     });
// });

// // it('POST Accept Invite 4', (done) => {
// //   chai.request(apiUrl)
// //     .post('/api/acceptInvite/accept')
// //     .send({`
// //       user_id: 4,
// //       group_name: 'Mocha Test Group',
// //     })
// //     .end((err, res) => {
// //       expect(res).to.have.status(200);
// //       expect(res.body.message).to.equal('INVITE_ACCEPTED');
// //       done();
// //     });
// // });
