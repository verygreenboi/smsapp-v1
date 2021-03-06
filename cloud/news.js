const News = Parse.Object.extend('News');
const Profile = Parse.Object.extend('Profile');
const _ = require("underscore");

Parse.Cloud.define('getNews', (req, res) => {
	const user = req.user;
	let isParent = false;

	if(user.get('role') === 'parent') {
		isParent = true;
	};

	console.log('Is Parent', isParent, 'role =>'+user.get('role'));

	if (isParent) {
		return getNewsForParent(req, res, user);
	} else {
		return getNews(req, res, user);
	}
});

function getNewsForParent(req, res, user) {
	const profileQ = new Parse.Query(Profile);
	const schools = [];
	profileQ.equalTo('parent', user);
	profileQ.include('user');
	return profileQ.find({sessionToken: user.getSessionToken()}).then((profiles) => {
		const children = [];
		if (profiles.length === 0) {
			return res.error('No child found');
		}

		_.each(profiles, (profile) => children.push(profile.get('user')));

		return children;
	}).then((children) => {
		console.log(children);
		let promise = Parse.Promise.as();
		_.each(children, child => {
			schools.push(child.get('school'));	
		});
		return promise;
	}).then(() =>{
		console.log(schools);
		const newsQ = new Parse.Query(News);
		newsQ.containedIn('school', schools);
		return newsQ.find();
	}).then((news) => {
		return res.success(news);
	}).catch((err) => {
		return res.error(err);
	});
}

function getNews(req, res, user) {
	const school = user.get('school');
	const newsQ = new Parse.Query(News);
	newsQ.equalTo('school', school);
	return newsQ.find().then((news) => {
		return res.success(news);
	}).catch((err) => {
		return res.error(err);
	});
}