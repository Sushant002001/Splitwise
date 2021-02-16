const app = require('./app');

const ping = require('./routes/ping');
const login = require('./routes/login');
const signup = require('./routes/signup');
const creategroup = require('./routes/creategroup');
const invitegroup = require('./routes/invitegroup');
const acceptinvite = require('./routes/acceptinvite');
const displayinvite = require('./routes/invitedisplay');
const addexpense = require('./routes/addexpense');
const dashboard = require('./routes/balances');
const settleup = require('./routes/settleup');
const recentactivity = require('./routes/recentactivity');

app.use('/api/ping', ping);
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/creategroup', creategroup);
app.use('/api/invitegroup', invitegroup);
app.use('/api/acceptinvite', acceptinvite);
app.use('/api/displayinvite', displayinvite);
app.use('/api/addexpense', addexpense);
app.use('/api/dashboard', dashboard);
app.use('/api/settleup', settleup);
app.use('/api/recent', recentactivity);


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;