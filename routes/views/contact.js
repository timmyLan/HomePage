var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {
		console.log('req',req.body);
		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone , message',
			errorMessage: '出现问题了:('
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			}
			next();
		});
	});

	view.render('contact');
};
