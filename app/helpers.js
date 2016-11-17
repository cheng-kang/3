var Helper = {
	isLoggedIn: function () {
		var name = Cookies.get('name');
		var isCorrect = Cookies.get('isCorrect');
		if (name == undefined || $.inArray(name, Names) == -1 || isCorrect == undefined) { return false;}
		return true;
	},
	login: function (name, answer, questionNumber) {
        if ($.inArray(name, Names) != -1 && answer == Answers[questionNumber]) {
			Cookies.set('name', name);
			Cookies.set('isCorrect', 'yes');

			return true
        }
        return false;
	},
	logout: function () {
		Cookies.remove('name');
		Cookies.remove('isCorrect');
	},
	name: function () {
		return Cookies.get('name');
	}
}