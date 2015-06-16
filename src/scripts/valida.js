function validaCpf(cpf) {
	cpf = cpf.replace(/[^\d]+/g, '');
	console.log(cpf);

	if (!cpf || cpf.length !== 11 ||
			cpf == "00000000000" || cpf == "11111111111"
			|| cpf == "22222222222" || cpf == "33333333333"
			|| cpf == "44444444444" || cpf == "55555555555"
			|| cpf == "66666666666" || cpf == "77777777777"
			|| cpf == "88888888888" || cpf == "99999999999") {
				
		return false;
	}

	for(var i = 0; i < 2; i++) {
		var add = 0;

		for(var j = 0; j < (9 + i); j++) {
			console.log(i, j);
			add += cpf.charAt(j) * ((10 + i) - j);
		}

		var rev = 11 - (add % 11);

		if(rev == 10 || rev == 11) {
			rev = 0;
		}

		if (rev != cpf.charAt(9 + i)) {
			console.log(rev, i);
			return false;
		}
	}
	return true;
}
