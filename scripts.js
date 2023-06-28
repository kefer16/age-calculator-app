function isNumericKey(key) {
	if (key === "-" || key == "." || key == ",") {
		return false;
	}
	console.log(/^\d$/.test(key));
	return /^\d$/.test(key);
}

function isActionKey(event) {
	return (
		event.ctrlKey === true || //Control
		event.metaKey === true || //Command (macOS)
		event.keyCode === 8 || //Backspace
		event.keyCode === 9 || //Tab
		event.keyCode === 13 || //Enter
		event.keyCode === 27 || //Esc
		event.keyCode === 46 //Delete
	);
}

function getMaxDay(year, month) {
	const date = new Date(year, month, 0);
	const maxDay = date.getDate();
	return maxDay;
}

function validateBirday(currentDate) {
	groupTitle.forEach(function (elemento) {
		elemento.classList.remove("title-active");
	});

	groupInput.forEach(function (elemento) {
		elemento.classList.remove("input-active");
	});

	groupMessage.forEach(function (elemento) {
		elemento.classList.remove("message-active");
	});

	if (
		inputYear.value == "" ||
		inputMonth.value == "" ||
		inputDay.value == "" ||
		parseInt(inputYear.value) == 0 ||
		parseInt(inputMonth.value) == 0 ||
		parseInt(inputDay.value) == 0
	) {
		if (inputYear.value == "" || parseInt(inputYear.value) == 0) {
			inputYear.classList.add("input-active");
			inputYear.previousElementSibling.classList.add("title-active");
			inputYear.nextElementSibling.classList.add("message-active");
			inputYear.nextElementSibling.innerHTML = "This field is requerid";
		}

		if (inputMonth.value == "" || parseInt(inputMonth.value) == 0) {
			inputMonth.classList.add("input-active");
			inputMonth.previousElementSibling.classList.add("title-active");
			inputMonth.nextElementSibling.classList.add("message-active");
			inputMonth.nextElementSibling.innerHTML = "This field is requerid";
		}

		if (inputDay.value == "" || parseInt(inputDay.value) == 0) {
			inputDay.classList.add("input-active");
			inputDay.previousElementSibling.classList.add("title-active");
			inputDay.nextElementSibling.classList.add("message-active");
			inputDay.nextElementSibling.innerHTML = "This field is requerid";
		}
		return false;
	}

	if (
		parseInt(inputYear.value) < 1900 ||
		parseInt(inputYear.value) > currentDate.getFullYear()
	) {
		inputYear.classList.add("input-active");
		inputYear.previousElementSibling.classList.add("title-active");
		inputYear.nextElementSibling.classList.add("message-active");
		inputYear.nextElementSibling.innerHTML = "Must be in the past";
		return false;
	}

	if (parseInt(inputMonth.value) > 12) {
		inputMonth.classList.add("input-active");
		inputMonth.previousElementSibling.classList.add("title-active");
		inputMonth.nextElementSibling.classList.add("message-active");
		inputMonth.nextElementSibling.innerHTML = "Must be a valid month";
		return false;
	}

	if (
		parseInt(inputDay.value) >
		getMaxDay(parseInt(inputYear.value), parseInt(inputMonth.value))
	) {
		inputDay.classList.add("input-active");
		inputDay.previousElementSibling.classList.add("title-active");
		inputDay.nextElementSibling.classList.add("message-active");
		inputDay.nextElementSibling.innerHTML = "Must be a valid day";

		return false;
	}

	if (
		new Date(
			parseInt(inputYear.value),
			parseInt(inputMonth.value) - 1,
			parseInt(inputDay.value)
		) -
			currentDate >=
		0
	) {
		inputYear.classList.add("input-active");
		inputYear.previousElementSibling.classList.add("title-active");
		inputYear.nextElementSibling.classList.add("message-active");
		inputYear.nextElementSibling.innerHTML = "Must be in the past";

		inputMonth.classList.add("input-active");
		inputMonth.previousElementSibling.classList.add("title-active");
		inputMonth.nextElementSibling.classList.add("message-active");
		inputMonth.nextElementSibling.innerHTML = "Must be in the past";

		inputDay.classList.add("input-active");
		inputDay.previousElementSibling.classList.add("title-active");
		inputDay.nextElementSibling.classList.add("message-active");
		inputDay.nextElementSibling.innerHTML = "Must be in the past";

		return false;
	}

	return true;
}

const textYear = document.getElementById("text_year");
const textMonth = document.getElementById("text_month");
const textDay = document.getElementById("text_day");

const inputDay = document.getElementById("input_day");
const inputMonth = document.getElementById("input_month");
const inputYear = document.getElementById("input_year");

const groupTitle = document.querySelectorAll(".card__date__group-title");
const groupInput = document.querySelectorAll(".card__date__group-input");
const groupMessage = document.querySelectorAll(".card__date__group-message");
const groupTextNumber = document.querySelectorAll(
	".card__calculation__text__number"
);

const buttonCalculation = document.getElementById("calculation");

inputDay.addEventListener("input", function () {
	if (this.value.length > 2) {
		this.value = this.value.slice(0, 2); // Limita la longitud a 10 caracteres
	}
});

inputMonth.addEventListener("input", function () {
	if (this.value.length > 2) {
		this.value = this.value.slice(0, 2); // Limita la longitud a 10 caracteres
	}
});

inputYear.addEventListener("input", function () {
	if (this.value.length > 4) {
		this.value = this.value.slice(0, 4); // Limita la longitud a 10 caracteres
	}
});

inputDay.addEventListener("keydown", function (event) {
	var keyCode = event.key;

	console.log(keyCode);

	if (!isNumericKey(keyCode) && !isActionKey(event)) {
		event.preventDefault();
	}
});

inputMonth.addEventListener("keydown", function (event) {
	var keyCode = event.key;

	if (!isNumericKey(keyCode) && !isActionKey(event)) {
		event.preventDefault();
	}
});

inputYear.addEventListener("keydown", function (event) {
	var keyCode = event.key;

	if (!isNumericKey(keyCode) && !isActionKey(event)) {
		event.preventDefault();
	}
});

function calculationAge() {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	if (!validateBirday(currentDate)) {
		groupTextNumber.forEach(function (elemento) {
			elemento.innerHTML = "--";
		});
		return;
	}
	const dateBirday = new Date(
		parseInt(inputYear.value),
		parseInt(inputMonth.value) - 1,
		parseInt(inputDay.value)
	);
	dateBirday.setHours(0, 0, 0, 0);

	const dateDifference = currentDate - dateBirday;

	const year = Math.floor(dateDifference / 31557600000);
	const month = Math.floor((dateDifference % 31557600000) / 2629800000);
	const day = Math.floor(
		((dateDifference % 31557600000) % 2629800000) / 86400000
	);

	textYear.textContent = year;
	textMonth.textContent = month;
	textDay.textContent = day;
}

buttonCalculation.addEventListener("click", function (event) {
	event.preventDefault();

	calculationAge();
});
