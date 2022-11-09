var url = 'http://localhost:3000/users'

var signUpBtn = document.getElementById('sign-up-btn');
signUpBtn.addEventListener('click',myTest);
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function emailFormat(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function passCheck(pass){
 return  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(pass);
}
function usernamCheck(username){
  // isNaN(value)
  if(isNaN(username.charAt(0))) return false;
  return true;
}
function isStringMatch(str1,str2) {
    if(str1.indexOf(str2) >= 0){
      return true;
      //substring exist
    }
    //substring does not exist
  return false;
}
function myTest(event) {
	event.preventDefault();
	var myForm = document.getElementById('my-form');

	var username = document.getElementById('username');
	var password = document.getElementById('password');
	var re_password = document.getElementById('re-password');
	var fullname = document.getElementById('fullname');
	var email = document.getElementById('email');
	var phone = document.getElementById('phone');
	
	var user_err = document.getElementById('user-err');
	var pass_err = document.getElementById('pass-err');
	var re_pass_err = document.getElementById('re-pass-err');
	var name_err = document.getElementById('name-err');
	var email_err = document.getElementById('email-err');
	var phone_err = document.getElementById('phone-err');
	var newUser = {};
	if(_.isEmpty(username.value)){
		username.value = '';
		user_err.innerHTML = '<p>Tên đăng nhập không được để trống !</p>';
	}else if(username.value.length < 6){
		username.value = '';
		user_err.innerHTML = '<p>Tên đăng nhập dài tối thiểu 6 kí tự</p>';
	}else{
		newUser.username = username.value;
		// console.log(newUser.username);
		user_err.innerHTML='';
	}

	if(_.isEmpty(password.value)){
		password.value = '';
		pass_err.innerHTML = '<p>Mật khẩu không được để trống !</p>';
	}else if(password.value.length < 6){
		password.value = '';
		pass_err.innerHTML = '<p>Mật khẩu dài tối thiểu 6 kí tự</p>';
	}else{
		newUser.password = password.value;
		// console.log(newUser.password);
		pass_err.innerHTML='';
	}

	if(_.isEmpty(re_password.value)){
		re_password.value = '';
		re_pass_err.innerHTML = '<p>Nhập lại mật khẩu không được để trống !</p>';
	}else if(password.value !='' && re_password.value != '' && (re_password.value != password.value)){
		re_password.value='';
		re_pass_err.innerHTML = '<p>Nhập lại mật khẩu không khớp.</p>';
	}else{
		newUser.re_password = re_password.value;
		// console.log(newUser.re_password);
		pass_err.innerHTML='';
	}

	if(_.isEmpty(fullname.value)){
		fullname.value = '';
		name_err.innerHTML = '<p>Họ và tên không được để trống !</p>';
	}else{
		newUser.fullname = fullname.value;
		// console.log(newUser.fullname);
		name_err.innerHTML='';
	}

	if(_.isEmpty(email.value)){
		email.value = '';
		email_err.innerHTML = '<p>Email không được để trống !</p>';
	}else if(email.value.length < 6){
		email.value = '';
		eamil_err.innerHTML = '<p>Email dài tối thiểu 6 kí tự</p>';
	}
	else{
		newUser.email = email.value;
		// console.log(newUser.email);
		email_err.innerHTML='';
	}

	if(_.isEmpty(phone.value)){
		phone.value = '';
		phone_err.innerHTML = '<p>Số điện thoại không được để trống</p>';
	}else if(phone.value.length < 6){
		phone.value = '';
		phone_err.innerHTML = '<p>Số điện thoại dài tối thiểu 6 kí tự</p>';
	}else{
		newUser.phone = phone.value;
		// console.log(newUser.phone);
		phone_err.innerHTML='';
	}
	
	// if(username.value==='' || password.value==='' || re_password.value ==='' || fullname.value==='' || phone.value==='' || email.value ===''){
	// 	alert('Đăng ký thất bại !');
	// }
	// elseif(username.value!='' && password.value!='' && re_password.value !='' && fullname.value!='' && phone.value!='' && email.value !=''){
	// } 
	var filtered= [];
	axios.get(url).then(res=>{
		var users = res.data;	
		var filteredUser = users.filter(function(user){
		if(user.username === newUser.username){
			username.value = '';
			user_err.innerHTML = '<p>Tên đăng nhập đã là thành viên, vui lòng đăng nhập hoặc nhập Tên đăng nhập khác !</p>';
		}
		if(user.phone === newUser.phone){
			phone.value = '';
			phone_err.innerHTML = '<p>Số điện thoại đã là thành viên, vui lòng đăng nhập hoặc nhập Số điện thoại khác !</p>';
		}
		if(user.email === newUser.email){
			email.value = '';
			email_err.innerHTML = '<p>Email đã là thành viên, vui lòng đăng nhập hoặc nhập Email khác !</p>';
		}
			return user;
		});
		// var filtered =  filteredUser;
		filtered.push(filteredUser);
		return filtered;
	}).catch(err=>{
		console.log(err);
	});
	// if(filtered){
	// 	alert('Sign up is fail !');
	// }
	if(!filtered){
		axios.post(url,newUser).then(function(res){
			var user = res.data;
			console.log(user);
			myForm.reset();
			// return;
		}).catch(err=>{
			console.log(err);
		});				
	}
}	