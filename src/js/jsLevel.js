const digitsAnimationSpeed = 10;
const arrowAnimationSpeed = 40;

const digitsMaxLevel = 1000;
let digitsOldLevel = 0;
let digitsNewLevel = 0;

const arrowInitialDeviation = -40;
const arrowMaxRotateDeg = 195;
let arrowOldRotateDeg = arrowInitialDeviation;
let arrowNewRotateDeg = arrowInitialDeviation;

const digit = document.getElementById('digit');
const arrow = document.querySelector('div.indicator__arrow svg');

arrow.style.transform = `rotate(${arrowInitialDeviation}deg)`;
digit.innerText = String(Math.ceil(digitsOldLevel));

const skills = document.querySelectorAll('input.skill__checkbox');
const totalSkillsCount = [...skills].length;
let checkedSkillsCount = 0;

const refreshArrowAndDigits = () => {
	digitsOldLevel = digitsNewLevel;
	digitsNewLevel = digitsMaxLevel / totalSkillsCount * checkedSkillsCount;
	arrowOldRotateDeg = arrowNewRotateDeg;
	arrowNewRotateDeg = arrowInitialDeviation + arrowMaxRotateDeg / totalSkillsCount * checkedSkillsCount;
};

const runAnimation = () => {
	const animateDigits = setInterval(() => {
		if (digitsNewLevel > digitsOldLevel) {
			digitsOldLevel += 1;
		} else {
			digitsOldLevel -= 1;
		}
		digit.innerText = String(Math.ceil(digitsOldLevel));
		if (Math.ceil(digitsOldLevel) === Math.ceil(digitsNewLevel)) {
			clearInterval(animateDigits);
		}
	}, digitsAnimationSpeed);

	const animateArrow = setInterval(() => {
		if (arrowNewRotateDeg > arrowOldRotateDeg) {
			arrowOldRotateDeg += 1;
		} else {
			arrowOldRotateDeg -= 1;
		}
		arrow.style.transform = `rotate(${arrowOldRotateDeg}deg)`;
		if (Math.ceil(arrowOldRotateDeg) === Math.ceil(arrowNewRotateDeg)) {
			clearInterval(animateArrow);
		}
	}, arrowAnimationSpeed);
};

[...skills].forEach((skill) => {
	skill.addEventListener('click', (event) => {
		if (event.target.checked) {
			checkedSkillsCount += 1;
		} else {
			checkedSkillsCount -= 1;
		}
		refreshArrowAndDigits();
		runAnimation();
	});
});
