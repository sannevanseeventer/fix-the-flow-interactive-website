
// MENU //

const navToggle = document.querySelector("#navToggle")
const nav = document.querySelector("#nav-links")
const navToggle2 = document.querySelector ('#navToggle2')

navToggle.addEventListener("click", () => {
    nav.classList.toggle('nav-open')

navToggle2.addEventListener("click", () => {
    nav.classList.toggle ('nav-close')
    
})})

// FORM + NAME MINI//

const txt1 = document.getElementById('tbuser');
const btn1 = document.getElementById ('btn1');
const out1 = document.getElementById ('output1');
const out2 = document.getElementById ('output2');
const out3 = document.getElementById ('output3');
const out4 = document.getElementById ('output4');

function fun1 () {
  out1.innerHTML = "Wat is de geboortedatum van " + txt1.value + "?";
  out2.innerHTML = "Is " + txt1.value + " je eerste kindje?";
  out3.innerHTML = "Heeft " + txt1.value + " ooit een acute allergische reactie gehad na het eten?  ";
  out4.innerHTML = "Heeft " + txt1.value + " Eczeem?";
}

btn1.addEventListener ('click', fun1);

// FORM //

const multistepForm = document.querySelector('.multistep-form');
const forms = multistepForm.querySelectorAll('fieldset');
const password = multistepForm.querySelector('input[name="password"]');
const confirmPassword = multistepForm.querySelector(
  'input[name="confirmPassword"]'
);
const nextButtons = multistepForm.querySelectorAll('[data-next]');
const prevButtons = multistepForm.querySelectorAll('[data-previous]');

let initialFormIndex = Array.from(forms).findIndex((elem) => {
  return elem.classList.contains('active');
});

if (initialFormIndex === -1) {
  initialFormIndex = 0;
}

console.log(initialFormIndex);
forms[initialFormIndex].classList.add('active');

const currentFormIndex = new observable(initialFormIndex);
currentFormIndex.onChange((val) => {
  Array.from(forms).forEach((form, i) => {
    form.classList.toggle('active', i === val);
  });
});

confirmPassword.addEventListener('input', () => {
  const passwordMatch = password.value === confirmPassword.value;
  if (!passwordMatch) {
    confirmPassword.setCustomValidity('Password does not match');
    confirmPassword.reportValidity();
    return;
  }
  confirmPassword.setCustomValidity('');
});

nextButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const currentForm = forms[currentFormIndex.getValue()];
    const inputs = currentForm.querySelectorAll('input');
    console.log('next');
    const allValid = Array.from(inputs).every((input) =>
      input.reportValidity()
    );
    if (!allValid) {
      return;
    }
    if (currentFormIndex.getValue() === 0) {
      const passwordMatch = password.value === confirmPassword.value;
      if (!passwordMatch) {
        confirmPassword.setCustomValidity('Password does not match');
        confirmPassword.reportValidity();
        return;
      }
      confirmPassword.setCustomValidity('');
    }
    currentFormIndex.setValue(currentFormIndex.getValue() + 1);
  });
});

multistepForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = multistepForm.querySelectorAll('input');
  const formData = Array.from(inputs).reduce((data, input) => {
    data[input.name] = input.value;
    return data;
  }, {});
  alert(`Data ${JSON.stringify(formData)}`);
  multistepForm.reset();
  currentFormIndex.setValue(0);
});

prevButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    currentFormIndex.setValue(currentFormIndex.getValue() - 1);
  });
});

forms.forEach((form) =>
  form.addEventListener('animationend', (e) => {
    forms[currentFormIndex.getValue()].classList.remove('hide');
    e.target.classList.toggle('hide', !e.target.classList.contains('active'));
  })
);

function observable(v) {
  this.value = v;

  this.valueChangedCallback = null;

  this.setValue = function (v) {
    if (this.value != v) {
      this.value = v;
      this.raiseChangedEvent(v);
    }
  };

  this.getValue = function () {
    return this.value;
  };

  this.onChange = function (callback) {
    this.valueChangedCallback = callback;
  };

  this.raiseChangedEvent = function (v) {
    if (this.valueChangedCallback) {
      this.valueChangedCallback(v);
    }
  };
}


// PRROGRESSBAR //
